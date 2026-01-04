import Link from "next/link";
import AboutContent from "./about-content"; // <--- Import the new component

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-3xl mx-auto">
        {/* Navigation */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-black hover:underline transition group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Load the Client Component with the Toggle */}
        <AboutContent />
      </main>
    </div>
  );
}
