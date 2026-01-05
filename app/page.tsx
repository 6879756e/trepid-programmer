import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

// 1. HELPER: Group posts by Year
// Returns an object like: { "2025": [post1, post2], "2024": [post3] }
function groupPostsByYear(posts: any[]) {
  return posts.reduce((acc, post) => {
    const year = new Date(post.created_at).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<string, any[]>);
}

// 2. HELPER: Format date to "10 May"
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export default async function Home() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const postsByYear = groupPostsByYear(posts || []);
  // Sort years descending (2025, 2024...)
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="min-h-screen bg-white p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-2xl mx-auto mt-6">
        {/* Main Page Title */}
        {/* <h1 className="text-4xl font-serif text-gray-900 mb-16">Blog</h1> */}

        <div className="space-y-16">
          {years.map((year) => (
            <section key={year}>
              {/* Year Header */}
              <h2 className="text-gray-400 text-lg font-medium mb-6 border-b border-gray-100 pb-2">
                {year}
              </h2>

              <div className="flex flex-col">
                {postsByYear[year].map((post: any) => (
                  <Link
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    className="group flex items-baseline justify-between py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors -mx-4 px-4 rounded-lg"
                  >
                    {/* Title */}
                    <span className="text-lg text-gray-900 font-serif group-hover:text-black font-medium">
                      {post.title}
                    </span>

                    {/* Date */}
                    <span className="text-sm text-gray-400 font-mono whitespace-nowrap ml-8">
                      {formatDate(post.created_at)}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
