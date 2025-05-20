import "primeicons/primeicons.css";
import Multimedia from "./pages/Multimedia";
import Banner from "@/components/pages/banner";

export default function ministerio() {
  return (
    <div className="mb-20">
      <Banner text_1="Publicações" text_2="Vídeos" link_1="/publicacoes" />
      <div className="w-full px-4 max-w-[88rem] container mx-auto py-10 mb-20">
        <Multimedia />
      </div>
    </div>
  );
}
