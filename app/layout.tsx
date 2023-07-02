import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import ModalProvider from "@/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Orbitmart - Admin Dashboard",
  description: "Admin Dashboard for Orbitmart e-commerce store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ModalProvider />
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
