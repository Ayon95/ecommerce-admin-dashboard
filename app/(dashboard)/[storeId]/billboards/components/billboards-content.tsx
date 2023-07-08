"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import LinkButton from "@/components/ui/link-button";
import { useParams } from "next/navigation";

export default function BillboardsContent() {
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Billboards (0)"
          subtitle="Manage billboards for your store"
        />
        <LinkButton href={`/${params.storeId}/billboards/new`}>
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Add Billboard
        </LinkButton>
      </div>
      <Separator className="my-5" />
    </>
  );
}
