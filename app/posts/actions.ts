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
