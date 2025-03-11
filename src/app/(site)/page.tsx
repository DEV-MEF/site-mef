"use client";

import AboutSection from "@/components/page/home/about-section";
import PartnerLogos from "@/components/LinksArea";
import DocumentsSection from "@/components/page/home/documents-section";
import NewsSection from "@/components/page/home/news-section";
import { HeroSection } from "@/components/page/home/hero-section";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <HeroSection />
      <AboutSection />
      <NewsSection />
      <DocumentsSection />
      <div className="md:px-10 sm:px-10 lg:px:20 xl:px-44 px-5">
        <PartnerLogos />
      </div>
    </main>
  );
}
