import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Header from "@/components/header";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PizzaHub",
  description: "An Pizza Delivery App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <header className=" border-b-2 border-dotted bg-zinc-950/90 z-50 fixed w-full top-0">
            <div className="container mx-auto">
             <Header/>
            </div>
            <div></div>
          </header>
          <main className="w-full min-h-screen">{children}</main>
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  );
}
