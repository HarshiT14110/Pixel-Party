import type { Metadata } from "next";
import "./globals.css";
import { Bangers } from "next/font/google";
import ThemeToggle from "@/components/theme-toggle";
import Script from "next/script";

const graffitiFont = Bangers({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pixel Party",
  description: "Draw fast, guess faster — a neon party game for friends",
  icons: {
    icon: "/pixel-party-logo.png",
    shortcut: "/pixel-party-logo.png",
    apple: "/pixel-party-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${graffitiFont.className} min-h-dvh antialiased text-slate-900 dark:text-slate-50`}
      >
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function () {
            try {
              var stored = localStorage.getItem('theme');
              var theme = stored || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              var root = document.documentElement;
              if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
              root.style.colorScheme = theme;
            } catch (e) {}
          })();
        `}</Script>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
