import AboutUsSection from "@/components/pages/ministry/about-us-section";
import MinistrySidebar from "@/components/pages/ministry/sidebar";
import Banner from "@/components/pages/banner";

export default function AboutUs() {
  return (
    <main className="w-full">
      <div className="w-full mb-20">
        <Banner text_1="Ministério" text_2="Sobre nós" />
        <div className="w-full container mx-auto px-4 py-20 flex flex-col lg:flex-row gap-12">
          <AboutUsSection />
          <MinistrySidebar />
        </div>
      </div>
    </main>
  );
}
