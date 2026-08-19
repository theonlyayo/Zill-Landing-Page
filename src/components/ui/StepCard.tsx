interface StepCardProps {
  number: number;
  title: string;
  description: string;
  active?: boolean;
}

export function StepCard({ number, title, description, active = false }: StepCardProps) {
  return (
    <div
      className={`
        flex flex-col gap-3 p-6 md:p-8 rounded-2xl transition-all duration-300 border
        ${active ? "bg-white dark:bg-[#000000] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-brand-dark/10 dark:border-white/10" : "bg-transparent border-transparent"}
      `}
    >
      <span
        className={`
          text-5xl md:text-6xl font-black tabular-nums
          ${active ? "text-brand" : "text-brand-dark dark:text-white/10"}
          transition-colors duration-500 ease-in-out
        `}
      >
        {String(number).padStart(2, "0")}
      </span>
      <h3 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white">{title}</h3>
      <p className="text-sm md:text-base text-brand-gray leading-relaxed max-w-md">
        {description}
      </p>
    </div>
  );
}
