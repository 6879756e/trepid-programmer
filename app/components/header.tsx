import { createClient } from "../utils/supabase/server";
import Link from "next/link";
import { signout } from "../auth/actions";

export default async function Header() {
  const supabase = await createClient();

  // Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="w-full border-b border-gray-200 bg-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <Link href="/" className="font-bold text-xl">
          Trepid
        </Link>

        {/* User Navigation */}
        <nav className="flex items-center gap-4">
          {user ? (
            // 1. SHOW THIS IF LOGGED IN
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>

              <Link href="/auth/account" className="text-sm hover:underline">
                Profile
              </Link>

              <form action={signout}>
                <button
                  className="bg-gray-100 px-3 py-2 rounded text-sm hover:bg-gray-200"
                  type="submit"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            // 2. SHOW THIS IF LOGGED OUT
            <div className="flex gap-4 text-sm">
              <Link href="/auth/login" className="hover:underline px-1 py-1">
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
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
