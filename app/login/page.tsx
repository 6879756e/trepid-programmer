// 1. IMPORT THE ACTION
import { login } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* 2. HOOK IT UP HERE via the 'action' prop */}
      <form action={login} className="bg-white p-8 rounded-lg shadow-md w-96">
        
        <h1 className="text-2xl font-bold mb-6 text-center">Trepid Login</h1>
        
        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="you@example.com"
        />
        
        <button 
          type="submit" 
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Send Magic Link
        </button>
      </form>
    </div>
  )
}