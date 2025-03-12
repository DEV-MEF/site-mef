// import { useState } from "react";
// import { Carousel } from "primereact/carousel";
// import ImagesTemplate from "./images-template";

// const images = [
//   {
//     src: "/images/carroussel/background-1.jpg",
//     title: "Primeiro-Ministro representa São Tomé e Príncipe na...",
//     subtitle:
//       "DELEGAÇÃO DO BAD VISITA STP PARA AVALIAR AS PRIORIDADES E AGENDA DO GOVERNO",
//   },
//   {
//     src: "/images/carroussel/background-1.jpg",

//     title: "Outra manchete interessante sobre São Tomé e Príncipe",
//     subtitle: "Mais informações sobre o evento ou notícia destacada",
//   },
//   {
//     src: "/images/carroussel/background-1.jpg",

//     title: "Representação importante em conferência global",
//     subtitle: "Detalhes sobre a participação e impactos para o país",
//   },
// ];

// export const HeroSection = () => {
//   const responsiveOptions = [
//     { breakpoint: "1024px", numVisible: 1, numScroll: 1 },
//     { breakpoint: "768px", numVisible: 1, numScroll: 1 },
//     { breakpoint: "560px", numVisible: 1, numScroll: 1 },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handlePageChange = (event: { page: number }) => {
//     setCurrentIndex(event.page);
//   };

//   return (
//     <div className="relative w-full">
//       <Carousel
//         value={images}
//         itemTemplate={(image) => ImagesTemplate(image)} // Passando itemTemplate corretamente
//         numVisible={1}
//         numScroll={1}
//         responsiveOptions={responsiveOptions}
//         circular
//         autoplayInterval={5000} // Intervalo de autoplay (5 segundos)
//         showIndicators // Habilita os indicadores abaixo do carousel
//         className="custom-carousel"
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// };
// "use client";

// import { useState } from "react";
// import { Carousel } from "primereact/carousel";
// import ImagesTemplate from "./images-template";

// const images = [
//   {
//     src: "/images/carroussel/background-1.jpg",
//     title: "Primeiro-Ministro representa São Tomé e Príncipe na...",
//     subtitle:
//       "DELEGAÇÃO DO BAD VISITA STP PARA AVALIAR AS PRIORIDADES E AGENDA DO GOVERNO",
//   },
//   {
//     src: "/images/carroussel/background-1.jpg",
//     title: "Outra manchete interessante sobre São Tomé e Príncipe",
//     subtitle: "Mais informações sobre o evento ou notícia destacada",
//   },
//   {
//     src: "/images/carroussel/background-1.jpg",
//     title: "Representação importante em conferência global",
//     subtitle: "Detalhes sobre a participação e impactos para o país",
//   },
// ];

// export const HeroSection = () => {
//   const responsiveOptions = [
//     { breakpoint: "1024px", numVisible: 1, numScroll: 1 },
//     { breakpoint: "768px", numVisible: 1, numScroll: 1 },
//     { breakpoint: "560px", numVisible: 1, numScroll: 1 },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handlePageChange = (event) => {
//     setCurrentIndex(event.page || 0);
//   };

//   return (
//     <div className="relative w-full">
//       <Carousel
//         value={images}
//         itemTemplate={(image) => <ImagesTemplate {...image} />} // Corrigido
//         numVisible={1}
//         numScroll={1}
//         responsiveOptions={responsiveOptions}
//         circular
//         autoplayInterval={5000}
//         className="custom-carousel"
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// };

"use client";

import { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import ImagesTemplate from "./images-template";

// Definição de tipos
interface ImageItem {
  src: string;
  title: string;
  subtitle: string;
}

interface PageChangeEvent {
  page: number;
}

interface ResponsiveOption {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

const images: ImageItem[] = [
  {
    src: "/images/carroussel/background-1.jpg",
    title: "Primeiro-Ministro representa São Tomé e Príncipe na...",
    subtitle:
      "DELEGAÇÃO DO BAD VISITA STP PARA AVALIAR AS PRIORIDADES E AGENDA DO GOVERNO",
  },
  {
    src: "/images/carroussel/background-1.jpg",
    title: "Outra manchete interessante sobre São Tomé e Príncipe",
    subtitle: "Mais informações sobre o evento ou notícia destacada",
  },
  {
    src: "/images/carroussel/background-1.jpg",
    title: "Representação importante em conferência global",
    subtitle: "Detalhes sobre a participação e impactos para o país",
  },
];

export const HeroSection = () => {
  const responsiveOptions: ResponsiveOption[] = [
    { breakpoint: "1024px", numVisible: 1, numScroll: 1 },
    { breakpoint: "768px", numVisible: 1, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [autoplayActive, setAutoplayActive] = useState<boolean>(true);

  // Função para lidar com a mudança de página
  const handlePageChange = (event: PageChangeEvent): void => {
    const newIndex = event.page || 0;

    // Verificar se o índice está dentro do limite de imagens
    if (newIndex >= 0 && newIndex < images.length) {
      setCurrentIndex(newIndex);
    } else {
      // Se estiver tentando ir além do limite, reset para o primeiro item
      setCurrentIndex(0);
    }
  };

  // Implementar autoplay personalizado para evitar problemas
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (autoplayActive) {
      interval = setInterval(() => {
        // Avançar para a próxima imagem ou voltar para a primeira
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentIndex, autoplayActive]);

  // Controles personalizados para o carousel
  const customHeader = (
    <div className="flex justify-end gap-2 mb-2">
      <div className="flex gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary_pink w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
      <button
        onClick={() => setAutoplayActive(!autoplayActive)}
        className="text-sm text-gray-600 hover:text-primary_pink"
        aria-label={
          autoplayActive ? "Pausar apresentação" : "Iniciar apresentação"
        }
      >
        {autoplayActive ? "⏸️" : "▶️"}
      </button>
    </div>
  );

  return (
    <div className="relative w-full">
      {customHeader}
      <Carousel
        value={images}
        itemTemplate={(image: ImageItem) => <ImagesTemplate {...image} />}
        numVisible={1}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        circular={true}
        autoplayInterval={0} // Desativamos o autoplay interno do componente
        className="custom-carousel"
        page={currentIndex}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
