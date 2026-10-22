import "@/app/globals.css";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import Header from "@/components/layouts/header";
import { SidebarProvider} from "@/components/ui/sidebar";
import { MedievalSharp } from "next/font/google";

const medieval_sharp = MedievalSharp({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-medieval-sharp",
});

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
    <html lang="en" className={medieval_sharp.variable}>
      <body className="antialiased">
        <SidebarProvider>
          <Header />

          <AppSidebar />
          <main className="pt-14 p-4">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
