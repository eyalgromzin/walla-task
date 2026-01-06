import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meme Gallery",
  description: "Browse and edit your favorite memes",
};

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
