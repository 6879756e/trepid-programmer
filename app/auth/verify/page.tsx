import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <div className="mb-4 text-green-500 text-6xl">✉️</div>
        <h1 className="text-2xl font-bold mb-4">Check your email</h1>
        <p className="text-gray-600 mb-6">
          We've sent a confirmation link to your inbox. Please click the link to activate your account.
        </p>
        <p className="text-sm text-gray-500">
          Once verified, you can <Link href="/login" className="text-black underline">log in here</Link>.
        </p>
      </div>
    </div>
  )
}