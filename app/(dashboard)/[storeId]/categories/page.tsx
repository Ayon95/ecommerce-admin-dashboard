import React from "react";
import CategoriesContent from "./components/categories-content";
import prismadb from "@/lib/prismadb";
import { CategoryColumn } from "./components/columns";
import { getFormattedDate } from "@/lib/utils";

export default async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
    include: { billboard: true },
    orderBy: { createdAt: "desc" },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: getFormattedDate(category.createdAt),
    updatedAt: getFormattedDate(category.updatedAt),
  }));

  return <CategoriesContent categories={formattedCategories} />;
}
