import MainSection from "@/components/pages/contacts/main-section";
import Banner from "@/components/pages/banner";

export default function ministerio() {
  return (
    <main className="w-full">
      <Banner text_1="Contactos" />
      <div className="container mx-auto px-4">
        <MainSection />
      </div>
    </main>
  );
}
