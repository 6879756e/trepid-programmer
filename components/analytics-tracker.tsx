"use client";

import { useEffect, useRef } from "react";
import { logPostView } from "@/app/posts/actions";

export default function AnalyticsTracker({ slug }: { slug: string }) {
  const startTime = useRef(Date.now());
  const maxScroll = useRef(0); // Track the deepest point reached

  useEffect(() => {
    startTime.current = Date.now();
    maxScroll.current = 0;

    // 1. Scroll Listener Logic
    const handleScroll = () => {
      // Calculate how far down the user is (0 to 100)
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentPos = window.scrollY;

      // If page is short and fits on screen, they read 100%
      let percentage = 100;

      if (totalHeight > 0) {
        percentage = Math.round((currentPos / totalHeight) * 100);
      }

      // Ensure we don't go over 100 or under 0
      percentage = Math.min(100, Math.max(0, percentage));

      // Only update if they went deeper than before
      if (percentage > maxScroll.current) {
        maxScroll.current = percentage;
      }
    };

    // Add listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 2. Cleanup (Send Data)
    return () => {
      // Remove listener
      window.removeEventListener("scroll", handleScroll);

      const endTime = Date.now();
      const timeSpentMs = endTime - startTime.current;
      const timeSpentSeconds = Math.round(timeSpentMs / 1000);

      // Send both Duration AND Scroll Depth
      void logPostView(slug, timeSpentSeconds, maxScroll.current);
    };
  }, [slug]);

  return null;
}
