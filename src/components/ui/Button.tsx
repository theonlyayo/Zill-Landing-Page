"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "brand" | "dark" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  brand:
    "bg-brand",
  dark:
    "bg-[#111111]",
  outline:
    "bg-transparent border border-brand-dark/20 text-brand-dark",
};

export function Button({
  variant = "brand",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const textColor = variant === "outline" ? "" : "text-white";

  return (
    <button
      className={`
        h-10 px-4 py-2.5 rounded-[666px] inline-flex justify-center items-center gap-1
        ${textColor} text-[14px] font-medium font-archivo leading-4 whitespace-nowrap
        cursor-pointer transition-transform duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-[0.97]
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      <div className="text-center justify-start">{children}</div>
    </button>
  );
}
