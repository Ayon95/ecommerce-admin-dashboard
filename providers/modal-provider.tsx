// This modal provider is required to prevent any hydration error when the modal is used in layout.tsx which is a server component
// It ensures that the modal is rendered only in case of client-side rendering (after ModalProvider is rendered)

"use client";

import React, { useState, useEffect } from "react";

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <>{children}</>;
}
