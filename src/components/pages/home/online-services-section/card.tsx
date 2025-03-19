"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CardProps = {
  imagePath: string;
  title: string;
  href: string;
};
export default function Card({ imagePath, title, href }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full relative flex flex-col items-center justify-center
        bg-light-gray p-6 rounded-xl
        transition-all duration-300 ease-in-out
        ${isHovered ? "shadow-lg shadow-zinc-300 -translate-y-2" : "shadow-sm"}
        overflow-hidden
      `}
    >
      {/* Imagem principal */}
      <div className="w-full relative z-10 transition-transform duration-300 ease-in-out flex items-center justify-center">
        <Image
          width={150}
          height={150}
          src={imagePath}
          alt={title}
          className={`
            object-contain
            ${isHovered ? "scale-90 opacity-90" : "scale-100 opacity-100"}
            transition-all duration-300
          `}
        />
      </div>

      {/* Overlay com gradiente */}
      <div
        className={`
          w-full absolute inset-0 rounded-xl
          bg-gradient-to-t from-primary-blue/60 md:from-primary-blue/80 to-transparent
          transition-opacity duration-300 ease-in-out
          ${isHovered ? "md:opacity-100" : "md:opacity-0"}
        `}
      />

      {/* Botão de acesso */}
      <div
        className={`
        absolute bottom-0 left-0 right-0
        flex justify-center items-center
        p-4 transition-all duration-300 ease-in-out z-20
        transform ${isHovered ? "md:translate-y-0" : "md:translate-y-full"}
      `}
      >
        <Link
          href={href}
          className={`
            bg-white h-full text-primary-blue font-semibold
            px-4 py-1 rounded-full text-sm
            transition-all hover:bg-primary-blue hover:text-white
            flex items-center justify-center z-30 shadow-md
          `}
        >
          Acessar
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
