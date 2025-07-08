// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { AxiosHttpClient } from "@/settings/axios";
// import { useRouter } from "next/navigation";
// import { imageURLServer } from "@/lib/utils";

// type ImageType = {
//   name: string;
//   documentId: string;
//   url: string;
//   alternativeText: string;
//   formats: { [k in "large" | "medium" | "small"]: ImageType };
// };

// type TImageApi = {
//   documentId: string;
//   description: string;
//   url: string;
//   medias: ImageType[];
//   cover: ImageType;
// };

// export default function VideoGalleriesContainer() {
//   const [multimedia, setMultimedia] = useState<TImageApi[]>();
//   const route = useRouter();
//   useEffect(() => {
//     (async () => {
//       AxiosHttpClient.get(`/towatches?&populate=*`).then(
//         ({ data: { data } }) => {
//           setMultimedia(data);
//         }
//       );
//     })();
//   }, []);
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
//       {multimedia?.map((value, index) => {
//         console.log({ value });
//         return (
//           <div
//             key={index}
//             className="relative w-full h-72 md:h-72 lg:h-80 rounded overflow-hidden shadow-md"
//             onClick={() => {
//               route.push(`/publicacoes/videos/${value.documentId}`);
//             }}
//           >
//             <Image
//               unoptimized
//               src={
//                 value.cover
//                   ? `${imageURLServer}${
//                       value.cover.formats?.large?.url ||
//                       value.cover.formats?.medium?.url ||
//                       value.cover.url
//                     }`
//                   : "/images/ministry-logo.png"
//               }
//               alt="Vídeo Principal"
//               fill
//               className="rounded object-cover"
//             />
//             <div className="absolute inset-0 flex items-center justify-center">
//               <button className="bg-white rounded-full shadow-lg hover:bg-gray-100 transition">
//                 <svg
//                   className="w-16 h-16 text-gray-800"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M8 5v14l11-7z" />
//                 </svg>
//               </button>
//             </div>
//             <div className="absolute bottom-0 flex flex-col items-start">
//               <div className="bg-primary-blue text-white text-xs px-4 py-2 md:mx-3 lg:mx-16 mx-5 font-light">
//                 VÍDEOS DO MINISTÉRIO
//               </div>
//               <div className="md:mt-2 mt-1 text-white font-light md:text-[14px] lg:text-[16px] text-[14px] bg-dark-gray bg-opacity-40 md:px-3 lg:px-16 md:py-3 lg:py-5 py-2 px-5">
//                 {value.description}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AxiosHttpClient } from "@/settings/axios";
import { useRouter } from "next/navigation";
import { imageURLServer } from "@/lib/utils";
import { Camera, ChevronRight } from "lucide-react";
import SectionTitle from "@/components/layout/title";
import { ImagesGallerySkeleton } from "@/components/layout/skeleton/image-video-galleries";

type ImageType = {
  name: string;
  documentId: string;
  url: string;
  alternativeText: string;
  formats: { [k in "large" | "medium" | "small"]?: ImageType };
};

type TImageApi = {
  documentId: string;
  description: string;
  url: string;
  medias: ImageType[];
  cover: ImageType;
};

export default function VideoGalleriesContainer() {
  const router = useRouter();
  const [multimedia, setMultimedia] = useState<TImageApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const {
          data: { data },
        } = await AxiosHttpClient.get(`/towatches?populate=*`);
        setMultimedia(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Ocorreu um erro ao carregar os videos. Tente novamente mais tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const navigateToVideoGallery = (id: string) => {
    router.push(`/publicacoes/videos/${id}`);
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
  if (isLoading) {
    return <ImagesGallerySkeleton />;
  }
  if (multimedia.length === 0) {
    return (
      <section className="w-full h-[500px] flex flex-col items-center justify-center">
        <p>Nenhum vídeo disponível no momento.</p>
      </section>
    );
  }

  if (!isLoading && multimedia.length === 0) {
    return (
      <section className="w-full">
        <div className="w-full container max-w-[88rem] mx-auto px-4 py-10 min-h-[500px]">
          <SectionTitle text="Galeria de Vídeos" />
          <p className="text-sm text-[#3b4158a8] flex items-center my-12 mt-10">
            <i className="pi pi-inbox mr-2"></i> Nenhum resultado encontrado.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-8 px-4 min-h-[600px]">
      <div className="flex flex-col mb-8 gap-3">
        <SectionTitle text="Galeria de Vídeos" />
        <p className="text-text-second font-light">
          Veja a nossa Galeria de Vídeos e acompanhe as nossas atividades!
        </p>
      </div>

      {multimedia.length > 0 && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {multimedia.map((video, index) => {
            const imageSrc =
              video.cover?.formats?.medium?.url ||
              video.cover?.formats?.small?.url ||
              video.cover?.url;

            return (
              <div
                key={video.documentId || index}
                className="group relative w-full h-64 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                onClick={() => navigateToVideoGallery(video.documentId)}
              >
                {imageSrc ? (
                  <Image
                    unoptimized
                    src={`${imageURLServer}${imageSrc}`}
                    alt={video.description || "Capa do vídeo"}
                    fill
                    className="rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                    <Camera className="w-16 h-16 text-gray-400" />
                  </div>
                )}

                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity duration-300" />

                <div className="absolute inset-0 flex flex-col justify-end">
                  <div className="ml-6 bg-primary-blue text-white text-xs px-3 py-1.5 rounded-full w-fit font-medium mb-3 flex items-center gap-1 select-none">
                    <Camera className="w-3.5 h-3.5" />
                    <span>VÍDEO</span>
                  </div>

                  <div className="p-6 w-full bg-gradient-to-t from-primary-blue/80 via-primary-blue/60 to-transparent opacity-80 transition-opacity duration-300">
                    <h3 className="text-white font-semibold text-xl mb-2 line-clamp-2">
                      {video.description || "Galeria de vídeos"}
                    </h3>

                    <div className="flex items-center justify-between text-white select-none ">
                      <span className="text-sm font-medium">
                        {video?.medias?.length} vídeo
                        {video?.medias?.length === 1 ? "" : "s"}
                      </span>

                      <div className="flex items-center gap-1 text-sm font-medium opacity-80 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all">
                        <span>Ver galeria</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
