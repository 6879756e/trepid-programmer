import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col gap-4">
        
        <h1 className="text-2xl font-bold mb-2 text-center">Trepid Login</h1>
        
        {/* Email Field */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="you@example.com"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="••••••••"
          />
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-4">
            <button 
              formAction={login} 
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Log In
            </button>

            <button 
              formAction={signup}
              className="w-full bg-white text-black border border-black py-2 rounded hover:bg-gray-50"
            >
              Sign Up
            </button>
        </div>

      </form>
    </div>
  )
}