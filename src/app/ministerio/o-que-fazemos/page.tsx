import Banner from "@/components/pages/banner";
import MinistrySidebar from "@/components/pages/ministry/sidebar";
import WhatWeDoSection from "@/components/pages/ministry/what-we-do-section";

export default function WhatWeDo() {
  return (
    <main className="w-full">
      <section className="w-full">
        <Banner text_1="Ministério" text_2="O que fazemos" link_1="/ministerio" />
        <div className="w-full max-w-[88rem] container mx-auto px-4 py-20 flex flex-col lg:flex-row gap-12">
          <WhatWeDoSection />
          <MinistrySidebar />
        </div>
      </section>
    </main>
  );
}
