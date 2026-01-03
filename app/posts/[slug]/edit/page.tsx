import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import PostEditor from "@/app/posts/create/post-editor";
import { isAdmin } from "@/utils/supabase/admin";

interface EditPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  // 1. Security Gate: Kick out non-admins immediately
  const canEdit = await isAdmin();
  if (!canEdit) {
    redirect("/");
  }

  // 2. Fetch the post data to pre-fill the form
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) {
    notFound();
  }

  console.log(`post.id is: ${post.id}`);

  return (
    <div className="min-h-screen bg-white p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Post</h1>

        {/* 3. Load the Editor with the existing data */}
        <PostEditor post={post} />
      </main>
    </div>
  );
}
