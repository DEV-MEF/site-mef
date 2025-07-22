import "primeicons/primeicons.css";
import Banner from "@/components/pages/banner";
import VideoGalleriesContainer from "@/components/pages/publications/videos/video-galleries-container";
import {Metadata} from "next";

export default function ministerio() {
  return (
    <div className="mb-20">
      <Banner text_1="Publicações" text_2="Vídeos" link_1="#" />
      <div className="w-full max-w-[88rem] container mx-auto py-10 mb-20">
        <VideoGalleriesContainer />
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
    const description = `Assiste a vídeos institucionais, coberturas de eventos, entrevistas e campanhas informativas do Ministério das Finanças, disponíveis nesta galeria organizada.`;
    const images = ["/images/logo_governo.png"];
    const title = "Galeria de Vídeos - Ministério das Finanças";
    const type = "website";
    const url = location.href;
    const siteName = "mef.gov.st";
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
