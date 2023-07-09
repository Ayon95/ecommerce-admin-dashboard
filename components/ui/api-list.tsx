"use client";

import React from "react";
import ApiAlert from "./api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface ApiListProps {
  storeId: string;
  entityName: string;
  entitySegmentName: string;
}

export default function ApiList({
  storeId,
  entityName,
  entitySegmentName,
}: ApiListProps) {
  const origin = useOrigin();
  const baseUrl = `${origin}/api/${storeId}/${entitySegmentName}`;
  return (
    <div className="space-y-2">
      <ApiAlert title="GET" description={baseUrl} variant="public" />
      <ApiAlert
        title="GET (Individual)"
        description={`${baseUrl}/<${entityName}Id>`}
        variant="public"
      />
      <ApiAlert title="POST" description={baseUrl} variant="admin" />
      <ApiAlert
        title="PATCH"
        description={`${baseUrl}/<${entityName}Id>`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${baseUrl}/<${entityName}Id>`}
        variant="admin"
      />
    </div>
  );
}
