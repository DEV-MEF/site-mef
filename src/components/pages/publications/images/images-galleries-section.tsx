// "use client";
// import Image from "next/image";
// import { Suspense, useEffect, useState } from "react";
// import { AxiosHttpClient } from "@/settings/axios";
// import { imageURLServer } from "@/lib/utils";
// import { useRouter } from "next/navigation";

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

// export default function GaleriesSection() {
//   const route = useRouter();
//   const [colecao, setColecao] = useState<TImageApi[]>();
//   useEffect(() => {
//     (async () => {
//       AxiosHttpClient.get(`/galleries?&populate=*`).then(
//         ({ data: { data } }) => {
//           setColecao(data);
//         }
//       );
//     })();
//   }, []);

//   return (
//     <Suspense fallback={null}>
//       <section className="w-full">
//         <div className="flex flex-col mb-6 gap-2">
//           <h2 className="font-bold text-[16px] text-primary-blue">Imagens</h2>
//           <p className="text-text-second font-light">
//             Veja a nossa Galeria de Imagens e acompanhe as nossas actividades!
//           </p>
//         </div>
//         <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
//           {colecao?.map((value, index) => {
//             return (
//               <div
//                 key={index}
//                 className="relative w-full h-72 md:h-72 lg:h-72 rounded overflow-hidden shadow-md"
//                 onClick={() => {
//                   route.push(`/imagens/${value.documentId}`);
//                 }}
//               >
//                 <Image
//                   unoptimized
//                   src={
//                     imageURLServer +
//                     (value.cover?.formats?.medium || value.cover).url
//                   }
//                   alt="Vídeo Principal"
//                   fill
//                   className="rounded object-cover"
//                 />

//                 <div className="w-full absolute bottom-0 flex flex-col items-start">
//                   <div className="bg-primary-blue text-white text-xs px-4 py-2 md:mx-3 lg:mx-5 mx-5 font-semibold">
//                     Galeria
//                   </div>
//                   <div className="w-full md:mt-2 mt-1 cursor-pointer text-white font-light md:text-[14px] lg:text-[14px] text-[14px] bg-dark-gray bg-opacity-40 md:px-3 lg:px-5 md:py-3 lg:py-5 py-2 px-5">
//                     {value.description || ""}
//                     <small className="text-text-light font-semibold mt-3 block">
//                       {value.medias.length} Foto
//                       {value.medias.length === 1 ? "" : "s"}
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     </Suspense>
//   );
// }

"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AxiosHttpClient } from "@/settings/axios";
import { imageURLServer } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Camera, ChevronRight } from "lucide-react";
import SectionTitle from "@/components/layout/title";

type ImageType = {
  name: string;
  documentId: string;
  url: string;
  alternativeText: string;
  formats: { [k in "large" | "medium" | "small"]: ImageType };
};

type TImageApi = {
  documentId: string;
  description: string;
  url: string;
  medias: ImageType[];
  cover: ImageType;
};

export default function GaleriesSection() {
  const router = useRouter();
  const [galleries, setGalleries] = useState<TImageApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setIsLoading(true);
        const {
          data: { data },
        } = await AxiosHttpClient.get("/galleries?&populate=*");
        setGalleries(data);
      } catch (err) {
        setError(
          "Não foi possível carregar as galerias. Tente novamente mais tarde."
        );
        console.error("Erro ao carregar galerias:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const navigateToGallery = (galleryId: string): void => {
    router.push(`/publicacoes/imagens/${galleryId}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="w-full min-h-[300px] flex flex-col items-center justify-center text-red-500">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary-blue text-white rounded hover:bg-primary-blue/90 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <section className="w-full py-8">
      <div className="flex flex-col mb-8 gap-3">
        <div className="flex items-center gap-2">
          <SectionTitle text="Galeria de Imagens" />
        </div>
        <p className="text-text-second font-light">
          Veja a nossa Galeria de Imagens e acompanhe as nossas actividades!
        </p>
      </div>
      {galleries?.length === 0 ? (
        <div className="w-full min-h-[200px] flex items-center justify-center text-text-second">
          <p>Nenhuma galeria disponível no momento.</p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {galleries.map((gallery, index) => (
            <GalleryCard
              key={gallery.documentId || index}
              gallery={gallery}
              onClick={() => navigateToGallery(gallery.documentId)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function GalleryCard({
  gallery,
  onClick,
}: {
  gallery: TImageApi;
  onClick: () => void;
}) {
  return (
    <div
      className="group relative w-full h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      onClick={onClick}
    >
      {gallery.cover ? (
        <Image
          unoptimized
          src={
            imageURLServer +
            (gallery.cover?.formats?.medium || gallery.cover).url
          }
          alt={gallery.description || "Imagem da galeria"}
          fill
          className="rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <Camera className="w-16 h-16 text-gray-400" />
        </div>
      )}

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity duration-300" />

      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="ml-6 bg-primary-blue text-white text-xs px-3 py-1.5 rounded-full w-fit font-medium mb-3 flex items-center gap-1">
          <Camera className="w-3.5 h-3.5" />
          <span>Galeria</span>
        </div>
        <div className="p-6 w-full bg-gradient-to-t from-primary-blue/80 via-primary-blue/60 to-transparent opacity-80 transition-opacity duration-300">
          <h3 className="text-white font-semibold text-xl mb-2 line-clamp-2">
            {gallery.description || "Galeria de imagens"}
          </h3>

          <div className="flex items-center justify-between text-white">
            <span className="text-sm font-medium">
              {gallery.medias.length} Foto
              {gallery.medias.length === 1 ? "" : "s"}
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
}
