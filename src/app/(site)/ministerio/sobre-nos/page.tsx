import AboutUsSection from "@/components/pages/ministry/about-us-section";
import MinistrySidebar from "@/components/pages/ministry/sidebar";
import Banner from "@/components/pages/banner";

export default function AboutUs() {
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
