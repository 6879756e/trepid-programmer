import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import MarkdownView from "@/components/markdown-view";
import Link from "next/link";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const supabase = await createClient();

  const { id } = await params;

  // 1. Fetch the specific post
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single(); // .single() is important! It returns one object, not an array.

  // 2. Handle 404
  if (error) {
    console.log("error ", error);
    notFound();
  } else if (!post) {
    console.log("no post");
    notFound();
  }

  return (
    <div className="min-h-screen bg-white p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-2xl mx-auto">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-black hover:underline transition"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10 border-b border-gray-100 pb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>
              {new Date(post.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>

            {/* Show 'Draft' badge if viewing a hidden post (only visible to you) */}
            {!post.is_public && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-bold uppercase">
                Draft
              </span>
            )}
          </div>
        </header>

        {/* The Content (Uses your styled markdown viewer) */}
        <article>
          <MarkdownView content={post.content} />
        </article>
      </main>
    </div>
  );
}
