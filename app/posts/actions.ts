"use server";

import { createClient } from "@/utils/supabase/server";
import { isAdmin, createAdminClient } from "@/utils/supabase/admin";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import crypto from "crypto";

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  // 1. Get Auth User
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth/login");
  }

  // 2. NEW: DB-Based Admin Check
  const isUserAdmin = await isAdmin(user.id);

  if (!isUserAdmin) {
    // If they aren't an admin, stop immediately
    console.error("Unauthorized post attempt by:", user.id);
    return;
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const isPublic = formData.get("is_public") === "on";

  const result = await supabase.from("posts").insert({
    title,
    content,
    is_public: isPublic,
    slug: title.replaceAll(" ", "_").toLocaleLowerCase(),
  });

  if (result.error == null) {
    revalidatePath("/");
    redirect("/");
  } else {
    console.log("result is", result);
  }
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient();

  // 1. Get the Hidden ID and other fields
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const is_public = formData.get("is_public") === "on";

  console.log("DEBUG: Update Post ID ->", id, "Type ->", typeof id);

  // 2. Update the row (We usually DON'T update the slug to keep links working)
  const { error } = await supabase
    .from("posts")
    .update({
      title,
      content,
      is_public,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating post:", error);
    return;
  }

  revalidatePath("/");
  revalidatePath(`/posts/${id}`);
  redirect("/");
}

export async function uploadImage(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("file") as File;

  if (!file) {
    return { error: "No file uploaded" };
  }

  // 1. Use the original filename (Sanitized)
  // We clean it to ensure the URL is readable and safe (no spaces or weird symbols)
  const fileName = file.name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w.-]/g, ""); // Remove any special characters except . - _

  const filePath = `uploads/${fileName}`;

  // 2. Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("blog-images")
    .upload(filePath, file, {});

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return { error: "Upload failed" };
  }

  // 3. Get the Public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("blog-images").getPublicUrl(filePath);

  // Add a cache-busting timestamp so updates show immediately
  return { url: `${publicUrl}?t=${Date.now()}` };
}

export async function logPostView(
  slug: string,
  durationSeconds: number,
  scrollDepthPercent: number
) {
  if (durationSeconds < 2) return;

  // Reader client
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const headerList = await headers();

  // Writer client
  const adminSupabase = createAdminClient();

  const ip = headerList.get("x-forwarded-for") || "unknown";

  // 3. Create a "Daily Salted Hash"
  // This lets you count unique visitors for ONE day, but prevents long-term tracking.
  // Ideally, use a real secret env var here, but a fallback works for now.
  const today = new Date().toISOString().slice(0, 10); // "2025-01-05"
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY || "simple_secret";
  const ipHash = crypto
    .createHash("sha256")
    .update(ip + today + secret)
    .digest("hex");

  // 4. Extract Clean Referrer
  const referer = headerList.get("referer") || "Direct";
  let cleanReferrer = "Direct";
  if (referer !== "Direct") {
    try {
      const url = new URL(referer);
      cleanReferrer = url.hostname; // e.g., "t.co" becomes "t.co"
    } catch (e) {
      cleanReferrer = referer;
    }
  }

  // 5. Detect Device
  const userAgent = headerList.get("user-agent") || "";
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);

  // 6. Insert Data
  const { error } = await adminSupabase.from("post_analytics").insert({
    slug,
    duration_seconds: durationSeconds,
    country: headerList.get("x-vercel-ip-country") || "Unknown", // Works on Vercel
    ip_hash: ipHash,
    referrer: cleanReferrer,
    device_type: isMobile ? userAgent : "desktop",
    scroll_depth_percent: scrollDepthPercent,
    user_id: user?.id || null,
  });

  if (error) {
    console.error("Analytics Error:", error);
  }
}
