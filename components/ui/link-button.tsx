import { ButtonProps, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

import React from "react";

interface LinkButtonProps {
  href: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  children: React.ReactNode;
}

export default function LinkButton({
  href,
  variant = "default",
  size = "default",
  children,
}: LinkButtonProps) {
  return (
    <Link href={href} className={buttonVariants({ variant, size })}>
      {children}
    </Link>
  );
}
