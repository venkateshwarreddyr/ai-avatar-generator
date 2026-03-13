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
  title: "AvatarAI - AI Avatar Generator",
  description:
    "Create stunning AI-generated avatars in seconds. Choose from 8 unique styles including realistic, anime, cyberpunk, and more. Powered by OpenAI gpt-image-1.",
  keywords: ["AI avatar", "avatar generator", "AI art", "OpenAI", "gpt-image-1", "profile picture"],
  openGraph: {
    title: "AvatarAI - AI Avatar Generator",
    description: "Create stunning AI-generated avatars in seconds with 8 unique styles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950`}
      >
        {children}
      </body>
    </html>
  );
}
