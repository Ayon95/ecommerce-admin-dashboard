import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/providers/toast-provider";

const inter = Inter({
  subsets: ["latin"],
});

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
        <body className={inter.className}>
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
