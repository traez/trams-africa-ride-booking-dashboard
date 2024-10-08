import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StateProvider from "@/lib/StateProvider";

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
    <StateProvider>
      <html lang="en">
        <body className="antialiased font-trebuchetMs flex flex-col min-h-screen">
          <Header />
          <main className="h-[100px] flex-grow  flex items-center justify-center bg-[#F3E5AB]">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </StateProvider>
  );
}
