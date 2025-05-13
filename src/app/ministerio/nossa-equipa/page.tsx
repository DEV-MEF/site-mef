import Banner from "@/components/pages/banner";
import OurteamSection from "@/components/pages/ministry/out-team-section";
import MinistrySidebar from "@/components/pages/ministry/sidebar";

export default function OurTeam() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-between">
      <Banner text_1="Ministério" text_2="Nossa equipa" link_1="/ministerio" />
      <section className="w-full max-w-[88rem] h-full container px-4">
        <div className="w-full container mx-auto py-20 flex flex-col lg:flex-row gap-12">
          <OurteamSection />
          <MinistrySidebar />
        </div>
        {/* <div className=" py-20">
          <div className="grid grid-cols-3 gap-12">
            <div className="col-span-2">
              <OurteamSection />
            </div>
            <MinistrySidebar />
          </div>
        </div> */}
      </section>
    </main>
  );
}
