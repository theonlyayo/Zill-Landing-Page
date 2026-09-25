export function MobileAdminBlocker() {
  return (
    <div
      className="lg:hidden fixed inset-0 z-50 flex items-center justify-center bg-[#111111] px-4 font-archivo select-none"
      aria-label="Desktop only notice"
    >
      <div className="px-8 py-4 bg-[#460000] rounded-[51px] inline-flex items-center justify-center gap-2.5 shadow-2xl">
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M8 6V9.33333"
            stroke="#FE2929"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.9993 14.2735H3.9593C1.64597 14.2735 0.679304 12.6202 1.7993 10.6002L3.8793 6.85352L5.8393 3.33352C7.02597 1.19352 8.97264 1.19352 10.1593 3.33352L12.1193 6.86018L14.1993 10.6068C15.3193 12.6268 14.346 14.2802 12.0393 14.2802H7.9993V14.2735Z"
            stroke="#FE2929"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.99609 11.333H8.00208"
            stroke="#FE2929"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[#FE2929] text-base font-medium font-archivo whitespace-nowrap">
          Please View on your Laptop :)
        </span>
      </div>
    </div>
  );
}
