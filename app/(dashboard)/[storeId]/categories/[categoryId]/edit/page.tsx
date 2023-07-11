import React from "react";
import { auth } from "@clerk/nextjs";
import EditCategoryForm from "../../components/edit-category-form";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function EditCategoryPage({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const category = await prismadb.category.findUnique({
    where: { id: params.categoryId },
  });

  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
  });

  if (!category) redirect(`/${params.storeId}/categories`);

  return (
    <EditCategoryForm initialCategoryData={category} billboards={billboards} />
  );
}
