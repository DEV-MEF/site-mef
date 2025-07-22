import "primeicons/primeicons.css";
import AllNews from "@/components/pages/news/all-news";
import Banner from "@/components/pages/banner";
import {Metadata} from "next";
export default function Noticias() {
  return (
    <main className="w-full mb-20">
      <Banner text_1="Publicações" text_2="Notícias" link_1="#" />
        <section className="w-full container max-w-[88rem] px-4 mx-auto py-16">
            <AllNews/>
        </section>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
    const description = `Fica a par das últimas notícias, comunicados e actualizações sobre as actividades, decisões e eventos do Ministério das Finanças. Informação oficial e actualizada ao teu dispor.`;
    const images = ["/images/logo_governo.png"];
    const title = "Notícias - Ministério das Finanças";
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
