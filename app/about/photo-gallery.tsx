"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// 1. DATA STRUCTURE WITH CAPTIONS
const IMAGES = [
  {
    src: "https://voteyksuyaasmmyfvmfi.supabase.co/storage/v1/object/public/blog-images/public/me.JPG",
    caption: "The most flattering image of myself.",
  },
  {
    src: "https://voteyksuyaasmmyfvmfi.supabase.co/storage/v1/object/public/blog-images/public/me_2.JPG",
    caption: "Hiking in the Alps. I regret wearing these shoes.",
  },
  {
    src: "https://voteyksuyaasmmyfvmfi.supabase.co/storage/v1/object/public/blog-images/public/me_3.JPG",
    caption: "3:00 AM debugging session. Coffee #4.",
  },
];

export default function PhotoGallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedId === null) return;
      if (e.key === "Escape") setSelectedId(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  const nextImage = () => {
    setSelectedId((prev) =>
      prev === null ? null : (prev + 1) % IMAGES.length
    );
  };

  const prevImage = () => {
    setSelectedId((prev) =>
      prev === null ? null : (prev - 1 + IMAGES.length) % IMAGES.length
    );
  };

  return (
    <>
      {/* --- THE STACK --- */}
      <div
        className="relative w-64 h-64 mx-auto md:mx-0 cursor-pointer group perspective-1000"
        onClick={() => setSelectedId(0)}
      >
        {/* Back Image (Image 3) */}
        <div className="absolute inset-0 transition-all duration-500 ease-out group-hover:rotate-12 group-hover:translate-x-24 group-hover:scale-105 z-10 opacity-90">
          <GalleryImage src={IMAGES[2].src} alt="Back" />
        </div>

        {/* Middle Image (Image 2) */}
        <div className="absolute inset-0 transition-all duration-500 ease-out group-hover:rotate-6 group-hover:translate-x-12 group-hover:scale-105 z-20">
          <GalleryImage src={IMAGES[1].src} alt="Middle" />
        </div>

        {/* Front Image (Main) - Animated with Framer Motion */}
        <motion.div
          layoutId={`image-container-0`} // <--- Magic Link ID
          className="absolute inset-0 z-30 shadow-xl rounded-lg overflow-hidden bg-white"
          initial={{ rotate: 2 }}
          whileHover={{
            rotate: 0,
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          // The Rattle Animation on Hover
          animate={{
            rotate: 2, // default state
          }}
          // We use specific variants to control the rattle so it doesn't fight the layoutId
          variants={{
            hover: {
              rotate: [0, -2, 2, -1, 1, 0], // The Rattle Keyframes
              transition: { duration: 0.4, ease: "easeInOut" },
            },
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* We wrap the Image in a plain div to avoid layoutId conflicts with Next/Image internals */}
          <div className="relative w-full h-full">
            <Image
              src={IMAGES[0].src}
              alt="Main Profile"
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* --- FULL SCREEN MODAL --- */}
      <AnimatePresence>
        {selectedId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setSelectedId(null)}
          >
            {/* The Image Container */}
            <motion.div
              layoutId={selectedId === 0 ? `image-container-0` : undefined} // Only animate from stack if it's the first image
              className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent close on image click
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Image Aspect Ratio Wrapper */}
              <div className="relative aspect-[4/3] md:aspect-[16/9] w-full bg-gray-900">
                <Image
                  src={IMAGES[selectedId].src}
                  alt="Gallery"
                  fill
                  className="object-contain"
                  priority
                  sizes="90vw"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Caption Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={selectedId} // Re-animates text when slide changes
                className="bg-white p-6 border-t border-gray-100"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-mono text-sm text-gray-400 mb-1">
                      Image {selectedId + 1} / {IMAGES.length}
                    </h3>
                    <p className="text-gray-900 text-lg font-medium leading-relaxed">
                      {IMAGES[selectedId].caption}
                    </p>
                  </div>

                  {/* Close Text Button */}
                  <button
                    onClick={() => setSelectedId(null)}
                    className="text-gray-400 hover:text-black transition"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Simple Helper for the background images in the stack
function GalleryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  );
}
