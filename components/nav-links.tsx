"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function NavLinks({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  const params = useParams();
  const pathname = usePathname();
  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      isActive: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav {...props}>
      <ul className={cn("flex space-x-4 lg:space-x-6", className)}>
        {routes.map((route) => (
          <li key={route.href} className="">
            <Link
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.isActive
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
              href={route.href}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
