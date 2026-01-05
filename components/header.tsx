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

  const navLinkStyle =
    "text-base font-medium text-gray-500 hover:text-gray-900 transition-colors";

  return (
    <header className="w-full border-b border-gray-100 bg-white px-6 py-5">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* --- LEFT SIDE: Brand & Site Nav --- */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-serif text-xl font-medium tracking-widest uppercase text-gray-900 select-none"
          >
            {/* MOBILE */}
            <span className="text-3xl font-bold tracking-tighter sm:hidden">
              T
            </span>

            {/* DESKTOP */}
            <span className="hidden sm:block text-xl font-medium tracking-widest">
              Trepid Programmer
            </span>
          </Link>
        </div>

        {/* --- RIGHT SIDE: Actions --- */}
        <nav className="flex items-center gap-6">
          {showCreateButton && (
            <Link
              href="/posts/create"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              + New Post
            </Link>
          )}

          {user ? (
            // LOGGED IN STATE
            <div className="flex items-center gap-6">
              <Link href="/auth/account" className={navLinkStyle}>
                Profile
              </Link>

              <form action={signout}>
                <button className={navLinkStyle} type="submit">
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            // LOGGED OUT STATE
            <div className="flex items-center gap-6">
              <Link href="/auth/login" className={navLinkStyle}>
                Log in
              </Link>

              {/* Sign Up: Slightly distinct but still minimal */}
              <Link href="/auth/signup" className={navLinkStyle}>
                Sign up
              </Link>
            </div>
          )}

          <Link href="/about" className={navLinkStyle}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
