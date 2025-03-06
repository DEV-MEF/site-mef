import { useState } from 'react';
import { Carousel } from 'primereact/carousel';
import Image from 'next/image';
import Carousel1 from '@/assets/background4.jpg';
import Carousel2 from '@/assets/background4.jpg';
import Carousel3 from '@/assets/background4.jpg';

const images = [
  {
    src: Carousel1,
    title: "Primeiro-Ministro representa São Tomé e Príncipe na...",
    subtitle: "DELEGAÇÃO DO BAD VISITA STP PARA AVALIAR AS PRIORIDADES E AGENDA DO GOVERNO"
  },
  {
    src: Carousel2,
    title: "Outra manchete interessante sobre São Tomé e Príncipe",
    subtitle: "Mais informações sobre o evento ou notícia destacada"
  },
  {
    src: Carousel3,
    title: "Representação importante em conferência global",
    subtitle: "Detalhes sobre a participação e impactos para o país"
  }
];

export const HomeCarousel = () => {
  const responsiveOptions = [
    { breakpoint: '1024px', numVisible: 1, numScroll: 1 },
    { breakpoint: '768px', numVisible: 1, numScroll: 1 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const onPageChange = (e: any) => {
    setCurrentIndex(e.page); // Atualiza o índice atual
  };

  // Ajustando o itemTemplate para receber corretamente o item
  const itemTemplate = (imageData: any) => {
    return (
      <div className="relative w-full h-[500px] md:mt-32">
        <Image src={imageData.src} alt={imageData.title} fill className="w-full h-full object-cover"/>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient"></div>
        {/* Text Content */}
        <div className="absolute bottom-14 md:bottom-16 lg:bottom-8 text-white z-10 w-full lg:w-3/4 px-6 md:px-16 lg:px-44 py-8 md:py-16 lg:py-20">
          <h2 className="text-3xl md:text-[4xl] md:text-[37px] lg:text-[44px] font-semibold mb-2 md:mb-4 lg:leading-tight">{imageData.title}</h2>
          <p className="mt-2 mb-8 font-light lg:text-2xl">{imageData.subtitle}</p>
          <button className="bg-transparent text-white border border-white py-2 px-4 rounded hover:bg-primary-blue hover:border-primary-blue transition">Ler Mais</button>
        </div>
      </div>
    );
  };

  return (

    <div className="relative w-full">
      <Carousel
        value={images}
        itemTemplate={(image) => itemTemplate(image)} // Passando itemTemplate corretamente
        numVisible={1}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        circular
        autoplayInterval={5000} // Intervalo de autoplay (5 segundos)
        showIndicators // Habilita os indicadores abaixo do carousel
        className="custom-carousel"
        onPageChange={onPageChange}

      />
    </div>
  );
};

