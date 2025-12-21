export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  // Decode the message or show a default one
  const { message } = await searchParams;
  const errorMessage = message ?? "An unexpected error occurred."

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center border-t-4 border-red-500">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Authentication Error</h1>
        
        <div className="bg-red-50 text-red-700 p-4 rounded mb-6 text-sm break-words">
          {errorMessage}
        </div>

        <a 
          href="/login" 
          className="inline-block w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Try Again
        </a>
      </div>
    </div>
  )
}