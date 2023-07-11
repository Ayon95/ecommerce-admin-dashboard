import React from "react";
import CreateCategoryForm from "../components/create-category-form";
import prismadb from "@/lib/prismadb";

export default async function NewCategoryPage({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
  });
  return <CreateCategoryForm billboards={billboards} />;
}
