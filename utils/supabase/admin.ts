import { SupabaseClient } from "@supabase/supabase-js";

export async function isAdmin(supabase: SupabaseClient, userId: string) {
  // 1. Query your custom table (Assuming it's named 'profiles')
  // We explicitly select the 'access_tags' column
  const { data, error } = await supabase
    .from("profiles")
    .select("access_tags")
    .eq("id", userId)
    .single();

  // 2. Safety Checks
  if (error || !data || !data.access_tags) {
    return false;
  }

  // 3. Check if the array contains 'admin'
  return data.access_tags.includes("admin");
}
