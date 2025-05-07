// "use client";

// import { useState, useEffect } from "react";
// import { Carousel } from "primereact/carousel";
// import ImagesTemplate from "./images-template";
// import qs from "qs";
// import { AxiosHttpClient } from "@/settings/axios";
// import { imageURLServer } from "@/lib/utils";

// // Definição de tipos
// type ImageItem = {
//   src: string;
//   title: string;
//   subtitle: string;
//   link: string;
// };

// type Image = {
//   title: string;
//   news: { [k: string]: string };
//   image: { [k: string]: string };
//   link: string;
//   description: string;
// };

// interface PageChangeEvent {
//   page: number;
// }

// interface ResponsiveOption {
//   breakpoint: string;
//   numVisible: number;
//   numScroll: number;
// }

// export const HeroSection = () => {
//   const responsiveOptions: ResponsiveOption[] = [
//     { breakpoint: "1024px", numVisible: 1, numScroll: 1 },
//     { breakpoint: "768px", numVisible: 1, numScroll: 1 },
//     { breakpoint: "560px", numVisible: 1, numScroll: 1 },
//   ];

//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const [autoplayActive, setAutoplayActive] = useState<boolean>(true);

//   const [images, setImages] = useState<ImageItem[]>([]);

//   // Função para lidar com a mudança de página
//   const handlePageChange = (event: PageChangeEvent): void => {
//     const newIndex = event.page || 0;

//     // Verificar se o índice está dentro do limite de imagens
//     if (newIndex >= 0 && newIndex < images.length) {
//       setCurrentIndex(newIndex);
//     } else {
//       // Se estiver tentando ir além do limite, reset para o primeiro item
//       setCurrentIndex(0);
//     }
//   };

//   // Implementar autoplay personalizado para evitar problemas
//   useEffect(() => {
//     let interval: NodeJS.Timeout | undefined;

//     if (autoplayActive) {
//       interval = setInterval(() => {
//         // Avançar para a próxima imagem ou voltar para a primeira
//         const nextIndex = (currentIndex + 1) % images.length;
//         setCurrentIndex(nextIndex);
//       }, 5000);
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [currentIndex, autoplayActive, images]);

//   useEffect(() => {
//     const query = qs.stringify(
//       {
//         sort: ["createdAt:desc"],
//         pagination: {
//           start: 0,
//           limit: 4,
//         },
//         populate: "*",
//       },
//       {
//         encodeValuesOnly: true,
//       }
//     );

//     (async () => {
//       AxiosHttpClient.get(`/highlights?${query}`).then(({ data: { data } }) => {
//         setImages(
//           (data as Image[]).map((image) => {
//             const noticias = image?.news?.documentId ? "noticias/" : "";
//             return {
//               title: image.title,
//               src: imageURLServer + image.image.url,
//               subtitle: image.description,
//               link: `${noticias}${
//                 image?.news?.documentId || image?.link || "#"
//               }`,
//             };
//           })
//         );
//       });
//     })();
//   }, []);

//   // Controles personalizados para o carousel
//   const customHeader = (
//     <div className="flex justify-end gap-2 mb-2">
//       <div className="flex gap-1">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-3 h-3 rounded-full transition-all ${
//               index === currentIndex
//                 ? "bg-primary_pink w-8"
//                 : "bg-gray-300 hover:bg-gray-400"
//             }`}
//             aria-label={`Ir para slide ${index + 1}`}
//           />
//         ))}
//       </div>
//       <button
//         onClick={() => setAutoplayActive(!autoplayActive)}
//         className="text-sm text-gray-600 hover:text-primary_pink"
//         aria-label={
//           autoplayActive ? "Pausar apresentação" : "Iniciar apresentação"
//         }
//       >
//         {autoplayActive ? "⏸️" : "▶️"}
//       </button>
//     </div>
//   );

//   return (
//     <div className="relative w-full">
//       {customHeader}
//       <Carousel
//         value={images}
//         itemTemplate={(image: ImageItem) => <ImagesTemplate {...image} />}
//         numVisible={1}
//         numScroll={1}
//         responsiveOptions={responsiveOptions}
//         circular={true}
//         autoplayInterval={7000}
//         className="custom-carousel"
//         page={currentIndex}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// };

// "use client";

// import { useState, useEffect } from "react";
// import { Carousel } from "@/components/ui/carousel";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import qs from "qs";
// import { AxiosHttpClient } from "@/settings/axios";
// import { imageURLServer } from "@/lib/utils";

