"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import LinkButton from "@/components/ui/link-button";
import { DataTable } from "@/components/ui/data-table";
import { ColorColumn, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

interface ColorsContentProps {
  colors: ColorColumn[];
}

export default function ColorsContent({ colors }: ColorsContentProps) {
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Colors (${colors.length})`}
          subtitle="Manage color options for your store products"
          level="h1"
        />
        <LinkButton href={`/${params.storeId}/colors/new`}>
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Add Color
        </LinkButton>
      </div>
      <Separator className="my-5" />
      <DataTable columns={columns} data={colors} filterKey="name" />
      <Heading title="API" subtitle="API endpoints for colors" level="h2" />
      <Separator className="my-3" />
      <ApiList
        storeId={params.storeId}
        entityName="color"
        entitySegmentName="colors"
      />
    </>
  );
}
