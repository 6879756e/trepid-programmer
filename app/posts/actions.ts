"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/utils/supabase/admin"; // Import helper

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
  const isUserAdmin = await isAdmin(supabase, user.id);

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
