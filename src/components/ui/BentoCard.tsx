"use client";

import { ReactNode } from "react";

interface BentoCardProps {
  size: "sm" | "md" | "lg";
  title: string;
  description: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function BentoCard({
  size,
  title,
  description,
  icon,
  children,
  className = "",
}: BentoCardProps) {
  const sizeClasses = {
    sm: "col-span-1",
    md: "col-span-1 md:col-span-1",
    lg: "col-span-1 md:col-span-2",
  };

  return (
    <div
      className={`
        bento-card
        bg-brand-light rounded-2xl p-6 md:p-8
        flex flex-col gap-4 justify-between
        min-h-[220px]
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <div className="flex flex-col gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
            {icon}
          </div>
        )}
        <h3 className="text-lg md:text-xl font-bold text-brand-dark dark:text-white">{title}</h3>
        <p className="text-sm text-brand-gray leading-relaxed">{description}</p>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
