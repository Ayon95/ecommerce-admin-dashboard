"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import LinkButton from "@/components/ui/link-button";
import { DataTable } from "@/components/ui/data-table";
import { ProductColumn, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

interface ProductsContentProps {
  products: ProductColumn[];
}

export default function ProductsContent({ products }: ProductsContentProps) {
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Products (${products.length})`}
          subtitle="Manage products for your store"
          level="h1"
        />
        <LinkButton href={`/${params.storeId}/products/new`}>
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Add Product
        </LinkButton>
      </div>
      <Separator className="my-5" />
      <DataTable columns={columns} data={products} filterKey="name" />
      <Heading title="API" subtitle="API endpoints for products" level="h2" />
      <Separator className="my-3" />
      <ApiList
        storeId={params.storeId}
        entityName="product"
        entitySegmentName="products"
      />
    </>
  );
}
