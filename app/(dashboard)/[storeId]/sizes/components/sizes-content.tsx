"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import LinkButton from "@/components/ui/link-button";
import { DataTable } from "@/components/ui/data-table";
import { SizeColumn, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

interface SizesContentProps {
  sizes: SizeColumn[];
}

export default function SizesContent({ sizes }: SizesContentProps) {
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Sizes (${sizes.length})`}
          subtitle="Manage size options for your store products"
          level="h1"
        />
        <LinkButton href={`/${params.storeId}/sizes/new`}>
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Add Size
        </LinkButton>
      </div>
      <Separator className="my-5" />
      <DataTable columns={columns} data={sizes} filterKey="name" />
      <Heading title="API" subtitle="API endpoints for sizes" level="h2" />
      <Separator className="my-3" />
      <ApiList
        storeId={params.storeId}
        entityName="size"
        entitySegmentName="sizes"
      />
    </>
  );
}
