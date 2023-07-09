import React from "react";
import BillboardsContent from "./components/billboards-content";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns";
import { getFormattedDate } from "@/lib/utils";

export default async function BillboardsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: getFormattedDate(billboard.createdAt),
      updatedAt: getFormattedDate(billboard.updatedAt),
    })
  );

  return <BillboardsContent billboards={formattedBillboards} />;
}
