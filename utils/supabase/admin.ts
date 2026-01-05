import { createClient } from "@/utils/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

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

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
