import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Carrier Pigeon - The best way to communicate",
  description: "Carrier Pigeon is where people can communicate with each other about things that interest them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
