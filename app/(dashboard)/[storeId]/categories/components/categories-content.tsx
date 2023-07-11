"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import LinkButton from "@/components/ui/link-button";
import { DataTable } from "@/components/ui/data-table";
import { CategoryColumn, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

interface CategoriesContentProps {
  categories: CategoryColumn[];
}

export default function CategoriesContent({
  categories,
}: CategoriesContentProps) {
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Categories (${categories.length})`}
          subtitle="Manage categories for your store"
          level="h1"
        />
        <LinkButton href={`/${params.storeId}/categories/new`}>
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Add Category
        </LinkButton>
      </div>
      <Separator className="my-5" />
      <DataTable columns={columns} data={categories} filterKey="name" />
      <Heading title="API" subtitle="API endpoints for categories" level="h2" />
      <Separator className="my-3" />
      <ApiList
        storeId={params.storeId}
        entityName="category"
        entitySegmentName="categories"
      />
    </>
  );
}
