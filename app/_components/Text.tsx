import React from "react";

export default function Text({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={className + " text-black"}>{children}</p>;
}
