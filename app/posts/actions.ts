"use server";

import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/utils/supabase/admin"; // Import helper
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
