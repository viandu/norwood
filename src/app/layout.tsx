// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper"; // Import the new wrapper

export const metadata: Metadata = {
  title: "Norwood Empire",
  description: "Premium quality products with authenticity and taste.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground transition-all">
        {/* The LayoutWrapper will now handle the logic */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}