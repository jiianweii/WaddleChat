import React from "react";

interface ButtonProps {
  className?: string;
  handleClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  className,
  handleClick,
  children,
}: ButtonProps) {
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
