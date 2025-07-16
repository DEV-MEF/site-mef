import "primeicons/primeicons.css";
import Banner from "@/components/pages/banner";
import AllFolders from "@/components/pages/publications/legislations/all-folders";

export default function ministerio() {
  return (
    <main className="mb-20 min-h-screen">
      <Banner text_1="Publicações" text_2="Legislações" link_1="#" />
      <AllFolders />
    </main>
  );
}
