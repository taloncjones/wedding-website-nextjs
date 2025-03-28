import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "@/app/globals.css";

import { ClientSessionProvider } from "@/context/session-context";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";
import PageTransitionWrapper from "@/components/page-trasition-wrapper";
import { getServerSession } from "@/lib/session";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Talon & Franchesca's Wedding",
  description: "Join us in celebrating our special day!",
  openGraph: {
    title: "Talon & Franchesca's Wedding",
    description: "Join us in celebrating our special day!",
    url: "https://your-wedding-website.com",
    siteName: "Talon & Franchesca's Wedding",
    images: [
      {
        url: "https://your-wedding-website.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Talon & Franchesca's Wedding",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${playfair.variable} bg-background text-foreground font-serif antialiased flex flex-col min-h-screen`}
      >
        <ClientSessionProvider initialSession={session}>
          <Navbar />
          <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-8">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
