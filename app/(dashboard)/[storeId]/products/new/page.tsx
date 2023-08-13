import React from "react";
import CreateProductForm from "../components/create-product-form";
import prismadb from "@/lib/prismadb";

export default async function NewProductPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
  });

  const sizes = await prismadb.size.findMany({
    where: { storeId: params.storeId },
  });

  const colors = await prismadb.color.findMany({
    where: { storeId: params.storeId },
  });
  return (
    <>
      <CreateProductForm
        categories={categories}
        sizes={sizes}
        colors={colors}
      />
    </>
  );
}
