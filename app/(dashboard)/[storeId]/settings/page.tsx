import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import SettingsForm from "./components/settings-form";

interface SettingsPageProps {
  params: { storeId: string };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const currentStore = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  // If the id in the URL is not correct for some reason, then the user will be redirected to the home page
  if (!currentStore) redirect("/");

  return (
    <div>
      <SettingsForm initialStoreData={currentStore} />
    </div>
  );
}
