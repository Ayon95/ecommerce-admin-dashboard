import React from "react";

interface ColorDisplayProps {
  color: string;
}

export default function ColorDisplay({ color }: ColorDisplayProps) {
  return (
    <div className="flex items-center space-x-2">
      <span
        className="h-5 w-5 rounded border border-slate-700 dark:border-slate-50"
        style={{ backgroundColor: color }}
      ></span>
      <span>{color}</span>
    </div>
  );
}
