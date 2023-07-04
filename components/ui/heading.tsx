import React from "react";

interface HeadingProps {
  title: string;
  subtitle: string;
}

export default function Heading({ title, subtitle }: HeadingProps) {
  return (
    <div>
      <h1 className=" text-4xl font-bold mb-1">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}
