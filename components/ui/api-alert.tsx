"use client";

import React from "react";
import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const variantDisplayMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantBadgeMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> =
  {
    public: "secondary",
    admin: "destructive",
  };

export default function ApiAlert({
  title,
  description,
  variant = "public",
}: ApiAlertProps) {
  function onCopy() {
    navigator.clipboard.writeText(description);
    toast.success("Copied to clipboard.");
  }

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <div className="flex items-center gap-x-2">
        <AlertTitle className="mb-0">{title}</AlertTitle>
        <Badge variant={variantBadgeMap[variant]}>
          {variantDisplayMap[variant]}
        </Badge>
      </div>
      <AlertDescription className="mt-2 flex items-center justify-between">
        <code className="relative px-[0.3rem] py-[0.2rem] bg-muted font-semibold">
          {description}
        </code>
        <Button variant="outline" size="sm" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
