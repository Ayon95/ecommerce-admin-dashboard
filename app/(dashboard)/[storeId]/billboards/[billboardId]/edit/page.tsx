import React from "react";
import { auth } from "@clerk/nextjs";
import EditBillboardForm from "../../components/edit-billboard-form";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function EditBillboardPage({
  params,
}: {
  params: { storeId: string; billboardId: string };
}) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const billboard = await prismadb.billboard.findUnique({
    where: { id: params.billboardId },
  });

  if (!billboard) redirect(`/${params.storeId}/billboards`);

  return <EditBillboardForm initialBillboardData={billboard} />;
}
