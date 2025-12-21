import { createClient } from "@/utils/supabase/server";
import { IS_DEBUG } from "@/utils/env"; // Using the helper we just made

export default async function DebugFooter() {
  // 1. Security Check: If not dev mode, render nothing.
  if (!IS_DEBUG) {
    return null;
  }

  // 2. Fetch User Data
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-red-50 border-t border-red-200 p-2 text-xs font-mono text-red-900 z-50 opacity-90 hover:opacity-100 transition-opacity">
      <div className="max-w-7xl mx-auto flex justify-between items-start overflow-auto max-h-32">
        {/* Left Side: Environment Status */}
        <div className="flex flex-col gap-1 min-w-[150px]">
          <span className="font-bold uppercase tracking-wider">
            🚧 Debug Mode
          </span>
          <span>Env: {process.env.NODE_ENV}</span>
        </div>

        {/* Right Side: User Details */}
        <div className="flex-1 border-l border-red-200 pl-4 ml-4">
          {user ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <span className="font-semibold text-right text-gray-500">
                Email:
              </span>
              <span>{user.email}</span>

              <span className="font-semibold text-right text-gray-500">
                UUID:
              </span>
              <span>{user.id}</span>

              <span className="font-semibold text-right text-gray-500">
                Last Sign In:
              </span>
              <span>{new Date(user.last_sign_in_at!).toLocaleString()}</span>

              <span className="font-semibold text-right text-gray-500">
                Role:
              </span>
              <span>{user.role}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-500 italic">
              <span>Guest User (Not logged in)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
