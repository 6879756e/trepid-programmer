import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/utils/supabase/admin";
import { signout } from "@/app/auth/actions";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let showCreateButton = false;
  if (user) {
    showCreateButton = await isAdmin(user?.id);
  }

  return (
    <header className="w-full border-b border-gray-200 bg-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* --- LEFT SIDE: Navigation --- */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl tracking-tight">
            Trepid
          </Link>

          {/* Site Links (About) */}
          <Link
            href="/about"
            className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            About
          </Link>
        </div>

        {/* --- RIGHT SIDE: User Actions --- */}
        <nav className="flex items-center gap-4">
          {showCreateButton && (
            <Link
              href="/posts/create"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 mr-2"
            >
              + New Post
            </Link>
          )}

          {user ? (
            // LOGGED IN
            <div className="flex items-center gap-4">
              {/* Hide email on mobile to prevent clogging */}
              <span className="text-sm text-gray-600 hidden sm:block">
                {user.email}
              </span>
              <form action={signout}>
                <button
                  className="bg-gray-100 px-3 py-2 rounded text-sm hover:bg-gray-200 transition-colors"
                  type="submit"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            // LOGGED OUT
            <div className="flex gap-4 text-sm items-center">
              <Link
                href="/auth/login"
                className="text-gray-600 hover:text-black hover:underline px-1"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-black text-white px-3 py-1.5 rounded hover:bg-gray-800 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
