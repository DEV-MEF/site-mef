"use client";

import AboutSection from "@/components/pages/home/about-section";
// import PartnerLogos from "@/components/LinksArea";
import DocumentsSection from "@/components/pages/home/documents-section";
import NewsSection from "@/components/pages/home/news-section";
import { HeroSection } from "@/components/pages/home/hero-section";
import OnlineServicesSection from "@/components/pages/home/online-services-section";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center pb-28 gap-20">
      <HeroSection />
      <AboutSection />
      <NewsSection />
      <DocumentsSection />
      <OnlineServicesSection />
    </main>
  );
}
