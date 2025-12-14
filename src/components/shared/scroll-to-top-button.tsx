"use client";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = useScrollToTop();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 z-50 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all">
      <ArrowUp size={24} />
    </button>
  );
}
