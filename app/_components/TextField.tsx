"use client";

import React from "react";

export default function TextField({
  className,
  placeholder,
  value,
  setValue,
  handleSubmit,
}: {
  className?: string;
  placeholder?: string;
  value?: string;
  setValue?: (value: string) => void;
  handleSubmit?: () => void;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={
        className + " p-4 border-2 border-[var(--BLUE)] rounded-lg w-full"
      }
      value={value}
      onChange={(e) => setValue?.(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSubmit?.();
      }}
    />
  );
}
