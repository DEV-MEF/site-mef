import type { Metadata } from "next";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
});

export const metadata: Metadata = {
  title: "Ministério da Economia e Finanças",
  description:
    "Website oficial do Ministério da Economia e Finanças de São Tomé e Príncipe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
