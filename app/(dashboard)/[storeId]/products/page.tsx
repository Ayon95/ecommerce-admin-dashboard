import React from "react";
import ProductsContent from "./components/products-content";
import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./components/columns";
import { getFormattedDate, getFormattedPrice } from "@/lib/utils";

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await prismadb.product.findMany({
    where: { storeId: params.storeId },
    include: {
      category: true,
      color: true,
      size: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: getFormattedPrice(product.price.toNumber()),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: getFormattedDate(product.createdAt),
    updatedAt: getFormattedDate(product.updatedAt),
  }));

  return <ProductsContent products={formattedProducts} />;
}
