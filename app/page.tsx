export const dynamic = "force-dynamic";
import { createClient } from "@/utils/supabase/server";
import { IS_DEBUG } from "@/utils/env";
import Link from "next/link"; // <--- Import Link

export default async function Home() {
  const supabase = await createClient();
  // Sort by created_at descending so newest is first
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  // console.log("posts", posts);

  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">The Trepid Programmer</h1>

        <p className="mb-8 text-gray-600">
          Hello, my name is Hyun. I have resided on planet Earth for as long as
          I can remember. My main interests are programming, health, and
          sociology.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Latest Logs</h2>

        <div className="space-y-4">
          {posts?.map((post) => {
            const color = post.is_public ? "green" : "red";
            const statusLabel = post.is_public ? "PUBLIC" : "DRAFT";

            return (
              // Wrap the whole card in a Link
              <Link
                href={`/posts/${post.slug}`}
                key={post.id}
                className="block border border-gray-200 p-6 rounded-lg hover:bg-gray-50 transition group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  {/* Debug Badge */}
                  {IS_DEBUG && (
                    <span
                      className={`bg-${color}-100 text-${color}-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider`}
                    >
                      {statusLabel}
                    </span>
                  )}
                </div>

                {/* Excerpt (Truncated) */}
                <p className="text-gray-600 line-clamp-3 text-sm">
                  {post.content}
                </p>

                <div className="mt-4 text-xs text-gray-400 font-mono">
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
