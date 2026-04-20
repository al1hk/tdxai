import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TDX | Intelligent Digital Systems & AI Solutions",
  description: "TDX is a premier digital agency specializing in intelligent digital systems, AI-driven services, web development, blockchain, and business automation.",
  keywords: ["AI solutions", "digital systems", "web development", "blockchain", "business automation", "TDX AI", "agency"],
  openGraph: {
    title: "TDX | Intelligent Digital Systems",
    description: "Architecting intelligent digital systems. We provide AI services, blockchain development, and advanced web solutions.",
    url: "https://tdx.ai",
    siteName: "TDX",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TDX | Intelligent Digital Systems",
    description: "Architecting intelligent digital systems. We provide AI services, blockchain development, and advanced web solutions.",
  },
  metadataBase: new URL("https://tdx.ai"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light'}else{document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark'}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
