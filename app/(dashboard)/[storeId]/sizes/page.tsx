import React from "react";
import SizesContent from "./components/sizes-content";
import prismadb from "@/lib/prismadb";
import { SizeColumn } from "./components/columns";
import { getFormattedDate } from "@/lib/utils";

export default async function SizesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const sizes = await prismadb.size.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedSizes: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: getFormattedDate(size.createdAt),
    updatedAt: getFormattedDate(size.updatedAt),
  }));

  return <SizesContent sizes={formattedSizes} />;
}
