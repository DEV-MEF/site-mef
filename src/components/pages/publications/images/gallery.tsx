"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { AxiosHttpClient } from "@/settings/axios";
import { imageURLServer } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Banner from "../../banner";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type ImageType = {
  name: string;
  documentId: string;
  url: string;
  alternativeText: string;
  formats: { [k in "large" | "medium" | "small"]: ImageType };
};

type TImage = { source: string; alt: string; title: string };
type TImageApi = {
  documentId: string;
  description: string;
  medias: ImageType[];
  cover: ImageType;
};

const ImagesGallery = ({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) => {
  const [images, setImages] = useState<TImage[]>([]);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
    return () => {
      emblaMainApi.off("select", onSelect);
    };
  }, [emblaMainApi, onSelect]);

  useEffect(() => {
    (async () => {
      const { documentId } = await params;
      const response = await AxiosHttpClient.get(
        `/galleries?filters[documentId][$eq]=${documentId}&populate=*`
      );
      const collection: TImageApi = response.data.data[0];

      const mapped = (collection?.medias || []).map((img) => ({
        title: img.alternativeText || img.name,
        alt: img.alternativeText || img.name,
        source: imageURLServer + (img?.formats?.medium || img).url,
      }));

      setImages(mapped);
    })();
  }, [params]);

  const scrollPrev = useCallback(() => {
    emblaMainApi?.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    emblaMainApi?.scrollNext();
  }, [emblaMainApi]);

  return (
    <section className="w-full">
      <Banner
        text_1="Publicações"
        text_2="Imagens"
        text_3="Galeria"
        link_1="/publicacoes"
        link_2="/publicacoes/imagens"
      />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-primary mb-10 text-primary-blue">
          Galeria de Imagens
        </h1>

        {images.length > 0 ? (
          <>
            <div className="relative">
              <div
                className="embla overflow-hidden rounded-xl bg-black"
                ref={emblaMainRef}
              >
                <div className="embla__container flex">
                  {images.map((image, index) => (
                    <div
                      className="embla__slide flex-[0_0_100%] min-w-0 relative aspect-[16/9]"
                      key={index}
                    >
                      <Image
                        src={image.source}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 1024px"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={scrollPrev}
                className="hidden lg:block cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/70 text-primary-blue p-2 rounded-full backdrop-blur transition"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={scrollNext}
                className="hidden lg:block cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/70 text-primary-blue p-2 rounded-full backdrop-blur transition"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="embla-thumbs mt-10">
                <div
                  className="embla-thumbs__viewport overflow-hidden"
                  ref={emblaThumbsRef}
                >
                  <div className="embla-thumbs__container flex gap-3 justify-center">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => onThumbClick(index)}
                        className={`embla-thumbs__slide w-20 h-16 rounded-md overflow-hidden border-2 transition duration-200 ${
                          index === selectedIndex
                            ? "border-primary-blue/80 scale-105 shadow"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        type="button"
                      >
                        <Image
                          src={image.source}
                          alt={image.alt}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            Nenhuma imagem encontrada.
          </p>
        )}
      </div>

      <style jsx global>{`
        .embla-thumbs__slide {
          position: relative;
        }
        .embla-thumbs__slide button {
          touch-action: manipulation;
          display: block;
          text-decoration: none;
        }
      `}</style>
    </section>
  );
};

export default ImagesGallery;