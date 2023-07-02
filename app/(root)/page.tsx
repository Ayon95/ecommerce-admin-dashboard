"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

export default function Home() {
  const { isOpen: storeModalIsOpen, onOpen: storeModalOnOpen } =
    useStoreModal();

  useEffect(() => {
    if (!storeModalIsOpen) {
      storeModalOnOpen();
    }
  }, [storeModalIsOpen, storeModalOnOpen]);

  return (
    <div className="p-4">
      <h1>Admin dashboard</h1>
    </div>
  );
}
