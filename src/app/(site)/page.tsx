"use client"

import AboutArea from "@/components/AboutArea";
import PartnerLogos from "@/components/LinksArea";
import MultimediaSection from "@/components/MultimediaArea";
import NoticeArea from "@/components/NoticeArea";
import { HeroSection } from "@/components/page/home/hero-section";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection/>
      <div className="md:px-10 sm:px-10 lg:px:20 xl:px-44 px-5">
        <AboutArea/>
        <NoticeArea/>
        <MultimediaSection/>
        <PartnerLogos/>
      </div>
    </main>
    
  );
}
