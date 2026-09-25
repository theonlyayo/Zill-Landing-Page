"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface FeedbackState {
  type: "success" | "error";
  message: string;
  id?: number | string;
}

interface FeedbackPillProps {
  feedback: FeedbackState | null;
}

export function FeedbackPill({ feedback }: FeedbackPillProps) {
  return (
    <div className="absolute top-[calc(100%+48px)] left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap">
      <AnimatePresence mode="wait">
        {feedback && (
          <motion.div
            key={`${feedback.type}-${feedback.message}`}
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1], // Smooth buttery ease-out
            }}
            className="pointer-events-auto"
          >
            {feedback.type === "success" ? (
              <div className="px-6 py-3 bg-[#002E01] rounded-[19px] inline-flex justify-center items-center gap-2 shadow-2xl">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <path
                    d="M14.6663 8.00033C14.6663 4.31843 11.6816 1.33366 7.99967 1.33366C4.31778 1.33366 1.33301 4.31843 1.33301 8.00033C1.33301 11.6822 4.31778 14.667 7.99967 14.667C11.6816 14.667 14.6663 11.6822 14.6663 8.00033Z"
                    stroke="#29FE29"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M5.33301 8.33333L6.99967 10L10.6663 6"
                    stroke="#29FE29"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="justify-start text-[#29FE29] text-xs font-medium font-archivo">
                  {feedback.message}
                </span>
              </div>
            ) : (
              <div className="px-6 py-3 bg-[#460000] rounded-[19px] inline-flex justify-center items-center gap-2 shadow-2xl">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <path
                    d="M8 6V9.33333"
                    stroke="#FE2929"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.9993 14.2735H3.9593C1.64597 14.2735 0.679304 12.6202 1.7993 10.6002L3.8793 6.85352L5.8393 3.33352C7.02597 1.19352 8.97264 1.19352 10.1593 3.33352L12.1193 6.86018L14.1993 10.6068C15.3193 12.6268 14.346 14.2802 12.0393 14.2802H7.9993V14.2735Z"
                    stroke="#FE2929"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.99609 11.333H8.00208"
                    stroke="#FE2929"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="justify-start text-[#FE2929] text-xs font-medium font-archivo">
                  {feedback.message}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
