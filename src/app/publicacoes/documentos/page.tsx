import "primeicons/primeicons.css";
import AllFolders from "@/components/pages/publications/documents/all-folders";
import Banner from "@/components/pages/banner";
import {Metadata} from "next";

export default async function ministerio() {
  return (
    <main className="w-full min-h-screen">
      <Banner text_1="Publicações" text_2="Documentos" link_1="#" />
      <AllFolders />
    </main>
  );
}


export async function generateMetadata(): Promise<Metadata> {
    const description = `Acede a uma variedade de documentos institucionais do Ministério das Finanças, incluindo relatórios, circulares, planos, orientações técnicas e outros conteúdos oficiais organizados por categorias.`;
    const images = ["/images/logo_governo.png"];
    const title = "Documentos - Ministério das Finanças";
    const type = "website";
    const siteName = "mef.gov.st";
    const url = `https://${siteName}/documentos`;
    return {
        title,
        description,
        openGraph: {
            title,
            images,
            description,
            type,
            url,
            siteName,
        },
    };
}
