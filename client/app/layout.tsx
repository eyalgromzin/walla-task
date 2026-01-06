import type { Metadata } from "next";
import "./globals.css";
import { initializeData } from "@/lib/initializeData";

export const metadata: Metadata = {
  title: "Meme Gallery",
  description: "Browse and edit your favorite memes",
};

// Initialize data on app load
initializeData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
