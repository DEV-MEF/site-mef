import Image from "next/image";
import fundo from "@/assets/fundoPages.png";
import "primeicons/primeicons.css";
import AllNews from "@/components/pages/news/all-news";
import { Suspense } from "react";

export default function Noticias() {
  return (
    <main className="w-full mb-20">
      <div className="relative w-full h-[300px]">
        <Image
          src={fundo}
          alt="Fundo Sobre Nós"
          fill
          className="object-cover"
          quality={100}
        />
        <div
          className="absolute inset-0 bg-[#3A3B7B] opacity-50"
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 flex items-center px-44 py-56">
          <h1 className="text-white text-3xl font-bold">
            Publicações <small className="font-light"> » Notícias</small>
          </h1>
        </div>
      </div>
      <Suspense>
        <div className="w-full container px-4 mx-auto py-16">
          <AllNews />
        </div>
      </Suspense>
    </main>
  );
}
