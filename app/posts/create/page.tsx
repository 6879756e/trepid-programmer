import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/utils/supabase/admin";
import PostEditor from "./post-editor"; // Import the client component

export default async function CreatePostPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const isUserAdmin = await isAdmin(supabase, user.id);
  if (!isUserAdmin) redirect("/");

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Write a New Log</h1>
      {/* Load the interactive editor */}
      <PostEditor />
    </div>
  );
}
