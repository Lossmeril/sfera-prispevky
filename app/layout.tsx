import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";

const youth = localFont({
  variable: "--youth",
  src: [
    {
      path: "../public/fonts/Youth-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Youth-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Youth-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const youthRounded = localFont({
  variable: "--youth-rounded",
  src: [
    {
      path: "../public/fonts/Youth-Rounded-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const aptos = localFont({
  variable: "--aptos",
  src: [
    {
      path: "../public/fonts/Aptos.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Aptos-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "SFÉRA—generátor příspěvků na sociální sítě",
  description: "Online generátor příspěvků sociálních sítí pro značku SFÉRA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${youth.variable} ${youthRounded.variable} ${aptos.variable} antialiased w-screen overflow-x-hidden`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
