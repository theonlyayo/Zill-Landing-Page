"use client";

import { useState, FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/team/waitlist");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#000000] px-4 transition-colors duration-500">
      <div className="w-full max-w-sm">
        {/* Logo / Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-brand-dark dark:text-white tracking-tight">
            Zill
          </h1>
          <p className="text-brand-gray dark:text-[#888888] text-sm mt-2">
            Team access only
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-brand-light dark:bg-[#111111] rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-brand-gray dark:text-[#888888] uppercase tracking-wider"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 px-4 rounded-xl bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/10 text-brand-dark dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand/30 transition-all"
                placeholder="you@zill.app"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-brand-gray dark:text-[#888888] uppercase tracking-wider"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 px-4 rounded-xl bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/10 text-brand-dark dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand/30 transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 dark:text-red-400 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-11 rounded-[666px] bg-brand-dark dark:bg-white text-white dark:text-brand-dark text-sm font-medium cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
