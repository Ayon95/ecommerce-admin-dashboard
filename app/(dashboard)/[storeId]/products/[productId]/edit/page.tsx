import React from "react";
import { auth } from "@clerk/nextjs";
import EditProductForm from "../../components/edit-product-form";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function EditProductPage({
  params,
}: {
  params: { storeId: string; productId: string };
}) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const product = await prismadb.product.findUnique({
    where: { id: params.productId },
    include: { images: true },
  });

  if (!product) redirect(`/${params.storeId}/products`);

  const initialProductData = {
    ...product,
    images: product.images.map((image) => ({ url: image.url })),
  };

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
    <EditProductForm
      initialProductData={initialProductData}
      categories={categories}
      sizes={sizes}
      colors={colors}
    />
  );
}
