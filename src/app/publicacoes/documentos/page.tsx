import "primeicons/primeicons.css";
import AllFolders from "@/components/pages/publications/documents/all-folders";
import Banner from "@/components/pages/banner";

export default async function ministerio() {
  return (
    <main className="w-full min-h-screen">
      <Banner text_1="Publicações" text_2="Documentos" link_1="/publicacoes" />
      <AllFolders />
    </main>
  );
}
