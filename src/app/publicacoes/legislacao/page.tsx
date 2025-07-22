import "primeicons/primeicons.css";
import Banner from "@/components/pages/banner";
import AllFolders from "@/components/pages/publications/legislations/all-folders";
import {Metadata} from "next";

export default function ministerio() {
  return (
    <main className="mb-20 min-h-screen">
      <Banner text_1="Publicações" text_2="Legislação" link_1="#" />
      <AllFolders />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
    const description = `Nesta página, encontrarás uma coleção organizada de legislações relevantes ao funcionamento e à regulamentação do Ministério das Finanças. Aceda a documentos legais, decretos, portarias e outros instrumentos normativos, agrupados por categorias temáticas para facilitar a consulta.`;
    const images = ["/images/logo_governo.png"];
    const title = "Legislação - Ministério das Finanças";
    const type = "website";
    return {
        title,
        description,
        openGraph: {
            title,
            images,
            description,
            type,
        },
    };
}
