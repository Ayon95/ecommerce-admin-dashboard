import React from "react";
import { auth } from "@clerk/nextjs";
import EditColorForm from "../../components/edit-color-form";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function EditColorPage({
  params,
}: {
  params: { storeId: string; colorId: string };
}) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const color = await prismadb.color.findUnique({
    where: { id: params.colorId },
  });

  if (!color) redirect(`/${params.storeId}/colors`);

  return <EditColorForm initialColorData={color} />;
}
