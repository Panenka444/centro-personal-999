import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Centro Personal",
  description: "Panel de control personal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${plexMono.variable} font-sans`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 px-6 py-8 md:px-10 md:py-10 max-w-5xl mx-auto md:mx-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
