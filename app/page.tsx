export const dynamic = "force-dynamic";
import { createClient } from "@/utils/supabase/server";
import { IS_DEBUG } from "@/utils/env";

export default async function Home() {
  // 1. Ask Supabase for the posts
  const supabase = await createClient();

  console.log(
    "user:",
    supabase.auth.admin,
    (await supabase.auth.getUser()).data.user?.identities
  );

  const { data: posts } = await supabase.from("posts").select("*");

  console.log("posts:", posts?.length, posts);

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
          {/* 2. Map through the posts and display them */}
          {posts?.map((post) => {
            const color = post.is_public ? "green" : "red";
            const string = post.is_public ? "PUBLIC" : "NOT_PUBLIC";

            return (
              <div
                key={post.id}
                className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">{post.title}</h3>
                  {IS_DEBUG ? (
                    <span
                      className={`bg-${color}-100 text-${color}-800 text-xs px-2 py-1 rounded-full font-bold`}
                    >
                      {string}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <p className="text-gray-600">{post.content}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
