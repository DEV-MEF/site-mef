"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Banner from "../../banner";
import { AxiosHttpClient } from "@/settings/axios";
import { imageURLServer } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Gallerykeleton } from "@/components/layout/skeleton/image-video-gallery";

interface ImageType {
  name: string;
  documentId: string;
  url: string;
  alternativeText: string;
  formats: {
    large?: ImageType;
    medium?: ImageType;
    small?: ImageType;
  };
}

interface VideoType {
  description: string;
  plataforn: string;
  cover: ImageType;
  link: string;
}

interface ApiResponse {
  documentId: string;
  description: string;
  media: VideoType[];
  cover: ImageType;
}

interface TImage {
  source: string;
  alt: string;
  title: string;
  linkVideo: string;
}

export const VideosGallery = ({ documentId }: { documentId: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [videos, setVideos] = useState<TImage[]>([]);
  const [galleryDescription, setGalleryDescription] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay()]
  );

  const [thumbEmblaRef, thumbEmblaApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
  });

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi || !thumbEmblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      thumbEmblaApi.scrollTo(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, thumbEmblaApi]);

  useEffect(() => {
    try {
      setIsLoading(true);
      AxiosHttpClient.get(
        `/towatches?filters[documentId][$eq]=${documentId}&populate=media.cover&populate=cover`
      ).then(({ data: { data } }) => {
        const collection: ApiResponse = data[0];
        setGalleryDescription(collection.description);

        const mapped = (collection?.media || []).map((video) => {
          const img =
            video.cover?.formats?.medium || video.cover || collection.cover;
          return {
            title: video.description,
            alt: video.description,
            source: imageURLServer + img.url,
            linkVideo: video.link,
          };
        });
        setVideos(mapped);
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao carregar os vídeos. Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  }, [documentId]);

  const getYoutubeId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : "";
  };

  if (error) {
    return (
      <section className="w-full h-screen flex flex-col items-center justify-center text-red-500">
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-12 py-4 bg-primary-blue text-white rounded hover:bg-primary-blue/90 transition-colors"
        >
          Tentar novamente
        </button>
      </section>
    );
  }

  if (!isLoading && videos.length === 0) {
    return (
      <section className="w-full">
        <Banner
          text_1="Publicações"
          text_2="Vídeos"
          text_3={galleryDescription || "...."}
          link_1="/publicacoes"
          link_2="/publicacoes/videos"
        />
        <div className="w-full container max-w-[88rem] mx-auto px-4 py-10">
          <p className="text-sm text-[#3b4158a8] flex items-center my-12 mt-10">
            <i className="pi pi-inbox mr-2"></i> Nenhum resultado encontrado.
          </p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full h-full pb-10">
        <Banner
          text_1="Publicações"
          text_2="Vídeos"
          text_3={galleryDescription || "...."}
          link_1="/publicacoes"
          link_2="/publicacoes/videos"
        />
        <Gallerykeleton />
      </section>
    );
  }
  return (
    <section className="w-full h-full">
      <Banner
        text_1="Publicações"
        text_2="Vídeos"
        text_3={galleryDescription}
        link_1="/publicacoes"
        link_2="/publicacoes/videos"
      />

      <div className="w-full container mx-auto px-4 py-10 mb-28">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-primary-blue mb-10 my-6">
          {galleryDescription}
        </h1>

        <>
          <div
            className="w-full mx-auto md:w-10/12 lg:w-8/12 2xl:w-6/12 relative"
            ref={emblaRef}
          >
            <div className="flex touch-pan-y">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="min-w-full relative aspect-video flex items-center justify-center px-2"
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${getYoutubeId(
                      video.linkVideo
                    )}?autoplay=0`}
                    title={video.title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="rounded-xl shadow"
                  ></iframe>
                </div>
              ))}
            </div>

            {/* Navigation container */}
            <div className="flex justify-end items-center gap-2 mb-5 mt-5">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                className="cursor-pointer text-white bg-primary-blue hover:bg-primary-blue/90 p-2 rounded-full transition"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                className="cursor-pointer text-white bg-primary-blue hover:bg-primary-blue/90 p-2 rounded-full transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Miniaturas */}
          <div
            ref={thumbEmblaRef}
            className="overflow-hidden mt-6 md:w-10/12 lg:w-6/12 mx-auto"
          >
            <div className="flex gap-3">
              {videos.map((video, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={twMerge(
                    "w-28 h-16 rounded-md overflow-hidden border-3 transition duration-200",
                    selectedIndex === i
                      ? "border-primary-blue scale-105 shadow"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <Image
                    src={video.source}
                    alt={video.alt}
                    width={112}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      </div>
    </section>
  );
};
