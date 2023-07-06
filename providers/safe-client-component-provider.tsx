// This provider ensures that no hydration error occurs when rendering a client component
// The client component will only be rendered when it is safe to do so, i.e. when the provider has been mounted

"use client";

import React, { useState, useEffect } from "react";

export default function SafeClientComponentProvider({
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
