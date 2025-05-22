import "primeicons/primeicons.css";
import AllFolders from "@/components/pages/publications/documents/all-folders";
import Banner from "@/components/pages/banner";

export default async function ministerio() {
  await new Promise((resolve) => setTimeout(resolve, 10000));

  return (
    <main className="w-full min-h-screen">
      <Banner text_1="Publicaçoes" text_2="Documentos" link_1="/publicacoes" />
      <AllFolders />
    </main>
  );
}
