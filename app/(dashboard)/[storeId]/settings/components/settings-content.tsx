"use client";

import { Store } from "@prisma/client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import ApiAlert from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin"
import SettingsForm from "./settings-form";

interface SettingsContentProps {
  currentStore: Store;
}

export default function SettingsContent({
  currentStore,
}: SettingsContentProps) {
  const origin = useOrigin();
  return (
    <div>
      <SettingsForm initialStoreData={currentStore} />
      <Separator className="my-5" />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${currentStore.id}`}
        variant="public"
      />
    </div>
  );
}
