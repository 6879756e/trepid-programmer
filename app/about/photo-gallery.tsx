"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// 1. DEFINE YOUR IMAGES HERE
const IMAGES = [
  "https://voteyksuyaasmmyfvmfi.supabase.co/storage/v1/object/public/blog-images/public/me.JPG",
  "https://voteyksuyaasmmyfvmfi.supabase.co/storage/v1/object/public/blog-images/public/me_2.JPG",
  "https://voteyksuyaasmmyfvmfi.supabase.co/storage/v1/object/public/blog-images/public/me_3.JPG",
];

export default function PhotoGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle Keyboard Navigation (Esc, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      {/* --- THE STACK (On Page) --- */}
      <div
        className="relative w-64 h-64 mx-auto md:mx-0 group cursor-pointer"
        onClick={() => openLightbox(0)}
      >
        {/* Image 3 (Back) */}
        <div className="absolute inset-0 transition-all duration-500 ease-out group-hover:rotate-12 group-hover:translate-x-24 group-hover:scale-105 z-10">
          <GalleryImage src={IMAGES[2]} alt="Me 3" />
        </div>

        {/* Image 2 (Middle) */}
        <div className="absolute inset-0 transition-all duration-500 ease-out group-hover:rotate-6 group-hover:translate-x-12 group-hover:scale-105 z-20">
          <GalleryImage src={IMAGES[1]} alt="Me 2" />
        </div>

        {/* Image 1 (Front - Main) */}
        {/* On hover: Rotates back to 0, rattles, and lifts slightly */}
        <div className="absolute inset-0 transition-transform duration-500 rotate-2 group-hover:rotate-0 group-hover:scale-105 z-30 group-hover:animate-rattle">
          <GalleryImage src={IMAGES[0]} alt="Me Main" priority />
        </div>
      </div>

      {/* --- THE LIGHTBOX (Full Screen) --- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)} // Click outside to close
        >
          {/* Close Button */}
          <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2">
            <svg
              className="w-8 h-8"
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

          {/* Main Lightbox Image */}
          <div
            className="relative w-full max-w-4xl aspect-[4/3] md:aspect-video"
            onClick={(e) => e.stopPropagation()} // Don't close when clicking image
          >
            <Image
              src={IMAGES[currentIndex]}
              alt={`Gallery ${currentIndex}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition"
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
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition"
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

          {/* Index Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-mono text-sm">
            {currentIndex + 1} / {IMAGES.length}
          </div>
        </div>
      )}
    </>
  );
}

// Helper to keep code clean
function GalleryImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority={priority}
      />
    </div>
  );
}
