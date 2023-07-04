import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import NavLinks from "@/components/nav-links";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function Navbar() {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const stores = await prismadb.store.findMany({
    where: { userId },
  });

  return (
    <header className="flex px-5 py-4 border-b items-center">
      <StoreSwitcher stores={stores} />
      <NavLinks className="ml-6" />
      <div className="ml-auto">
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
