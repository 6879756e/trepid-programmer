import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import MarkdownView from "@/components/markdown-view";
import Link from "next/link";
import { isAdmin } from "@/utils/supabase/admin";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const supabase = await createClient();

  const { slug } = await params;

  console.log("slug is", slug);

  // 1. Fetch the specific post
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single(); // .single() is important! It returns one object, not an array.

  // 2. Handle 404
  if (error) {
    console.log("error ", error);
    notFound();
  } else if (!post) {
    console.log("no post");
    notFound();
  }

  const canEdit = await isAdmin();

  return (
    <div className="min-h-screen bg-white p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-2xl mx-auto">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-black hover:underline transition group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          {canEdit && (
            <Link
              href={`/posts/${slug}/edit`}
              className="text-sm font-medium text-gray-400 hover:text-blue-600 transition"
            >
              Edit Post
            </Link>
          )}
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
