"use client";

import { FormEvent, useState } from "react";
import { Button } from "./Button";
import { supabase } from "@/lib/supabase";

interface WaitlistFormProps {
  dark?: boolean;
}

export function WaitlistForm({ dark = false }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError(null);

    if (!supabase) {
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
      }, 500);
      return;
    }
    
    try {
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([{ email }]);
        
      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setSubmitted(true);
        } else {
          throw supabaseError;
        }
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Waitlist Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        className={`flex items-center gap-3 text-[14px] font-medium ${
          dark ? "text-white/80" : "text-brand-dark/70"
        }`}
      >
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-[666px] bg-brand text-white text-xs">
          ✓
        </span>
        You&apos;re on the list. We&apos;ll reach out soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
      
      {/* Uiverse Animated Input */}
      <div 
        className={`
          relative flex items-center w-full h-10 px-3 
          transition-all duration-500 ease-in-out
          group overflow-hidden
          ${dark ? "bg-white/10" : "bg-[#f4f4f4]"}
          rounded-[30px] focus-within:rounded-[2px]
        `}
      >
        {/* Search Icon */}
        <div className="flex-shrink-0 text-[#8b8ba7] border-none bg-transparent flex items-center justify-center w-[17px] mt-[1px]">
          <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
              <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
        
        <input
          type="email"
          required
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`
            w-full h-full text-[14px] bg-transparent border-none outline-none px-2
            ${dark ? "text-white placeholder:text-white/40" : "text-[#111111] placeholder:text-[#8b8ba7]"}
            peer
          `}
        />
        
        {/* Reset Button */}
        <button 
          type="button" 
          onClick={() => setEmail("")}
          className={`
            flex-shrink-0 border-none bg-transparent text-[#8b8ba7] transition-all duration-200
            ${email.length > 0 ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Animated Border */}
        <div className="absolute left-0 bottom-0 w-full h-[2px] bg-brand origin-center scale-x-0 transition-transform duration-300 ease-out group-focus-within:scale-x-100 rounded-[1px]" />
      </div>

            <div className="flex flex-col gap-1 sm:w-auto w-full">
        <Button variant="brand" type="submit" disabled={loading}>
          {loading ? "Joining..." : "Join the waitlist"}
        </Button>
        {error && <span className="text-red-500 text-xs pl-2">{error}</span>}
      </div>
    </form>
  );
}
