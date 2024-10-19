import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Header from "../components/header";
import Providers from "./providers";
// import Addtionals from "../components/additionals";

export const metadata: Metadata = {
  title: "Just2Min",
  description: "Helps you build habits with the 2-minute strategy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="w-screen min-h-screen bg-blue-50 text-black overflow-hidden select-none">
        <Providers>
          <Header />
          {/* <Addtionals /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
