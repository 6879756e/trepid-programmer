import { createClient } from "@/utils/supabase/server";

export async function isAdmin(userId?: string) {
  const supabase = await createClient();

  if (!userId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    userId = user?.id;

    if (!userId) return false;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("access_tags")
    .eq("id", userId)
    .single();

  // 2. Safety Checks
  if (error || !data || !data.access_tags) {
    return false;
  }

  return data?.access_tags.includes("admin");
}
