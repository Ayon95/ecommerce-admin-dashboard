import React from "react";
import ColorsContent from "./components/colors-content";
import prismadb from "@/lib/prismadb";
import { ColorColumn } from "./components/columns";
import { getFormattedDate } from "@/lib/utils";

export default async function ColorsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await prismadb.color.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedColors: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: getFormattedDate(color.createdAt),
    updatedAt: getFormattedDate(color.updatedAt),
  }));

  return <ColorsContent colors={formattedColors} />;
}
