"use client"

import AboutArea from "@/components/AboutArea";
import PartnerLogos from "@/components/LinksArea";
import MultimediaSection from "@/components/MultimediaArea";
import NoticeArea from "@/components/NoticeArea";
import { HomeCarousel } from "@/components/SectionHero";

export default function Home() {
  return (
    <div>
      <HomeCarousel/>
      <div className="md:px-10 sm:px-10 lg:px:20 xl:px-44 px-5">
        <AboutArea/>
        <NoticeArea/>
        <MultimediaSection/>
        <PartnerLogos/>
      </div>
    </div>
    
  );
}
