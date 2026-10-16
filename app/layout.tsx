import "@/app/globals.css";
import Header from "@/components/layouts/header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrier Pigeon - The best way to communicate",
  description: "Carrier Pigeon is where people can communicate with each other about things that interest them.",
};

export default function RootLayout({ 
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="pt-14 p-4">{children}</main>
      </body>
    </html>
  );
}
