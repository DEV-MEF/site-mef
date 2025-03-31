"use client"
import Image from 'next/image';
import fundo from '@/assets/fundoPages.png';
import 'primeicons/primeicons.css';
import React, {useEffect, useState} from "react";
import {AxiosHttpClient} from "@/settings/axios";
import {imageURLServer} from "@/lib/utils";
import {Galleria} from "primereact/galleria";
import {twMerge} from "tailwind-merge";


export default function Galeria({ params }: never) {
  return (
    <div className='mb-20'>
        <div className="relative w-full h-[300px]">
            <Image
                src={fundo}
                alt="Fundo Sobre Nós"
                fill className="object-cover"
                quality={100}
            />
            <div
                className="absolute inset-0 bg-[#3A3B7B] opacity-50"
                aria-hidden="true"
            ></div>
            <div className="absolute inset-0 flex items-center px-44 py-56">
            <h1 className="text-white text-3xl font-bold">Publicações <small className='font-light'> » Vídeos</small></h1>
            </div>
        </div>

        <div className="container mx-auto px-44 py-10 mb-20">
          <GalleryVideos params={params} />
        </div>
    </div>
  );
}

type Video = {
    description: string
    plataforn: string
    cover: Image
    link: string
}

type Image = {
    name: string
    documentId: string
    url: string
    alternativeText: string
    formats: {[k in ("large" | "medium" | "small")]: Image}
}

type VideoApi = {
    documentId: string,
    description: string,
    media: Video[]
    cover: Image
};

type TImage = { source: string, alt: string, title: string, linkVideo: string };

const GalleryVideos = ({params} : {params : Promise<{documentId: string}>}) => {
    const [images, setImages] = useState<TImage[]>();

    useEffect(() => {
        (async () => {
            const {documentId} = await params;
            AxiosHttpClient.get(`/towatches?filters[documentId][$eq]=${documentId}&populate=media.cover&populate=cover`).then(({data : {data}}) => {
                const colecao : VideoApi = data[0];
                setImages((colecao?.media || []).map((value) => {
                    return {
                        title: value.description,
                        alt: value.description,
                        source: imageURLServer+(value.cover?.formats?.medium || value.cover || colecao.cover.formats.medium || colecao.cover).url,
                        linkVideo: value.link
                    }
                }));
            });
        })()
    }, [params]);

    const ItemTemplate = (item: TImage) => {
        const videoId = item.linkVideo.split("v=")[1]?.split("&")[0];
        const [startVideo, setStartVideo] = useState(false);

        return (
            <>
                <Image
                    src={item.source}
                    alt={item.alt}
                    width={500} // Largura base
                    height={300} // Altura base (ajusta proporcionalmente)
                    layout="intrinsic" // Mantém a proporção da imagem
                    className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <button onClick={() => {
                        setStartVideo(true);
                    }}
                            className={twMerge("bg-white rounded-full shadow-lg hover:bg-gray-100 transition", startVideo ? "hidden" : "")}>
                        <svg className="w-16 h-16 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=${startVideo ? 1 : 0}`}
                        title="YouTube video"
                        allowFullScreen
                        className={twMerge(!startVideo ? "hidden" : "")}
                        allow="autoplay"
                    />
                </div>
            </>
        )
    };

    const thumbnailTemplate = (item: TImage) => (
        <Image
            src={item.source}
            alt={item.alt}
            width={500} // Largura base
            height={300} // Altura base (ajusta proporcionalmente)
            layout="intrinsic" // Mantém a proporção da imagem
            className="w-20 h-20 object-cover rounded-md"
        />
    );

    return (
        <div className="container mx-auto px-10 py-20">
            <h1 className="text-2xl font-semibold text-primary mb-6">Vídeos</h1>
            <Galleria
                value={images}
                numVisible={8}
                circular
                showItemNavigators
                showItemNavigatorsOnHover
                showThumbnails
                item={ItemTemplate}
                thumbnail={thumbnailTemplate}
                style={{ margin: '0 auto' }}
            />
        </div>
    );
};

