import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

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
              <div className="flex py-5 px-4 justify-between items-center">
                <div className="logo text-center md:text-3xl text-2xl font-bold text-orange-600 tracking-wide drop-shadow-sm">
                  PizzaHub
                </div>

                <div className="flex gap-2 justify-center items-center">
                  <Button variant={"outline"}>Admin Panel</Button>
                  <Button variant={"outline"}>
                    <ShoppingCart />
                  </Button>
                </div>
              </div>
            </div>
            <div></div>
          </header>
          <main className="w-full min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
