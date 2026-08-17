"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import GalleryTunnel from "@/components/ui/GalleryTunnel";
import { CampusYearbook } from "@/components/ui/CampusYearbook";
import { motion, AnimatePresence } from "framer-motion";

export default function TeamPage() {
  const [showYearbook, setShowYearbook] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5.0);
  const [nudgeMessage, setNudgeMessage] = useState<string | null>(null);

  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const nudgeClearRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    idleTimerRef.current = setTimeout(() => {
      showNudge("Click and hold anywhere for 5 seconds to meet the team.");
    }, 5000);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (holdTimerRef.current) clearInterval(holdTimerRef.current);
      if (nudgeClearRef.current) clearTimeout(nudgeClearRef.current);
    };
  }, []);

  const showNudge = (msg: string) => {
    setNudgeMessage(msg);
    if (nudgeClearRef.current) clearTimeout(nudgeClearRef.current);
    nudgeClearRef.current = setTimeout(() => {
      setNudgeMessage(null);
    }, 4000);
  };

  const handlePointerDown = useCallback(() => {
    if (showYearbook) return;
    
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setNudgeMessage(null);
    
    setIsHolding(true);
    setTimeLeft(5.0);
    
    let currentLeft = 5.0;
    holdTimerRef.current = setInterval(() => {
      currentLeft -= 0.1;
      if (currentLeft <= 0) {
        currentLeft = 0;
        if (holdTimerRef.current) clearInterval(holdTimerRef.current);
        setShowYearbook(true);
      }
      setTimeLeft(Math.max(0, currentLeft));
    }, 100);
  }, [showYearbook]);

  const handlePointerUp = useCallback(() => {
    if (showYearbook) return;
    
    setIsHolding(false);
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }

    if (timeLeft > 0 && timeLeft < 5.0) {
      showNudge("Keep holding for 5 seconds to meet the team.");
    }
    
    setTimeLeft(5.0);
  }, [showYearbook, timeLeft]);

  if (showYearbook) {
    return <CampusYearbook />;
  }

  return (
    <main 
      className="h-screen w-screen bg-black overflow-hidden font-sans relative touch-none select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="absolute inset-0 z-0">
        <GalleryTunnel label={false} />
      </div>

      {/* Main Text fades out while holding */}
      <div 
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4 transition-opacity duration-500 ease-in-out" 
        style={{ opacity: isHolding ? 0 : 1 }}
      >
        <h1 className="text-5xl md:text-[64px] font-bold text-white leading-[1.1] tracking-tight">
          Meet the Team
        </h1>
        <p className="text-[#B0B0B0] mt-6 text-[15px] md:text-[17px] max-w-lg">
          Click and hold your cursor to navigate the tunnel and explore the faces behind Zill.
        </p>
      </div>

      {/* Minimal sleek progress UI at the bottom */}
      <AnimatePresence>
        {isHolding && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-end pb-12 pointer-events-none"
          >
            <div className="text-white text-xs md:text-sm tracking-[0.2em] uppercase font-medium mb-6">
              Unlocking in {Math.ceil(timeLeft)}s
            </div>
            
            <div className="w-full max-w-xs md:max-w-md h-[2px] bg-white/20 rounded-full overflow-hidden mx-8">
              <motion.div 
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${(1 - Math.max(0, timeLeft) / 5) * 100}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {nudgeMessage && !isHolding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-12 left-0 right-0 z-30 flex justify-center pointer-events-none"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium shadow-2xl">
              {nudgeMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