// // Definição de tipos
// type ImageItem = {
//   src: string;
//   title: string;
//   subtitle: string;
//   link: string;
// };

// type Image = {
//   title: string;
//   news: { [k: string]: string };
//   image: { [k: string]: string };
//   link: string;
//   description: string;
// };

// export const HeroSection = () => {
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const [autoplayActive, setAutoplayActive] = useState<boolean>(true);
//   const [images, setImages] = useState<ImageItem[]>([]);
//   const router = useRouter();

//   // Implementar autoplay personalizado
//   useEffect(() => {
//     let interval: NodeJS.Timeout | undefined;

//     if (autoplayActive && images.length > 0) {
//       interval = setInterval(() => {
//         const nextIndex = (currentIndex + 1) % images.length;
//         setCurrentIndex(nextIndex);
//       }, 5000);
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [currentIndex, autoplayActive, images]);

//   useEffect(() => {
//     const query = qs.stringify(
//       {
//         sort: ["createdAt:desc"],
//         pagination: {
//           start: 0,
//           limit: 4,
//         },
//         populate: "*",
//       },
//       {
//         encodeValuesOnly: true,
//       }
//     );

//     (async () => {
//       AxiosHttpClient.get(`/highlights?${query}`).then(({ data: { data } }) => {
//         setImages(
//           (data as Image[]).map((image) => {
//             const noticias = image?.news?.documentId ? "noticias/" : "";
//             return {
//               title: image.title,
//               src: imageURLServer + image.image.url,
//               subtitle: image.description,
//               link: `${noticias}${
//                 image?.news?.documentId || image?.link || "#"
//               }`,
//             };
//           })
//         );
//       });
//     })();
//   }, []);

//   // Controles personalizados para o carousel
//   const customHeader = (
//     <div className="flex justify-end gap-2 mb-2">
//       <div className="flex gap-1">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-3 h-3 rounded-full transition-all ${
//               index === currentIndex
//                 ? "bg-primary_pink w-8"
//                 : "bg-gray-300 hover:bg-gray-400"
//             }`}
//             aria-label={`Ir para slide ${index + 1}`}
//           />
//         ))}
//       </div>
//       <button
//         onClick={() => setAutoplayActive(!autoplayActive)}
//         className="text-sm text-gray-600 hover:text-primary_pink"
//         aria-label={
//           autoplayActive ? "Pausar apresentação" : "Iniciar apresentação"
//         }
//       >
//         {autoplayActive ? "⏸️" : "▶️"}
//       </button>
//     </div>
//   );

//   return (
//     <div className="relative w-full">
//       {customHeader}
//       <Carousel
//         className="relative w-full h-[500px]"
//         value={currentIndex}
//         onChange={(e) => setCurrentIndex(e.value)}
//         autoPlay={autoplayActive}
//         autoPlayInterval={7000}
//         loop
//       >
//         <Carousel.Content items={images} className="h-full">
//           {(image) => (
//             <Carousel.Item className="w-full h-full">
//               <div className="relative w-full h-full">
//                 <Image
//                   src={image.src}
//                   alt={image.title}
//                   fill
//                   unoptimized
//                   className="w-full h-full object-cover"
//                 />
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//                 {/* Text Content */}
//                 <div className="w-full container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bottom-14 md:bottom-16 lg:bottom-8 text-white z-10 px-8 max-w-[80rem] py-8 md:py-16 lg:py-20 flex flex-col items-start justify-start">
//                   <h2 className="text-3xl md:text-[4xl] md:text-[37px] lg:text-[44px] font-semibold mb-2 md:mb-4 lg:leading-tight">
//                     {image.title}
//                   </h2>
//                   <p className="mt-2 mb-8 font-light lg:text-2xl">{image.subtitle}</p>
//                   <button
//                     onClick={() => {
//                       if (image.link.includes("http")) {
//                         window.open(image.link, "_blank", "noopener,noreferrer");
//                         return;
//                       }
//                       router.push(image.link);
//                     }}
//                     className="bg-transparent text-white border font-semibold border-white cursor-pointer py-3 px-12 rounded hover:bg-white hover:text-primary-blue hover:border-primary-blue transition"
//                   >
//                     Ler Mais
//                   </button>
//                 </div>
//               </div>
//             </Carousel.Item>
//           )}
//         </Carousel.Content>

//         <Carousel.Handler>
//           <Carousel.Button segment="previous" />
//           <Carousel.Button segment="next" />
//         </Carousel.Handler>
//       </Carousel>
//     </div>
//   );
// };

// "use client";

