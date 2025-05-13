"use client";
import "primeicons/primeicons.css";
import { useServicos } from "@/components/contexts/servicos";
import ContentRenderer from "@/lib/utils";
import "@/styles/react-markdown-rerender.css";
import Banner from "@/components/pages/banner";
import InstitutionsSidebar from "@/components/pages/institutions/sidebar";

export default function Servicos() {
  const { selectedDirecao } = useServicos();

  return (
    <main className="w-full mb-20">
      <Banner
        text_1="Instituições"
        text_2={selectedDirecao.name}
        link_1="/instituicoes"
      />
      <section className="w-full container max-w-[88rem] mx-auto px-4">
        <div className="w-full mx-auto py-20 flex flex-col lg:flex-row gap-12">
          <div className="w-full rerender">
            {
              <ContentRenderer
                content={selectedDirecao?.content || ""}
                type={"blocks"}
              />
            }
          </div>
          <InstitutionsSidebar />
        </div>
      </section>
    </main>
  );
}
