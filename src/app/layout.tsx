import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trams Africa Ride Booking Dashboard",
  description: "Created by Trae Zeeofor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-trebuchetMs flex flex-col min-h-screen">
        <Header />
        <main className="min-h-[500px] flex-grow  flex items-center justify-center bg-[#F3E5AB]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
