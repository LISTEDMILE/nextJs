import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="p-1 border-b-2 text-center text-2xl mb-6">TITLE</div>
        
        {children}
        <div className="p-6 bg-gray-900 text-center text-amber-50 text-3xl mt-6 ">
          Notes
          <p className="mt-3 text-xl">
            if we want to use useStates or other things which only works on client side than we have to tell next js explicitely we can write "use client";  at the top of our file....

            <br />
            <br />
            but with this seo will again not be good for that we can do what ki hm jo component isno use kar rha h usko alag component bnake wha useclient karlo....
          </p>
        </div>
        
      </body>
    </html>
  );
}
