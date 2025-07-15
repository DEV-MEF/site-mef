"use client";

import "primeicons/primeicons.css";
import AllNews from "@/components/pages/news/all-news";
import Banner from "@/components/pages/banner";
export default function Noticias() {
  return (
    <main className="w-full mb-20">
      <Banner text_1="Início" text_2="Notícias" link_1="/" />
      <section className="w-full container max-w-[88rem] px-4 mx-auto py-16">
        <AllNews />
      </section>
    </main>
  );
}