// import type React from "react";

// import { useState, useEffect, useRef, useCallback } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import qs from "qs";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Pause,
//   Play,
//   ExternalLink,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { AxiosHttpClient } from "@/settings/axios";
// import { imageURLServer } from "@/lib/utils";
// type ImageItem = {
//   src: string;
//   title: string;
//   subtitle: string;
//   link: string;
//   isExternal?: boolean;
// };

// type ImageData = {
//   title: string;
//   news: { [k: string]: string };
//   image: { [k: string]: string };
//   link: string;
//   description: string;
// };

// export const HeroSection = () => {
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const [previousIndex, setPreviousIndex] = useState<number>(0);
//   const [autoplayActive, setAutoplayActive] = useState<boolean>(true);
//   const [images, setImages] = useState<ImageItem[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [progressWidth, setProgressWidth] = useState<number>(0);
//   const [isTouching, setIsTouching] = useState<boolean>(false);
//   const touchStartX = useRef<number>(0);
//   const touchEndX = useRef<number>(0);
//   const progressInterval = useRef<NodeJS.Timeout | null>(null);
//   const autoplayInterval = useRef<NodeJS.Timeout | null>(null);
//   const router = useRouter();

//   const AUTOPLAY_DELAY = 6000; // 6 seconds
//   const SLIDE_DIRECTION = "right"; // Direção constante do carousel: "right" ou "left"

//   // Reset and start progress bar
//   const resetProgress = useCallback(() => {
//     setProgressWidth(0);
//     if (progressInterval.current) {
//       clearInterval(progressInterval.current);
//       progressInterval.current = null;
//     }
//   }, []);

//   // Handle slide change - sempre mantém a mesma direção de movimento
//   const goToSlide = useCallback(
//     (index: number) => {
//       if (index === currentIndex) return;

//       setPreviousIndex(currentIndex);
//       setCurrentIndex(index);
//       resetProgress();
//     },
//     [currentIndex, resetProgress]
//   );

//   // Go to next slide - sempre na mesma direção
//   const nextSlide = useCallback(() => {
//     if (images.length <= 1) return;
//     const newIndex = (currentIndex + 1) % images.length;
//     goToSlide(newIndex);
//   }, [currentIndex, images.length, goToSlide]);

//   // Go to previous slide - sempre na mesma direção
//   const prevSlide = useCallback(() => {
//     if (images.length <= 1) return;
//     const newIndex = (currentIndex - 1 + images.length) % images.length;
//     goToSlide(newIndex);
//   }, [currentIndex, images.length, goToSlide]);

//   // Toggle autoplay
//   const toggleAutoplay = useCallback(() => {
//     setAutoplayActive((prev) => !prev);
//     resetProgress();
//   }, [resetProgress]);

//   // Handle keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowLeft") {
//         prevSlide();
//       } else if (e.key === "ArrowRight") {
//         nextSlide();
//       } else if (e.key === " ") {
//         toggleAutoplay();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [nextSlide, prevSlide, toggleAutoplay]);

