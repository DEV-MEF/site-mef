import "primeicons/primeicons.css";

import Banner from "@/components/pages/banner";
import GaleriesSection from "@/components/pages/publications/images/images-galleries-section";

export default function Galeria() {
  return (
    <main className="w-full mb-20">
      <Banner text_1="Início" text_2="Imagens" link_1="/" />
      <div className="w-full px-4 max-w-[88rem] container mx-auto py-10 mb-20">
        <GaleriesSection />
      </div>
    </main>
  );
}
