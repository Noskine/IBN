"use client";

import React from "react";
import { motion } from "motion/react";

export type LoadingSpinnerProps = {
  /** tamanho visual (sm | md | lg) */
  size?: "sm" | "md" | "lg";
  /** texto opcional exibido abaixo da animação */
  text?: string;
  /** estilo da animação ('dots' ou 'spinner') */
  variant?: "dots" | "spinner";
  /** classes adicionais do Tailwind */
  className?: string;
  /** label para acessibilidade */
  ariaLabel?: string;
};

const sizeMap = {
  sm: { dot: 6, gap: 2, spinner: 6 },
  md: { dot: 8, gap: 3, spinner: 8 },
  lg: { dot: 24, gap: 4, spinner: 24},
};

// Default export (componente pronto para uso)
export default function LoadingSpinner({
  size = "md",
  text,
  variant = "dots",
  className = "",
  ariaLabel = "Carregando",
}: LoadingSpinnerProps) {
  const s = sizeMap[size as keyof typeof sizeMap];

  if (variant === "spinner") {
    return (
      <div
        role='status'
        aria-label={ariaLabel}
        className={`flex flex-col items-center justify-center gap-2 ${className}`}
      >
        <motion.div
          aria-hidden
          className='rounded-full border-4 border-t-transparent border-slate-700/20'
          style={{
            width: `${s.spinner}px`,
            height: `${s.spinner}px`,
            borderTopColor: undefined,
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 0.9 }}
        >
          {/* a borda superior usará uma cor via tailwind aplicada inline para manter contraste */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "9999px",
              borderTop: "4px solid",
              borderRight: "4px solid transparent",
              borderBottom: "4px solid transparent",
              borderLeft: "4px solid transparent",
              boxSizing: "border-box",
              borderTopColor: "#12c91b", // teal-500-ish
            }}
          />
        </motion.div>

        {text ? <span className='text-xs text-slate-600'>{text}</span> : null}
      </div>
    );
  }

  // Dots variant (3 pulsing dots with nice motion)
  const dotSize = s.dot;
  const gap = s.gap;
  const dotVariant = {
    hidden: { scale: 0.6, opacity: 0.4 },
    visible: { scale: 1, opacity: 1 },
  };

  return (
    <div
      role='status'
      aria-label={ariaLabel}
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <div
        className='flex items-center justify-center'
        style={{ gap: `${gap}px` }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className='block rounded-full bg-green-500'
            style={{ width: `${dotSize}px`, height: `${dotSize}px` }}
            variants={dotVariant}
            initial='hidden'
            animate='visible'
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              duration: 0.6,
              delay: i * 0.12,
            }}
          />
        ))}
      </div>

      {text ? <span className='text-xs text-slate-600'>{text}</span> : null}
    </div>
  );
}

/**
 Usage examples:

 // Import
 import LoadingSpinner from "@/components/LoadingSpinner";

 // Basic dots (default)
 <LoadingSpinner />

 // Spinner big with text
 <LoadingSpinner size="lg" variant="spinner" text="Carregando dados..." />

 // Custom classes
 <LoadingSpinner className="my-4" />
*/
