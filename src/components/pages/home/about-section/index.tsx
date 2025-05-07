"use client";
import React from "react";
import Image from "next/image";
import { useServicos } from "@/components/contexts/servicos";
import { useRouter } from "next/navigation";

export default function AboutSection() {
  const { ministerio } = useServicos();
  const route = useRouter();
  return (
    <section className="w-full container px-4 max-w-[90rem] flex flex-col md:flex-row items-center justify-center gap-11 md:gap-3 lg:gap-11 md:py-0 mt-14 lg:mt-20">
      {/* Card 1 */}
      <div
        className="flex flex-col items-start p-10 md:p-6 lg:p-10 bg-white shadow-[0_-10px_39px_0_rgba(8,18,109,.1)] rounded-lg w-full md:w-1/3 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
        onClick={() => {
          route.push("/ministerio/sobre-nos");
        }}
      >
        <Image
          src="/images/about-section/about.svg"
          width={250}
          height={250}
          alt="Logo"
          className="w-[10rem] mb-5"
        />
        <h3 className="text-[16px] mb-3 font-medium">Sobre Nós</h3>
        <p className="text-text-light text-[13px] font-light">
          Conheça o {ministerio.name}.
        </p>
      </div>

      {/* Card 2 */}
      <div
        className="flex flex-col items-start p-10 md:p-6 lg:p-10 bg-primary-blue bg-opacity-90 text-white shadow-[0_-10px_39px_0_rgba(8,18,109,.1)] rounded-lg w-full md:w-1/3 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
        onClick={() => {
          route.push("/ministerio/o-que-fazemos");
        }}
      >
        <Image
          width={250}
          height={250}
          src="/images/about-section/what-we-do.svg"
          alt="Logo"
          className="w-[10rem] mb-5"
        />
        <h3 className="text-xl mb-3 text-[16px] font-medium">O que fazemos</h3>
        <p className="text-white text-[13px] font-light">
          Saiba o que fazemos e para onde caminhamos. Que política orienta as
          nossas acções.
        </p>
      </div>

      {/* Card 3 */}
      <div
        className="flex flex-col items-start p-10 md:p-6 lg:p-10 bg-white shadow-[0_-10px_39px_0_rgba(8,18,109,.1)] rounded-lg w-full md:w-1/3 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
        onClick={() => {
          route.push("/ministerio/nossa-equipa");
        }}
      >
        <Image
          width={250}
          height={250}
          src="/images/about-section/services.svg"
          alt="Logo"
          className="w-[10rem] mb-5"
        />
        <h3 className="text-xl mb-3 text-[16px] font-medium">Nossa equipa</h3>
        <p className="text-text-light text-[13px] font-light">
          Conheça a nossa Rede de Serviços Públicos: As Serviços e Empresas
          Públicas. Saiba onde estão e o que fazem.
        </p>
      </div>
    </section>
  );
}
