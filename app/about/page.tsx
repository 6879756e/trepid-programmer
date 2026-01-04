import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

export default async function AboutPage() {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Main Text */}
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
              Hello, I'm Hyun.
            </h1>

            <div className="prose prose-lg prose-gray text-gray-600 leading-relaxed">
              <p>
                I like to think of myself as an optimist, but as I age, I’ve
                noticed I’m <strong>ossifying into a pragmatist</strong>, a
                development I find deeply unfortunate and am actively fighting
                against.
              </p>
              <br />
              <p>
                This shift likely stems from how I spend my days: typing and
                deleting text on a keyboard. It is a strange existence where
                eight hours of work sometimes results in a net output of a
                single line of code.
              </p>
              <br />
              <p>
                I tell myself this meticulousness provides value, that I am
                inching the world toward a better place, but deep down, there is
                a <strong>lingering fear</strong> that I might leave this world
                having added nothing of substance.
              </p>
              <br />
              <p>
                This blog is my attempt to fight that silence. It is a mechanism
                to grasp at life’s transience, to keep myself accountable, and
                to document how my thoughts develop (or decay) as I age.
                Hopefully, you will find some of it interesting, if not useful.
              </p>

              <hr className="w-16 border-gray-300 my-8" />

              <p className="italic text-gray-500">
                But don’t worry, it won’t all be existential dread. That
                wouldn’t be very fun. I will also write about whatever currently
                captures my interest, and since those interests change often, I
                have conveniently created a loophole to write about{" "}
                <strong>whatever I wish.</strong>
              </p>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="md:col-span-1">
            {/* Replace with your actual image component when ready */}
            {/* Right Column: Image */}
            <div className="md:col-span-1">
              {/* The Image Container */}
              <div className="relative aspect-square rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="https://voteyksuyaasmmyfvmfi.supabase.co/storage/v1/object/public/blog-images/public/me.JPG"
                  alt="Hyun"
                  fill // <--- This makes the image fill the container
                  className="object-cover rounded-lg shadow-md border border-gray-200"
                  sizes="(max-width: 768px) 100vw, 33vw" // Helps browser pick the right size
                  priority // <--- Loads this image immediately (good for 'About' pages)
                />
              </div>

              {/* Connect Links (Keep your existing connect section below) */}
              <div className="mt-10">{/* ... your connect links ... */}</div>
            </div>
            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connect</h3>
              <ul className="space-y-2 text-l text-gray-600">
                <li>
                  <a
                    href="https://www.linkedin.com/in/hyun-kwak-855bba1ba/"
                    className="hover:text-black hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/6879756e"
                    className="hover:text-black hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:6879756e@gmail.com?subject=Hello%20from%20The%20Trepid%20Programmer"
                    className="hover:text-black hover:underline"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
