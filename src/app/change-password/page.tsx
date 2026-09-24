"use client";

import { useState, useEffect, FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email ?? null);
        setUserId(user.id);
      }
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (!userEmail || !userId) {
      setError("Session expired. Please log in again.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    // Step 1: Verify they know the current (temporary) password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: currentPassword,
    });

    if (signInError) {
      setError("Current password is incorrect.");
      setLoading(false);
      return;
    }

    // Step 2: Update to the new password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    // Step 3: Clear the must_change_password flag
    const { error: flagError } = await supabase
      .from("team_members")
      .update({ must_change_password: false })
      .eq("user_id", userId);

    if (flagError) {
      setError("Password updated but failed to clear flag. Contact your admin.");
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
            Secure your account to continue
          </p>
        </div>

        {/* Change Password Card */}
        <div className="bg-brand-light dark:bg-[#111111] rounded-2xl p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-brand-dark dark:text-white">
              Set a new password
            </h2>
            <p className="text-xs text-brand-gray dark:text-[#888888] mt-1.5 leading-relaxed">
              You&apos;re using a temporary password. Choose a secure one before
              accessing the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="current-password"
                className="text-xs font-medium text-brand-gray dark:text-[#888888] uppercase tracking-wider"
              >
                Current password
              </label>
              <input
                id="current-password"
                type="password"
                required
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-11 px-4 rounded-xl bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/10 text-brand-dark dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand/30 transition-all"
                placeholder="Temporary password"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="new-password"
                className="text-xs font-medium text-brand-gray dark:text-[#888888] uppercase tracking-wider"
              >
                New password
              </label>
              <input
                id="new-password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11 px-4 rounded-xl bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/10 text-brand-dark dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand/30 transition-all"
                placeholder="Min. 8 characters"
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
              className="mt-2 h-11 rounded-[666px] bg-brand text-white text-sm font-medium cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating…" : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
