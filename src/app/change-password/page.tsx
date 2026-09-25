"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { FeedbackPill, FeedbackState } from "@/components/admin/FeedbackPill";
import { MobileAdminBlocker } from "@/components/admin/MobileAdminBlocker";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pwDebounceRef = useRef<NodeJS.Timeout | null>(null);

  const showFeedback = (type: "success" | "error", message: string) => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setFeedback({ type, message });
    feedbackTimerRef.current = setTimeout(() => {
      setFeedback(null);
    }, 5000);
  };

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email ?? null);
        setUserId(user.id);
      }
    });

    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      if (pwDebounceRef.current) clearTimeout(pwDebounceRef.current);
    };
  }, []);

  const handleCurrentPasswordChange = (val: string) => {
    setCurrentPassword(val);
    if (feedback?.message === "Enter your Current Password" && val.trim()) {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      setFeedback(null);
    }
  };

  const handleCurrentPasswordBlur = () => {
    if (!currentPassword.trim()) {
      showFeedback("error", "Enter your Current Password");
    }
  };

  const handleNewPasswordChange = (val: string) => {
    setNewPassword(val);
    if (pwDebounceRef.current) clearTimeout(pwDebounceRef.current);

    if (
      (feedback?.message === "Enter a New Password" ||
        feedback?.message === "Password must be at least 8 characters") &&
      val.length >= 8
    ) {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      setFeedback(null);
      return;
    }

    pwDebounceRef.current = setTimeout(() => {
      if (val.trim() && val.length < 8) {
        showFeedback("error", "Password must be at least 8 characters");
      }
    }, 800);
  };

  const handleNewPasswordBlur = () => {
    if (pwDebounceRef.current) clearTimeout(pwDebounceRef.current);
    if (!newPassword.trim()) {
      showFeedback("error", "Enter a New Password");
    } else if (newPassword.length < 8) {
      showFeedback("error", "Password must be at least 8 characters");
    }
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!currentPassword.trim()) {
      showFeedback("error", "Enter your Current Password");
      return;
    }

    if (!newPassword.trim()) {
      showFeedback("error", "Enter a New Password");
      return;
    }

    if (newPassword.length < 8) {
      showFeedback("error", "Password must be at least 8 characters");
      return;
    }

    if (!userEmail || !userId) {
      showFeedback("error", "Session expired. Please log in again.");
      return;
    }

    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setFeedback(null);
    setLoading(true);

    const supabase = createClient();

    // Step 1: Verify they know the current (temporary) password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: currentPassword,
    });

    if (signInError) {
      showFeedback("error", "Current password is incorrect.");
      setLoading(false);
      return;
    }

    // Step 2: Update to the new password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      showFeedback("error", updateError.message);
      setLoading(false);
      return;
    }

    // Step 3: Clear the must_change_password flag
    const { error: flagError } = await supabase
      .from("team_members")
      .update({ must_change_password: false })
      .eq("user_id", userId);

    if (flagError) {
      showFeedback(
        "error",
        "Password updated but failed to clear flag. Contact your admin."
      );
      setLoading(false);
      return;
    }

    // Success feedback pill!
    showFeedback("success", "Password Updated");
    setTimeout(() => {
      router.push("/team/waitlist");
      router.refresh();
    }, 1500);
  }

  return (
    <>
      <MobileAdminBlocker />
      <div className="hidden lg:flex relative min-h-screen items-center justify-center py-20 px-4 overflow-x-hidden bg-black font-archivo">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/admin/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Top Left Logo */}
      <img src="/admin/ZILL LOGO.svg" alt="Zill" className="absolute top-12 left-16 z-10 w-10 h-12" />

      {/* Card & Feedback Wrapper */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Card */}
        <div className="relative p-16 bg-[#111111] squircle inline-flex flex-col justify-start items-center gap-16 shadow-2xl">
          <div className="flex flex-col justify-start items-center gap-1">
            <div className="text-center justify-start">
              <span className="text-zinc-100 text-2xl font-[700]">Zill </span>
              <span className="text-zinc-100 text-2xl font-[100]">Admin</span>
            </div>
            <div className="text-center justify-start text-neutral-500 text-xs font-normal">
              Team Access Only
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col justify-start items-center gap-8 w-96 max-w-full"
          >
            <div className="w-full flex flex-col justify-start items-start gap-8">
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="justify-start text-zinc-100 text-base font-normal">
                  Set a New Password
                </div>
                <div className="self-stretch justify-start text-neutral-500 text-xs font-normal leading-4">
                  You’re using a temporary password. Create a secure one before{" "}
                  <br />
                  accessing the dashboard
                </div>
              </div>

              <div className="w-full flex flex-col justify-start items-start gap-4">
                <div className="self-stretch flex flex-col justify-start items-start gap-3 group">
                  <label
                    htmlFor="current-password"
                    className="self-stretch justify-start text-zinc-100 text-base font-normal"
                  >
                    Current Password
                  </label>
                  <div className="self-stretch h-[48px] relative rounded-full outline outline-1 outline-offset-[-0.50px] outline-zinc-800 overflow-hidden focus-within:outline-neutral-400 transition-all duration-200 ease-in-out bg-transparent group/cpw">
                    <input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={currentPassword}
                      onChange={(e) => handleCurrentPasswordChange(e.target.value)}
                      onBlur={handleCurrentPasswordBlur}
                      className="absolute inset-0 w-full h-full bg-transparent pl-[18px] pr-12 text-zinc-100 text-base font-normal outline-none placeholder:text-zinc-800"
                      placeholder="Enter your Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#303030] group-focus-within/cpw:text-[#919191] transition-all duration-200 ease-in-out cursor-pointer"
                    >
                      {showCurrentPassword ? (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3C5.7 3 2.73 5.11 1.16 8.5C1.07 8.71 1.07 8.96 1.16 9.17C2.73 12.56 5.7 14.67 9 14.67C12.3 14.67 15.27 12.56 16.84 9.17C16.93 8.96 16.93 8.71 16.84 8.5C15.27 5.11 12.3 3 9 3ZM9 12.5C7.07 12.5 5.5 10.93 5.5 9C5.5 7.07 7.07 5.5 9 5.5C10.93 5.5 12.5 7.07 12.5 9C12.5 10.93 10.93 12.5 9 12.5ZM9 7C7.9 7 7 7.9 7 9C7 10.1 7.9 11 9 11C10.1 11 11 10.1 11 9C11 7.9 10.1 7 9 7Z" fill="currentColor"/></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.001 2.998C6.782 2.993 4.912 4.089 3.376 5.881C2.85 6.494 2.39 7.149 2.017 7.803C1.79 8.199 1.652 8.505 1.571 8.694C1.49 8.882 1.49 9.114 1.571 9.303C1.652 9.492 1.79 9.798 2.017 10.194C2.318 10.721 2.669 11.258 3.071 11.764C3.135 11.844 3.641 12.419 4.079 12.865L3.212 13.709C2.919 14.002 2.919 14.494 3.212 14.787C3.505 15.08 3.997 15.08 4.29 14.787L14.79 4.287C15.083 3.994 15.083 3.502 14.79 3.209C14.643 3.063 14.443 2.998 14.251 2.998C14.059 2.998 13.859 3.063 13.712 3.209L12.751 4.194C11.511 3.364 10.278 3.001 9.001 2.998ZM9.001 5.998C9.39 5.998 9.983 6.101 10.524 6.42L9.376 7.569C9.258 7.507 9.034 7.498 9.001 7.498C8.172 7.498 7.501 8.169 7.501 8.998C7.501 9.031 7.49 9.258 7.524 9.396C7.38 9.571 6.399 10.521 6.399 10.521C6.138 10.067 6.004 9.519 6.001 8.998C5.993 7.341 7.344 5.998 9.001 5.998ZM14.955 6.256C14.955 6.256 7.638 13.545 6.657 14.529C7.737 14.958 8.846 14.998 9.001 14.998C11.22 14.998 13.09 13.908 14.626 12.115C15.152 11.502 15.612 10.848 15.985 10.194C16.212 9.798 16.35 9.492 16.431 9.303C16.512 9.112 16.514 8.883 16.431 8.694C16.26 8.304 15.94 7.683 15.447 6.959C15.314 6.765 14.955 6.256 14.955 6.256Z" fill="currentColor"/></svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="self-stretch flex flex-col justify-start items-start gap-3 group">
                  <label
                    htmlFor="new-password"
                    className="self-stretch justify-start text-zinc-100 text-base font-normal"
                  >
                    New Password
                  </label>
                  <div className="self-stretch h-[48px] relative rounded-full outline outline-1 outline-offset-[-0.50px] outline-zinc-800 overflow-hidden focus-within:outline-zinc-700 transition-all duration-200 ease-in-out bg-transparent group/npw">
                    <input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => handleNewPasswordChange(e.target.value)}
                      onBlur={handleNewPasswordBlur}
                      className="absolute inset-0 w-full h-full bg-transparent pl-[18px] pr-12 text-zinc-100 text-base font-normal outline-none placeholder:text-zinc-800"
                      placeholder="Enter your Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#303030] group-focus-within/npw:text-[#919191] transition-all duration-200 ease-in-out cursor-pointer"
                    >
                      {showNewPassword ? (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3C5.7 3 2.73 5.11 1.16 8.5C1.07 8.71 1.07 8.96 1.16 9.17C2.73 12.56 5.7 14.67 9 14.67C12.3 14.67 15.27 12.56 16.84 9.17C16.93 8.96 16.93 8.71 16.84 8.5C15.27 5.11 12.3 3 9 3ZM9 12.5C7.07 12.5 5.5 10.93 5.5 9C5.5 7.07 7.07 5.5 9 5.5C10.93 5.5 12.5 7.07 12.5 9C12.5 10.93 10.93 12.5 9 12.5ZM9 7C7.9 7 7 7.9 7 9C7 10.1 7.9 11 9 11C10.1 11 11 10.1 11 9C11 7.9 10.1 7 9 7Z" fill="currentColor"/></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.001 2.998C6.782 2.993 4.912 4.089 3.376 5.881C2.85 6.494 2.39 7.149 2.017 7.803C1.79 8.199 1.652 8.505 1.571 8.694C1.49 8.882 1.49 9.114 1.571 9.303C1.652 9.492 1.79 9.798 2.017 10.194C2.318 10.721 2.669 11.258 3.071 11.764C3.135 11.844 3.641 12.419 4.079 12.865L3.212 13.709C2.919 14.002 2.919 14.494 3.212 14.787C3.505 15.08 3.997 15.08 4.29 14.787L14.79 4.287C15.083 3.994 15.083 3.502 14.79 3.209C14.643 3.063 14.443 2.998 14.251 2.998C14.059 2.998 13.859 3.063 13.712 3.209L12.751 4.194C11.511 3.364 10.278 3.001 9.001 2.998ZM9.001 5.998C9.39 5.998 9.983 6.101 10.524 6.42L9.376 7.569C9.258 7.507 9.034 7.498 9.001 7.498C8.172 7.498 7.501 8.169 7.501 8.998C7.501 9.031 7.49 9.258 7.524 9.396C7.38 9.571 6.399 10.521 6.399 10.521C6.138 10.067 6.004 9.519 6.001 8.998C5.993 7.341 7.344 5.998 9.001 5.998ZM14.955 6.256C14.955 6.256 7.638 13.545 6.657 14.529C7.737 14.958 8.846 14.998 9.001 14.998C11.22 14.998 13.09 13.908 14.626 12.115C15.152 11.502 15.612 10.848 15.985 10.194C16.212 9.798 16.35 9.492 16.431 9.303C16.512 9.112 16.514 8.883 16.431 8.694C16.26 8.304 15.94 7.683 15.447 6.959C15.314 6.765 14.955 6.256 14.955 6.256Z" fill="currentColor"/></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-4">
              <button
                type="submit"
                disabled={loading}
                className="self-stretch h-[48px] px-4 py-3 bg-[#FF3700] rounded-full inline-flex justify-center items-center gap-2 hover:bg-[#e63200] transition-colors disabled:opacity-50 cursor-pointer"
              >
                <span className="justify-start text-white text-base font-medium">
                  {loading ? "Updating…" : "Update Password"}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Feedback Pill 48px below card */}
        <FeedbackPill feedback={feedback} />
      </div>
    </div>
    </>
  );
}
