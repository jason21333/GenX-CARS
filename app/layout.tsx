import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GenX Cars",
  description: "Interactive car showcase with pricing"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-slate-100">
        <main className="min-h-screen px-6 py-10 md:px-12 lg:px-20">{children}</main>
      </body>
    </html>
  );
}

