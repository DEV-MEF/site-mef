import type { Metadata } from "next";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {PdfViewerProvider} from "@/components/contexts/pdf-viewer";
import {ServicosProvider} from "@/components/contexts/servicos";
import {GalleryProvider} from "@/components/contexts/gallery";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Ministério das Finanças",
  description: "Website oficial do Ministério das Finanças de São Tomé",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={poppins.className}>
      <ServicosProvider>
          <GalleryProvider>
              <PdfViewerProvider>
                  <Header />
                  {children}
                  <Footer />
              </PdfViewerProvider>
          </GalleryProvider>
      </ServicosProvider>
      </body>
    </html>
  );
}
