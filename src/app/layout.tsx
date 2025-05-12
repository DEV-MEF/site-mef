import type { Metadata } from "next";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { PdfViewerProvider } from "@/components/contexts/pdf-viewer";
import { ServicosProvider } from "@/components/contexts/servicos";
import { Suspense } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Ministério do Planeamento e Finanças",
    template: "Ministério do Planeamento e Finanças | %s",
  },
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["Ministério", "Planeamento", "Finanças", "São Tomé", "Príncipe"],
  description:
    "Website oficial do Ministério de Planeamento e Finanças de São Tomé e Príncipe",
  metadataBase: new URL("https://site.mf.gov.st"),
  robots: "index, follow",
  openGraph: {
    title: "Ministério de Planeamento e Finanças de São Tomé e Príncipe",
    description:
      "Website oficial do Ministério de Planeamento e Finanças de São Tomé e Príncipe",
    url: "https://site.mf.gov.st",
    siteName: "Ministério de Planeamento e Finanças de São Tomé e Príncipe",
    images: [
      {
        url: `/images/opengraph.png`,
        width: 1200,
        height: 630,
        alt: "Ministério de Planeamento e Finanças de São Tomé e Príncipe",
      },
    ],
    locale: "pt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ministério de Planeamento e Finanças de São Tomé e Príncipe",
    description:
      "Website oficial do Ministério de Planeamento e Finanças de São Tomé e Príncipe",
    images: ["https://site.mf.gov.st/images/opengraph.png"],
  },
  other: {
    "article:publisher": "https://www.facebook.com/?????????????",
    "article:tag": [
      "Ministério",
      "Planeamento",
      "Finanças",
      "São Tomé",
      "Príncipe",
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${poppins.className}`}>
        <Suspense fallback={null}>
          <ServicosProvider>
            <PdfViewerProvider>
              <Header />
              {children}
              <Footer />
            </PdfViewerProvider>
          </ServicosProvider>
        </Suspense>
      </body>
    </html>
  );
}
