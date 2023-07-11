import React from "react";
import { auth } from "@clerk/nextjs";
import EditSizeForm from "../../components/edit-size-form";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function EditSizePage({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const size = await prismadb.size.findUnique({
    where: { id: params.sizeId },
  });

  if (!size) redirect(`/${params.storeId}/sizes`);

  return <EditSizeForm initialSizeData={size} />;
}
