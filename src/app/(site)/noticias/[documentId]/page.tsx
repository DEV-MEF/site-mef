import Image from "next/image";
import fundo from "@/assets/fundoPages.png";
import "primeicons/primeicons.css";
import SingularNews from "@/components/pages/news/singular-news";

export default function Noticias({ params }: never) {
  return (
    <main className="mb-20">
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

      <div className="container mx-auto px-44 py-16">
        <SingularNews params={params} />
      </div>
    </main>
  );
}
