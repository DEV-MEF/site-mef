"use client";

import { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import ImagesTemplate from "./images-template";
import qs from "qs";
import { AxiosHttpClient } from "@/settings/axios";
import { imageURLServer } from "@/lib/utils";

// Definição de tipos
type ImageItem = {
  src: string;
  title: string;
  subtitle: string;
  link: string;
};

type Image = {
  title: string;
  news: { [k: string]: string };
  image: { [k: string]: string };
  link: string;
  description: string;
};

interface PageChangeEvent {
  page: number;
}

interface ResponsiveOption {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

export const HeroSection = () => {
  const responsiveOptions: ResponsiveOption[] = [
    { breakpoint: "1024px", numVisible: 1, numScroll: 1 },
    { breakpoint: "768px", numVisible: 1, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [autoplayActive, setAutoplayActive] = useState<boolean>(true);

  const [images, setImages] = useState<ImageItem[]>([]);

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
  }, [currentIndex, autoplayActive, images]);

  useEffect(() => {
    const query = qs.stringify(
      {
        sort: ["createdAt:desc"],
        pagination: {
          start: 0,
          limit: 4,
        },
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

    (async () => {
      AxiosHttpClient.get(`/highlights?${query}`).then(({ data: { data } }) => {
        setImages(
          (data as Image[]).map((image) => {
            const noticias = image?.news?.documentId ? "noticias/" : "";
            return {
              title: image.title,
              src: imageURLServer + image.image.url,
              subtitle: image.description,
              link: `${noticias}${
                image?.news?.documentId || image?.link || "#"
              }`,
            };
          })
        );
      });
    })();
  }, []);

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
        autoplayInterval={7000}
        className="custom-carousel"
        page={currentIndex}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
