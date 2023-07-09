import React from "react";

interface HeadingProps {
  title: string;
  subtitle: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function Heading({ title, subtitle, level }: HeadingProps) {
  let titleComponent;

  switch (level) {
    case "h1":
      titleComponent = <h1 className=" text-4xl font-bold mb-1">{title}</h1>;
      break;
    case "h2":
      titleComponent = <h2 className=" text-3xl font-bold mb-1">{title}</h2>;
      break;
    case "h3":
      titleComponent = <h3 className=" text-2xl font-bold mb-1">{title}</h3>;
      break;
    case "h4":
      titleComponent = <h4 className=" text-xl font-bold mb-1">{title}</h4>;
      break;
    case "h5":
      titleComponent = <h5 className=" text-lg font-bold mb-1">{title}</h5>;
      break;
    case "h6":
      titleComponent = <h6 className="font-bold mb-1">{title}</h6>;
      break;
  }

  return (
    <div>
      {titleComponent}
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}
