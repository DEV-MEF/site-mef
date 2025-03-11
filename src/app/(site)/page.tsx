"use client";

import AboutSection from "@/components/about-section";
import PartnerLogos from "@/components/LinksArea";
import MultimediaSection from "@/components/MultimediaArea";
import NoticeArea from "@/components/NoticeArea";
import { HeroSection } from "@/components/page/home/hero-section";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <HeroSection />
      <AboutSection />
      <div className="md:px-10 sm:px-10 lg:px:20 xl:px-44 px-5">
        <NoticeArea />
        <MultimediaSection />
        <PartnerLogos />
      </div>
    </main>
  );
}
