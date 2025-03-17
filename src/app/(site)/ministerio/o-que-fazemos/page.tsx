import Banner from "@/components/pages/banner";
import MinistrySidebar from "@/components/pages/ministry/sidebar";
import WhatWeDoSection from "@/components/pages/ministry/what-we-do-section";

export default function WhatWeDo() {
  return (
    <main className="w-full">
      <section className="w-full">
        <div className="mb-20">
          <Banner text_1="Ministério" text_2="O que fazemos" />

          <div className="container mx-auto px-44 py-20">
            <div className="grid grid-cols-3 gap-12">
              <div className="col-span-2">
                <WhatWeDoSection />
              </div>
              <MinistrySidebar />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
