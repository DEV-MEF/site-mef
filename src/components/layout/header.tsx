"use client";
import Image from "next/image";
import { Menubar } from "primereact/menubar";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Header() {
  const router = useRouter();
  const menuItems = [
    {
      label: "INÍCIO",
      command: () => router.push("/"),
    },
    {
      label: "MINISTÉRIO",
      items: [
        {
          label: "Sobre Nós",
          command: () => router.push("/ministerio/sobre-nos"),
        },
        {
          label: "O que fazemos",
          command: () => router.push("/ministerio/o-que-fazemos"),
        },
        {
          label: "Nossa Equipa",
          command: () => router.push("/ministerio/nossa-equipa"),
        },
        {
          label: "O Ministro",
          command: () => router.push("/ministerio/o-ministro"),
        },
      ],
    },
    {
      label: "DIREÇÕES",
      items: [
        {
          label: "Direcção de Tesouro",
          command: () => router.push("/direcoes"),
        },
        {
          label: "Direcção de Orçamento",
          command: () => router.push("/direcoes"),
        },
        {
          label: "Direcção do Património",
          command: () => router.push("/direcoes"),
        },
        {
          label: "Direcção dos Impostos",
          command: () => router.push("/direcoes"),
        },
        {
          label: "Direcção de Contabilidade",
          command: () => router.push("/direcoes"),
        },
        {
          label: "Direcção de Tecnologia de Informação",
          command: () => router.push("/direcoes"),
        },
        {
          label: "Direcção das Alfândegas",
          command: () => router.push("/direcoes"),
        },
        {
          label: "Direcção do Planeamento",
          command: () => router.push("/direcoes"),
        },
      ],
    },
    {
      label: "PUBLICAÇÕES",
      items: [
        { label: "Notícia", command: () => router.push("/noticias") },
        {
          label: "Comunicado de imprensa",
          command: () => console.log("Menu item 1 clicked"),
        },
        {
          label: "Anúncios",
          command: () => console.log("Menu item 1 clicked"),
        },
        {
          label: "Entrevistas",
          command: () => console.log("Menu item 1 clicked"),
        },
        { label: "Eventos", command: () => console.log("Menu item 1 clicked") },
        { label: "Galeria de imagens", command: () => router.push("/galeria") },
        { label: "Multimédia", command: () => router.push("/multimedia") },
        { label: "Documentos", command: () => router.push("/documentos") },
      ],
    },
    {
      label: "CONTACTE-NOS",
      command: () => router.push("/contactos"),
    },
  ];

  return (
    <header className="w-full fixed shadow-[0_2px_28px_0_rgba(0,0,0,0.06)] z-50 bg-white">
      <div className="relative h-[30px] md:flex hidden items-center justify-end pr-4 text-white text-sm">
        <div className="absolute inset-0 bg-primary-blue clip-diagonal z-10" />
        <div className="absolute inset-y-0 right-0 w-full bg-gray-800" />
        <span className="relative z-10 text-[11px] block md:block">
          Ministério da Economia e Finanças da República Democrática de São Tomé
          e Príncipe
        </span>
      </div>
      <div className="w-full container mx-auto h-24 flex items-center justify-between px-4">
        <Link href="/" className="">
          <Image
            src="/images/ministry-logo.png"
            width={1000}
            height={1000}
            alt="Logo"
            className="w-20 h-20 md:w-24 md:h-24"
          />
        </Link>
        <div className="">
          <Menubar
            model={menuItems}
            className="border-none shadow-none w-10 h-10 md:w-auto bg-primary-blue text-white md:text-current outline-none md:bg-transparent focus:shadow-transparent focus-visible:shadow-none"
          />
        </div>
      </div>
    </header>
  );
}
