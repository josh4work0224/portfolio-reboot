import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import GlobalTransition from "./component/PageTransition";
import NavbarWOSwitch from "./component/navbarWOSwitch";
import Footer from "./component/footer";

// Inter 字體 - 用於內文
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// 使用 Variable 字體（一個檔案包含所有字重）
const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2", // 只需要這一個檔案
  variable: "--font-satoshi",
  display: "swap",
  weight: "300,900", // 支援的字重範圍
});

export const metadata: Metadata = {
  title: "Sheng-Chi Huang - Web Designer & Creative Developer",
  description:
    "Sheng-Chi Huang's personal portfolio website showcases design and development projects, with a focus on user experience and creative solutions.",
  keywords: [
    "Designer",
    "Developer",
    "UI/UX",
    "Front-end develop",
    "Portfolio",
    "Sheng-Chi Huang",
  ],
  authors: [{ name: "Sheng-Chi Huang" }],
  creator: "Sheng-Chi Huang",
  publisher: "Sheng-Chi Huang",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://shengchihuang.com"),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Sheng-Chi Huang - Web Designer & Creative Developer",
    description:
      "Sheng-Chi Huang's personal portfolio website showcases design and development projects, with a focus on user experience and creative solutions.",
    url: "https://shengchiuang.com",
    siteName: "Sheng-Chi Huang Portfolio",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Sheng-Chi Huang - Web Designer & Creative Developer",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheng-Chi Huang - Web Designer & Creative Developer",
    description:
      "Sheng-Chi Huang's personal portfolio website showcases design and development projects, with a focus on user experience and creative solutions.",
    images: ["/og-image.svg"],
    creator: "@joshhuang",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${satoshi.variable} antialiased theme-dark`}
      >
        <NavbarWOSwitch />
        <GlobalTransition>{children}</GlobalTransition>
        <Footer />
      </body>
    </html>
  );
}