//   // Handle touch events for swipe
//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//     setIsTouching(true);
//     if (autoplayActive) {
//       setAutoplayActive(false);
//       resetProgress();
//     }
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     touchEndX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = () => {
//     setIsTouching(false);
//     const touchDiff = touchStartX.current - touchEndX.current;

//     // Minimum swipe distance (px)
//     if (Math.abs(touchDiff) > 50) {
//       if (touchDiff > 0) {
//         nextSlide();
//       } else {
//         prevSlide();
//       }
//     }

//     // Resume autoplay after a short delay
//     setTimeout(() => {
//       setAutoplayActive(true);
//     }, 1000);
//   };

//   // Progress bar animation
//   useEffect(() => {
//     if (autoplayActive && images.length > 0 && !isTouching) {
//       resetProgress();

//       const duration = AUTOPLAY_DELAY;
//       const interval = 16; // ~60fps
//       const steps = duration / interval;
//       const increment = 100 / steps;
//       let progress = 0;

//       progressInterval.current = setInterval(() => {
//         progress += increment;
//         setProgressWidth(Math.min(progress, 100));

//         if (progress >= 100) {
//           resetProgress();
//         }
//       }, interval);
//     }

//     return () => {
//       if (progressInterval.current) {
//         clearInterval(progressInterval.current);
//       }
//     };
//   }, [autoplayActive, currentIndex, images.length, isTouching, resetProgress]);

//   // Auto-play implementation
//   useEffect(() => {
//     if (autoplayInterval.current) {
//       clearInterval(autoplayInterval.current);
//       autoplayInterval.current = null;
//     }

//     if (autoplayActive && images.length > 1 && !isTouching) {
//       autoplayInterval.current = setInterval(() => {
//         // Sempre avança para o próximo slide em loop
//         nextSlide();
//       }, AUTOPLAY_DELAY);
//     }

//     return () => {
//       if (autoplayInterval.current) {
//         clearInterval(autoplayInterval.current);
//       }
//     };
//   }, [autoplayActive, images.length, isTouching, nextSlide]);

//   // // Fetch images
//   // useEffect(() => {
//   //   setIsLoading(true)

//   //   const query = qs.stringify(
//   //     {
//   //       sort: ["createdAt:desc"],
//   //       pagination: {
//   //         start: 0,
//   //         limit: 4,
//   //       },
//   //       populate: "*",
//   //     },
//   //     {
//   //       encodeValuesOnly: true,
//   //     },
//   //   )

//   //   // Use native fetch instead of AxiosHttpClient
//   //   ;(async () => {
//   //     try {
//   //       // Replace with your API base URL or use relative path
//   //       const apiUrl = `/api/highlights?${query}`
//   //       const data = await fetchData(apiUrl)

//   //       setImages(
//   //         (data.data as ImageData[]).map((image) => {
//   //           const link = image?.news?.documentId ? `noticias/${image.news.documentId}` : image?.link || "#"

//   //           // Use a direct image URL or add a base URL if needed
//   //           const imageUrl = image.image.url.startsWith("http") ? image.image.url : `/api/images${image.image.url}` // Adjust this based on your API structure

//   //           return {
//   //             title: image.title,
//   //             src: imageUrl,
//   //             subtitle: image.description,
//   //             link: link,
//   //             isExternal: link.includes("http"),
//   //           }
//   //         }),
//   //       )
//   //     } catch (error) {
//   //       console.error("Failed to fetch carousel images:", error)
//   //       // Set some fallback images for development/testing
//   //       setImages([
//   //         {
//   //           title: "Exemplo de Destaque 1",
//   //           src: "/placeholder.svg?height=700&width=1200",
//   //           subtitle: "Descrição do primeiro destaque para demonstração do carousel.",
//   //           link: "#",
//   //           isExternal: false,
//   //         },
//   //         {
//   //           title: "Exemplo de Destaque 2",
//   //           src: "/placeholder.svg?height=700&width=1200",
//   //           subtitle: "Descrição do segundo destaque para demonstração do carousel.",
//   //           link: "#",
//   //           isExternal: false,
//   //         },
//   //         {
//   //           title: "Exemplo de Destaque 3",
//   //           src: "/placeholder.svg?height=700&width=1200",
//   //           subtitle: "Descrição do terceiro destaque para demonstração do carousel.",
//   //           link: "#",
//   //           isExternal: false,
//   //         },
//   //       ])
//   //     } finally {
//   //       setIsLoading(false)
//   //     }
//   //   })()
//   // }, [])

//   // Fetch images
//   useEffect(() => {
//     setIsLoading(true);

//     const query = qs.stringify(
//       {
//         sort: ["createdAt:desc"],
//         pagination: {
//           start: 0,
//           limit: 4,
//         },
//         populate: "*",
//       },
//       {
//         encodeValuesOnly: true,
//       }
//     );
//     (async () => {
//       try {
//         const {
//           data: { data },
//         } = await AxiosHttpClient.get(`/highlights?${query}`);

//         setImages(
//           (data as ImageData[]).map((image) => {
//             const link = image?.news?.documentId
//               ? `noticias/${image.news.documentId}`
//               : image?.link || "#";

//             return {
//               title: image.title,
//               src: imageURLServer + image.image.url,
//               subtitle: image.description,
//               link: link,
//               isExternal: link.includes("http"),
//             };
//           })
//         );
//       } catch (error) {
//         console.error("Failed to fetch carousel images:", error);
//         // Set some fallback images or show error state
//       } finally {
//         setIsLoading(false);
//       }
//     })();
//   }, []);

//   // Handle click on slide
//   const handleSlideClick = (image: ImageItem) => {
//     if (image.isExternal) {
//       window.open(image.link, "_blank", "noopener,noreferrer");
//     } else if (image.link !== "#") {
//       router.push(image.link);
//     }
//   };

//   // Determina a posição visual do slide para criar o efeito de loop contínuo
//   const getSlidePosition = (index: number) => {
//     if (index === currentIndex) return "center";

//     // Para criar o efeito de loop contínuo, precisamos determinar se o slide
//     // deve aparecer à esquerda ou à direita do slide atual
//     if (SLIDE_DIRECTION === "right") {
//       // Se estamos movendo para a direita (padrão)
//       if (index === (currentIndex + 1) % images.length) return "right";
//       if (index === (currentIndex - 1 + images.length) % images.length)
//         return "left";
//     } else {
//       // Se estamos movendo para a esquerda
//       if (index === (currentIndex + 1) % images.length) return "left";
//       if (index === (currentIndex - 1 + images.length) % images.length)
//         return "right";
//     }

//     return "offscreen";
//   };

//   if (isLoading) {
//     return (
//       <div className="relative w-full h-[500px] bg-gray-100 animate-pulse flex items-center justify-center">
//         <div className="text-gray-400">Carregando...</div>
//       </div>
//     );
//   }

//   if (images.length === 0) {
//     return null;
//   }

//   return (
//     <div
//       className="relative w-full overflow-hidden mt-24"
//       role="region"
//       aria-roledescription="carousel"
//       aria-label="Destaques em destaque"
//     >
//       {/* Progress bar */}
//       <div className="absolute top-0 left-0 right-0 h-1 bg-transparent z-30">
//         <div
//           className="h-full bg-primary-blue/80 transition-all duration-300 ease-linear"
//           style={{ width: `${progressWidth}%` }}
//         />
//       </div>

//       {/* Controls header */}
//       <div className="absolute top-4 right-4 z-30 flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
//         <div className="flex gap-1.5 items-center">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={cn(
//                 "transition-all duration-300 rounded-full",
//                 index === currentIndex
//                   ? "w-8 h-2.5 bg-primary_pink"
//                   : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
//               )}
//               aria-label={`Ir para slide ${index + 1}`}
//               aria-current={index === currentIndex ? "true" : "false"}
//             />
//           ))}
//           {/* Indicador visual de loop infinito */}
//           <span
//             className="text-white/70 ml-1.5 text-xs"
//             title="Carousel em loop infinito"
//           >
//             ∞
//           </span>
//         </div>
//         <button
//           onClick={toggleAutoplay}
//           className="text-white rounded-full p-1.5 hover:bg-primary-blue/30 transition-colors"
//           aria-label={
//             autoplayActive ? "Pausar apresentação" : "Iniciar apresentação"
//           }
//         >
//           {autoplayActive ? <Pause size={16} /> : <Play size={16} />}
//         </button>
//       </div>

//       {/* Slides container */}
//       <div
//         className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]"
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         {images.map((image, index) => {
//           const position = getSlidePosition(index);

//           // Classes de animação baseadas na posição
//           let positionClasses = "";
//           let animationClasses = "";

//           if (position === "center") {
//             positionClasses = "opacity-100 z-20";
//             if (previousIndex !== currentIndex) {
//               animationClasses =
//                 SLIDE_DIRECTION === "right"
//                   ? "animate-slide-from-right"
//                   : "animate-slide-from-left";
//             }
//           } else if (position === "right") {
//             positionClasses = "opacity-0 translate-x-full z-10";
//           } else if (position === "left") {
//             positionClasses = "opacity-0 -translate-x-full z-10";
//           } else {
//             positionClasses = "opacity-0 z-0";
//           }

//           // Se o slide anterior está saindo
//           if (index === previousIndex && previousIndex !== currentIndex) {
//             positionClasses = "opacity-100 z-10";
//             animationClasses =
//               SLIDE_DIRECTION === "right"
//                 ? "animate-slide-to-left"
//                 : "animate-slide-to-right";
//           }

//           return (
//             <div
//               key={index}
//               className={cn(
//                 "absolute inset-0 transition-opacity duration-500",
//                 positionClasses,
//                 animationClasses
//               )}
//               role="group"
//               aria-roledescription="slide"
//               aria-label={`${index + 1} de ${images.length}: ${image.title}`}
//               aria-hidden={position !== "center"}
//             >
//               <div className="relative w-full h-full overflow-hidden">
//                 <Image
//                   src={image.src || "/placeholder.svg"}
//                   alt={image.title}
//                   fill
//                   priority={index === 0}
//                   unoptimized
//                   className="w-full h-full object-cover transform scale-[1.01] transition-transform duration-[8000ms] ease-out"
//                   style={{
//                     transform:
//                       position === "center" ? "scale(1.05)" : "scale(1)",
//                   }}
//                   onError={(e) => {
//                     // Fallback for image loading errors
//                     (e.target as HTMLImageElement).src =
//                       "/placeholder.svg?height=700&width=1200";
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
//               </div>

//               <div className="absolute inset-0 flex flex-col justify-end">
//                 <div className="container mx-auto px-6 md:px-8 pb-16 md:pb-20 lg:pb-24 text-white z-20">
//                   <div
//                     className={cn(
//                       "max-w-3xl transition-all duration-700",
//                       position === "center"
//                         ? "translate-y-0 opacity-100"
//                         : "translate-y-8 opacity-0"
//                     )}
//                   >
//                     <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
//                       {image.title}
//                     </h2>
//                     <p className="text-base md:text-lg lg:text-xl font-light mb-8 opacity-90 max-w-2xl">
//                       {image.subtitle}
//                     </p>
//                     <button
//                       onClick={() => handleSlideClick(image)}
//                       className="group flex items-center gap-2 bg-transparent text-white border-2 font-medium border-white py-3 px-8 rounded-md hover:bg-white hover:text-primary-blue transition-all duration-300"
//                     >
//                       <span>Ler Mais</span>
//                       {image.isExternal && (
//                         <ExternalLink
//                           size={18}
//                           className="transition-transform group-hover:translate-x-1"
//                         />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//         {/* Navigation buttons */}
//         {images.length > 1 && (
//           <>
//             <button
//               onClick={prevSlide}
//               className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-all z-20 backdrop-blur-sm"
//               aria-label="Slide anterior"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <button
//               onClick={nextSlide}
//               className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-all z-20 backdrop-blur-sm"
//               aria-label="Próximo slide"
//             >
//               <ChevronRight size={24} />
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

"use client";

import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import qs from "qs";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AxiosHttpClient } from "@/settings/axios";
import { imageURLServer } from "@/lib/utils";

type ImageItem = {
  src: string;
  title: string;
  subtitle: string;
  link: string;
  isExternal?: boolean;
};

type ImageData = {
  title: string;
  news: { [k: string]: string };
  image: { [k: string]: string };
  link: string;
  description: string;
};

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [previousIndex, setPreviousIndex] = useState<number>(0);
  const [autoplayActive, setAutoplayActive] = useState<boolean>(true);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progressWidth, setProgressWidth] = useState<number>(0);
  const [isTouching, setIsTouching] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const autoplayInterval = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const AUTOPLAY_DELAY = 10000; // 6 seconds
  const SLIDE_DIRECTION = "right"; // Direção constante do carousel: "right" ou "left"
  const TRANSITION_DURATION = 600; // Duração da transição em ms

  // Reset and start progress bar
  const resetProgress = useCallback(() => {
    setProgressWidth(0);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  // Handle slide change - sempre mantém a mesma direção de movimento
  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex || isTransitioning) return;

      setIsTransitioning(true);
      setPreviousIndex(currentIndex);
      setCurrentIndex(index);
      resetProgress();

      // Permitir nova transição após a animação terminar
      setTimeout(() => {
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    },
    [currentIndex, isTransitioning, resetProgress]
  );

  // Go to next slide - sempre na mesma direção
  const nextSlide = useCallback(() => {
    if (images.length <= 1 || isTransitioning) return;
    const newIndex = (currentIndex + 1) % images.length;
    goToSlide(newIndex);
  }, [currentIndex, images.length, goToSlide, isTransitioning]);

  // Go to previous slide - sempre na mesma direção
  const prevSlide = useCallback(() => {
    if (images.length <= 1 || isTransitioning) return;
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    goToSlide(newIndex);
  }, [currentIndex, images.length, goToSlide, isTransitioning]);

  // Toggle autoplay
  const toggleAutoplay = useCallback(() => {
    setAutoplayActive((prev) => !prev);
    resetProgress();
  }, [resetProgress]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === " ") {
        e.preventDefault(); // Previne rolagem da página
        toggleAutoplay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, prevSlide, toggleAutoplay]);

  // Handle touch events for swipe
  // const handleTouchStart = (e: React.TouchEvent) => {
  //   touchStartX.current = e.touches[0].clientX;
  //   setIsTouching(true);
  //   if (autoplayActive) {
  //     setAutoplayActive(false);
  //     resetProgress();
  //   }
  // };

  // const handleTouchMove = (e: React.TouchEvent) => {
  //   touchEndX.current = e.touches[0].clientX;
  // };

  // const handleTouchEnd = () => {
  //   setIsTouching(false);
  //   const touchDiff = touchStartX.current - touchEndX.current;

  //   // Minimum swipe distance (px)
  //   if (Math.abs(touchDiff) > 50) {
  //     if (touchDiff > 0) {
  //       nextSlide();
  //     } else {
  //       prevSlide();
  //     }
  //   }

  //   // Resume autoplay after a short delay
  //   setTimeout(() => {
  //     setAutoplayActive(true);
  //   }, 1000);
  // };

  // Progress bar animation

  const handleTouchStart = (e: React.TouchEvent) => {
    // Verifique se há apenas um toque
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      setIsTouching(true);
      if (autoplayActive) {
        setAutoplayActive(false);
        resetProgress();
      }
      // Previne rolagem acidental
      e.preventDefault();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchEndX.current = e.touches[0].clientX;
      // Previne rolagem durante o swipe
      if (Math.abs(touchStartX.current - touchEndX.current) > 10) {
        e.preventDefault();
      }
    }
  };
  const handleTouchEnd = () => {
    setIsTouching(false);
    const touchDiff = touchStartX.current - touchEndX.current;

    // Reduzir a distância mínima para 30px em dispositivos móveis
    const minSwipeDistance = window.innerWidth < 768 ? 30 : 50;

    if (Math.abs(touchDiff) > minSwipeDistance) {
      if (touchDiff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setAutoplayActive(true);
  };

  useEffect(() => {
    if (autoplayActive && images.length > 0 && !isTouching) {
      resetProgress();

      const duration = AUTOPLAY_DELAY;
      const interval = 16; // ~60fps
      const steps = duration / interval;
      const increment = 100 / steps;
      let progress = 0;

      progressInterval.current = setInterval(() => {
        progress += increment;
        setProgressWidth(Math.min(progress, 100));
      }, interval);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [autoplayActive, currentIndex, images.length, isTouching, resetProgress]);

  // Auto-play implementation
  useEffect(() => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
      autoplayInterval.current = null;
    }

    if (autoplayActive && images.length > 1 && !isTouching) {
      autoplayInterval.current = setInterval(() => {
        // Garantir que a barra de progresso chegue a 100% antes de mudar o slide
        setProgressWidth(100);

        // Aguardar um pequeno intervalo para que a barra de progresso seja visualmente percebida como completa
        setTimeout(() => {
          // Sempre avança para o próximo slide em loop
          nextSlide();
        }, 100); // Pequeno atraso para garantir que a barra de progresso seja vista como completa
      }, AUTOPLAY_DELAY);
    }

    return () => {
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current);
      }
    };
  }, [autoplayActive, images.length, isTouching, nextSlide]);

  // Fetch images
  useEffect(() => {
    setIsLoading(true);

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
      try {
        const {
          data: { data },
        } = await AxiosHttpClient.get(`/highlights?${query}`);

        setImages(
          (data as ImageData[]).map((image) => {
            const link = image?.news?.documentId
              ? `noticias/${image.news.documentId}`
              : image?.link || "#";

            return {
              title: image.title,
              src: imageURLServer + image.image.url,
              subtitle: image.description,
              link: link,
              isExternal: link.includes("http"),
            };
          })
        );
      } catch (error) {
        console.error("Failed to fetch carousel images:", error);
        // Set some fallback images or show error state
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Handle click on slide
  const handleSlideClick = (image: ImageItem) => {
    if (image.isExternal) {
      window.open(image.link, "_blank", "noopener,noreferrer");
    } else if (image.link !== "#") {
      router.push(image.link);
    }
  };

  // Determina a posição visual do slide para criar o efeito de loop contínuo
  const getSlidePosition = (index: number) => {
    if (index === currentIndex) return "center";

    // Para criar o efeito de loop contínuo, precisamos determinar se o slide
    // deve aparecer à esquerda ou à direita do slide atual
    if (SLIDE_DIRECTION === "right") {
      // Se estamos movendo para a direita (padrão)
      if (index === (currentIndex + 1) % images.length) return "right";
      if (index === (currentIndex - 1 + images.length) % images.length)
        return "left";
    } else {
      // Se estamos movendo para a esquerda
      if (index === (currentIndex + 1) % images.length) return "left";
      if (index === (currentIndex - 1 + images.length) % images.length)
        return "right";
    }

    return "offscreen";
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Carregando...</div>
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <section
      className="relative w-full overflow-hidden mt-24"
      role="region"
      aria-roledescription="carousel"
      aria-label="Destaques em destaque"
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-transparent z-30">
        <div
          className="h-full bg-primary-blue/80 transition-all duration-300 ease-linear"
          style={{ width: `${progressWidth}%` }}
        />
      </div>

      {/* Controls header */}
      <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 z-30 flex items-center gap-2 sm:gap-3 bg-black/20 backdrop-blur-sm rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 ">
        <div className="flex gap-1 sm:gap-1.5 items-center">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "transition-all duration-300 rounded-full",
                index === currentIndex
                  ? "w-5 sm:w-6 md:w-8 h-1.5 sm:h-2 md:h-2.5 bg-primary_pink"
                  : "w-1.5 sm:w-2 md:w-2.5 h-1.5 sm:h-2 md:h-2.5 bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Ir para slide ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
          {/* Indicador visual de loop infinito */}
          <span
            className="text-white/70 ml-1 sm:ml-1.5 text-[10px] sm:text-xs"
            title="Carousel em loop infinito"
          >
            ∞
          </span>
        </div>
        <button
          onClick={toggleAutoplay}
          className="text-white rounded-full p-1 sm:p-1.5 hover:bg-primary-blue/30 transition-colors"
          aria-label={
            autoplayActive ? "Pausar apresentação" : "Iniciar apresentação"
          }
        >
          {autoplayActive ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>

      {/* Slides container */}
      <div
        className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          touchAction: "pan-y",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {images.map((image, index) => {
          const position = getSlidePosition(index);

          // Classes de animação baseadas na posição
          let positionClasses = "";
          let animationClasses = "";

          if (position === "center") {
            positionClasses = "opacity-100 z-20";
            if (previousIndex !== currentIndex) {
              animationClasses =
                SLIDE_DIRECTION === "right"
                  ? "animate-slide-from-right"
                  : "animate-slide-from-left";
            }
          } else if (position === "right") {
            positionClasses = "opacity-0 translate-x-full z-10";
          } else if (position === "left") {
            positionClasses = "opacity-0 -translate-x-full z-10";
          } else {
            positionClasses = "opacity-0 z-0";
          }

          // Se o slide anterior está saindo
          if (index === previousIndex && previousIndex !== currentIndex) {
            positionClasses = "opacity-100 z-10";
            animationClasses =
              SLIDE_DIRECTION === "right"
                ? "animate-slide-to-left"
                : "animate-slide-to-right";
          }

          return (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                positionClasses,
                animationClasses
              )}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${images.length}: ${image.title}`}
              aria-hidden={position !== "center"}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  fill
                  priority={index === 0}
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  className="w-full h-full object-cover transform scale-[1.01] transition-transform duration-[8000ms] ease-out"
                  style={{
                    transform:
                      position === "center" ? "scale(1.05)" : "scale(1)",
                  }}
                  onError={(e) => {
                    // Fallback for image loading errors
                    (e.target as HTMLImageElement).src =
                      "/placeholder.svg?height=700&width=1200";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/80 via-primary-blue/60 to-primary-blue/10" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-center">
                <div className="w-full max-w-[88rem] container mx-auto px-4 flex flex-col items-start justify-center text-white z-20">
                  <div
                    className={cn(
                      "max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-7xl transition-all duration-700",
                      position === "center"
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    )}
                  >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight max-w-full line-clamp-1 md:line-clamp-2">
                      {image.title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light mb-4 sm:mb-6 md:mb-8 opacity-90 max-w-full line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                      {image.subtitle}
                    </p>
                    <button
                      onClick={() => handleSlideClick(image)}
                      className="group flex items-center gap-1 sm:gap-2 bg-transparent text-white border-2 font-medium border-white py-2 sm:py-2.5 md:py-3 cursor-pointer px-4 sm:px-6 md:px-8 rounded-md hover:bg-white hover:text-primary-blue transition-all duration-300 text-sm sm:text-base"
                    >
                      <span>Ler Mais</span>
                      {image.isExternal && (
                        <ExternalLink
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
             className="absolute right-2 sm:right-3 lg:left-3 top-[85%] lg:top-1/2 -translate-y-1/2 bg-black/30 text-white p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-black/50 transition-all z-20 backdrop-blur-sm cursor-pointer max-w-fit"
              aria-label="Slide anterior"
              disabled={isTransitioning}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-3 lg:right-3 top-[70%] lg:top-1/2 -translate-y-1/2 bg-black/30 text-white p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-black/50 transition-all z-20 backdrop-blur-sm cursor-pointer"
              aria-label="Próximo slide"
              disabled={isTransitioning}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </section>
  );
};
