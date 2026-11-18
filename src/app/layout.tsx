import "@/src/styles/globals.css";
import { AppSidebar } from "@/src/components/layouts/app-sidebar";
import Header from "@/src/components/layouts/header";
import { SidebarProvider} from "@/src/components/ui/sidebar";
import { MedievalSharp } from "next/font/google";
import { Toaster } from "@/src/components/ui/sonner"

const medieval_sharp = MedievalSharp({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-medieval-sharp",
});

import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Carrier Pigeon - The best way to communicate",
  description: "Carrier Pigeon is where people can communicate with each other about things that interest them.",
};

export default function RootLayout({ 
  children,
  authModal
}: Readonly<{
  children: React.ReactNode;
  authModal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={medieval_sharp.variable}>
      <body className="antialiased">
        <SidebarProvider>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          
          {authModal}

          <AppSidebar />
          <main className="pt-14 p-4">
            {children}
          </main>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
