import "primeicons/primeicons.css";
import Banner from "@/components/pages/banner";
import AboutUsSection from "@/components/pages/ministry/about-us-section";
import MinistrySidebar from "@/components/pages/ministry/sidebar";

export default function ministerio() {
  return (
    <main className="w-full">
      <section className="w-full">
        <div className="w-full mb-20">
          <Banner text_1="Ministério" text_2="Sobre nós" />
          <div className="container mx-auto px-44 py-20">
            <div className="grid grid-cols-3 gap-12">
              <div className="col-span-2">
                <AboutUsSection />
              </div>
              <MinistrySidebar />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
