"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import LinkButton from "@/components/ui/link-button";
import { DataTable } from "@/components/ui/data-table";
import { BillboardColumn, columns } from "./columns";

interface BIllboardsContentProps {
  billboards: BillboardColumn[];
}

export default function BillboardsContent({
  billboards,
}: BIllboardsContentProps) {
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Billboards (${billboards.length})`}
          subtitle="Manage billboards for your store"
        />
        <LinkButton href={`/${params.storeId}/billboards/new`}>
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Add Billboard
        </LinkButton>
      </div>
      <Separator className="my-5" />
      <DataTable columns={columns} data={billboards} filterKey="label" />
    </>
  );
}
