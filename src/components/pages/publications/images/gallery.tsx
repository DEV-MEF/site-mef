// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import Image from "next/image";
// import { AxiosHttpClient } from "@/settings/axios";
// import { imageURLServer } from "@/lib/utils";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Banner from "../../banner";
// import useEmblaCarousel from "embla-carousel-react";

// type ImageType = {
//   name: string;
//   documentId: string;
//   url: string;
//   alternativeText: string;
//   formats: { [k in "large" | "medium" | "small"]: ImageType };
// };

// type TImage = { source: string; alt: string; title: string };
// type TImageApi = {
//   documentId: string;
//   description: string;
//   medias: ImageType[];
//   cover: ImageType;
// };

// const ImagesGallery = ({
//   params,
// }: {
//   params: Promise<{ documentId: string }>;
// }) => {
//   const [images, setImages] = useState<TImage[]>([]);
//   const [galleryDescription, setGalleryDescription] = useState<string>("");
//   const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
//   const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
//     containScroll: "keepSnaps",
//     dragFree: true,
//     axis: "x",
//     align: "start",
//   });
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const onThumbClick = useCallback(
//     (index: number) => {
//       if (!emblaMainApi || !emblaThumbsApi) return;
//       emblaMainApi.scrollTo(index);
//     },
//     [emblaMainApi, emblaThumbsApi]
//   );

//   const onSelect = useCallback(() => {
//     if (!emblaMainApi || !emblaThumbsApi) return;
//     setSelectedIndex(emblaMainApi.selectedScrollSnap());
//     emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
//   }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

//   useEffect(() => {
//     if (!emblaMainApi) return;
//     onSelect();
//     emblaMainApi.on("select", onSelect);
//     emblaMainApi.on("reInit", onSelect);
//     return () => {
//       emblaMainApi.off("select", onSelect);
//     };
//   }, [emblaMainApi, onSelect]);

//   useEffect(() => {
//     (async () => {
//       const { documentId } = await params;
//       const response = await AxiosHttpClient.get(
//         `/galleries?filters[documentId][$eq]=${documentId}&populate=*`
//       );
//       const collection: TImageApi = response.data.data[0];

//       const mapped = (collection?.medias || []).map((img) => ({
//         title: img.alternativeText || img.name,
//         alt: img.alternativeText || img.name,
//         source: imageURLServer + (img?.formats?.medium || img).url,
//       }));

//       setImages(mapped);
//       setGalleryDescription(collection.description);
//     })();
//   }, [params]);

//   const scrollPrev = useCallback(() => {
//     emblaMainApi?.scrollPrev();
//   }, [emblaMainApi]);

//   const scrollNext = useCallback(() => {
//     emblaMainApi?.scrollNext();
//   }, [emblaMainApi]);

//   return (
//     <section className="w-full">
//       <Banner
//         text_1="Publicações"
//         text_2="Imagens"
//         text_3="Galeria"
//         link_1="/publicacoes"
//         link_2="/publicacoes/imagens"
//       />

//       <div className="max-w-6xl mx-auto px-4 py-14">
//         <h1 className="text-2xl md:text-3xl font-bold text-center text-primary mb-10 text-primary-blue">
//           {galleryDescription}
//         </h1>

//         {images.length > 0 ? (
//           <>
//             <div className="relative">
//               <div
//                 className="embla overflow-hidden rounded-xl"
//                 ref={emblaMainRef}
//               >
//                 <div className="embla__container flex">
//                   {images.map((image, index) => (
//                     <div
//                       className="embla__slide flex-[0_0_100%] min-w-0 relative aspect-[16/9]"
//                       key={index}
//                     >
//                       <Image
//                         src={image.source}
//                         alt={image.alt}
//                         fill
//                         className="w-auto h-auto object-contain"
//                         priority={index === 0}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Navigation buttons */}
//               <button
//                 onClick={scrollPrev}
//                 className="hidden lg:block cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-primary-blue hover:bg-primary-blue/90 p-2 rounded-full backdrop-blur transition"
//               >
//                 <ChevronLeft size={28} />
//               </button>
//               <button
//                 onClick={scrollNext}
//                 className="hidden lg:block cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-primary-blue hover:bg-primary-blue/90 p-2 rounded-full backdrop-blur transition"
//               >
//                 <ChevronRight size={28} />
//               </button>
//             </div>

//             {/* Thumbnails */}
//             {images.length > 1 && (
//               <div className="embla-thumbs mt-10 px-4">
//                 <div
//                   className="embla-thumbs__viewport overflow-hidden"
//                   ref={emblaThumbsRef}
//                 >
//                   <div className="embla-thumbs__container flex gap-3 w-auto">
//                     {images.map((image, index) => (
//                       <button
//                         key={index}
//                         onClick={() => onThumbClick(index)}
//                         className={`embla-thumbs__slide flex-[0_0_80px] min-w-0 h-16 rounded-md border-2 transition duration-200 ${
//                           index === selectedIndex
//                             ? "border-primary-blue/80 scale-105 shadow"
//                             : "border-transparent opacity-70 hover:opacity-100"
//                         }`}
//                         type="button"
//                       >
//                         <div className="relative w-full h-full">
//                           <Image
//                             src={image.source}
//                             alt={image.alt}
//                             fill
//                             className="object-cover"
//                             sizes="80px"
//                           />
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <p className="text-center text-gray-500 text-lg">
//             Nenhuma imagem encontrada.
//           </p>
//         )}
//       </div>

//       <style jsx global>{`
//         .embla-thumbs__viewport {
//           margin: 0 -16px; /* Compensa o padding do container pai */
//         }
//         .embla-thumbs__container {
//           padding: 0 16px; /* Adiciona padding para não cortar as miniaturas */
//         }
//         .embla-thumbs__slide {
//           flex: 0 0 80px;
//           min-width: 0;
//           position: relative;
//         }
//         .embla-thumbs__slide button {
//           touch-action: manipulation;
//           display: block;
//           text-decoration: none;
//         }
//         @media (min-width: 640px) {
//           .embla-thumbs__slide {
//             flex: 0 0 100px;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default ImagesGallery;

"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { AxiosHttpClient } from "@/settings/axios";
import { imageURLServer } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Banner from "../../banner";
import useEmblaCarousel from "embla-carousel-react";

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
  const [galleryDescription, setGalleryDescription] = useState<string>("");
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: "x",
    align: "start",
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
      setGalleryDescription(collection.description);
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

      <div className="max-w-6xl mx-auto px-4 py-14">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-primary mb-10 text-primary-blue">
          {galleryDescription}
        </h1>

        {images.length > 0 ? (
          <>
            <div className="relative mb-5 bg-primary-blue/90 rounded-md">
              <div
                className="embla overflow-hidden rounded-xl"
                ref={emblaMainRef}
              >
                <div className="embla__container flex max-h-[500px]">
                  {images.map((image, index) => (
                    <div
                      className="embla__slide flex-[0_0_100%] min-w-0 relative aspect-[16/9]"
                      key={index}
                    >
                      <Image
                        src={image.source}
                        alt={image.alt}
                        fill
                        className="w-auto h-auto object-contain"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation container */}
            <div className="hidden md:flex justify-end items-center gap-2 mb-5">
              <button
                onClick={scrollPrev}
                className="cursor-pointer text-white bg-primary-blue hover:bg-primary-blue/90 p-2 rounded-full transition"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={scrollNext}
                className="cursor-pointer text-white bg-primary-blue hover:bg-primary-blue/90 p-2 rounded-full transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="embla-thumbs px-4">
                <div
                  className="embla-thumbs__viewport overflow-hidden"
                  ref={emblaThumbsRef}
                >
                  <div className="embla-thumbs__container flex gap-3 w-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => onThumbClick(index)}
                        className={`embla-thumbs__slide flex-[0_0_80px] min-w-0 h-16 rounded-sm border-4 transition duration-200 ${
                          index === selectedIndex
                            ? "border-primary-blue/70 scale-105 shadow-md"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        type="button"
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={image.source}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
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
        .embla-thumbs__viewport {
          margin: 0 -16px; /* Compensa o padding do container pai */
        }
        .embla-thumbs__container {
          padding: 0 16px; /* Adiciona padding para não cortar as miniaturas */
        }
        .embla-thumbs__slide {
          flex: 0 0 80px;
          min-width: 0;
          position: relative;
        }
        .embla-thumbs__slide button {
          touch-action: manipulation;
          display: block;
          text-decoration: none;
        }
        @media (min-width: 640px) {
          .embla-thumbs__slide {
            flex: 0 0 100px;
          }
        }
      `}</style>
    </section>
  );
};

export default ImagesGallery;
