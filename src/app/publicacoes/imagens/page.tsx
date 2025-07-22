import "primeicons/primeicons.css";

import Banner from "@/components/pages/banner";
import GaleriesSection from "@/components/pages/publications/images/images-galleries-section";
import {Metadata} from "next";

export default function Galeria() {
  return (
    <main className="w-full mb-20">
      <Banner text_1="Publicações" text_2="Imagens" link_1="#" />
      <div className="w-full px-4 max-w-[88rem] container mx-auto py-10 mb-20">
        <GaleriesSection />
      </div>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
    const description = `Explora a galeria de imagens do Ministério das Finanças, com registos fotográficos de eventos oficiais, actividades institucionais, cerimónias e outras iniciativas relevantes.`;
    const images = ["/images/logo_governo.png"];
    const title = "Galeria de Imagens - Ministério das Finanças";
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
