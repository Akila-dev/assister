import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

// import { headers } from "next/headers"; // added
// import { ContextProvider, SolanaWrapper,SolanaContext } from "@/components";
import { SolanaWrapper } from "@/components";
// import { getCookies } from "@/actions/getCookies";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = localFont({
  src: "./fonts/Inter.ttf",
  variable: "--font-inter",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Assister for Lyra | The Cosmic Guardian",
  description:
    "Lyra is the cosmic guardian, overseeing a growing prize pool and testing the ingenuity and wits of humanity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const headersList = await headers();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const cookies = headersList.get("cookie");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${inter.variable} ${geistMono.variable} antialiased bg-dark bg-fixed bg-center bg-cover oveflow-hidden main`}
      >
        {/* <ContextProvider cookies={cookies}>{children}</ContextProvider> */}
        <SolanaWrapper>{children}</SolanaWrapper>
        {/* {children} */}
        <Toaster
          toastOptions={{
            className: "toast-custom",
          }}
        />
      </body>
    </html>
  );
}
