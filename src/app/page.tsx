"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true); // Ensure hydration to avoid mismatch

    // Check local storage and system preference for dark mode
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(systemPrefersDark);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode, hydrated]);

  if (!hydrated) return null; // Prevents flash of incorrect theme on load

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black dark:bg-black dark:text-white p-6 sm:p-12 transition-all">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="absolute top-6 right-6 px-4 py-2 text-sm font-medium border border-gray-500 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Hero Section */}
      <header className="text-center space-y-6 max-w-3xl">
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">Recrutas</h1>
        <p className="text-lg sm:text-xl opacity-75">
          AI-driven job matching, bias-free interviews, and real-time updates. Recrutas redefines the hiring experience.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <a
            href="/post-job"
            className="px-6 py-3 bg-black text-white text-lg font-semibold rounded-full shadow-md hover:bg-gray-800 transition dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Post a Job
          </a>
          <a
            href="/find-job"
            className="px-6 py-3 border border-black text-lg font-semibold rounded-full shadow-md hover:bg-gray-200 transition dark:border-white dark:hover:bg-gray-800"
          >
            Find a Job
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-center w-full max-w-5xl">
        <div className="p-6 bg-gray-100 rounded-2xl shadow-lg transition hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800">
          <h2 className="text-2xl font-bold">⚡ AI-Powered Screening</h2>
          <p className="opacity-75 mt-2">Automated evaluations ensure top talent rises to the top.</p>
        </div>
        <div className="p-6 bg-gray-100 rounded-2xl shadow-lg transition hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800">
          <h2 className="text-2xl font-bold">🛡️ Anonymous Interviews</h2>
          <p className="opacity-75 mt-2">Reduce bias with face-hidden, skill-based interviews.</p>
        </div>
        <div className="p-6 bg-gray-100 rounded-2xl shadow-lg transition hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800">
          <h2 className="text-2xl font-bold">🔔 Real-Time Updates</h2>
          <p className="opacity-75 mt-2">Get notified at every step—no ghosting, no waiting.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-500 dark:text-gray-400 text-lg">
        <p>© 2025 Recrutas. All rights reserved.</p>
      </footer>
    </div>
  );
}
