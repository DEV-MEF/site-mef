"use client"
import Image from 'next/image';
import Notices from '@/assets/notice1.jpg';
import {useEffect, useState} from "react";
import {AxiosHttpClient} from "@/settings/axios";
import {useRouter} from "next/navigation";
import {imageURLServer} from "@/lib/utils";
type ImageType = {
    name: string
    documentId: string
    url: string
    alternativeText: string
    formats: {[k in ("large" | "medium" | "small")]: ImageType}
}

type TImageApi = {
    documentId: string,
    description: string,
    url: string
    medias: ImageType[]
    cover: ImageType
};

export default function Multimedia() {
    const [multimedia, setMultimedia] = useState<TImageApi[]>();
    const route = useRouter();
    useEffect(() => {
        (async () => {
            AxiosHttpClient.get(`/towatches?&populate=*`).then(({data : {data}}) => {
                setMultimedia(data);
            });
        })()
    }, []);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {
                multimedia?.map((value, index) => {
                    console.log({value})
                    return <div key={index} className="relative w-full h-72 md:h-72 lg:h-80 rounded overflow-hidden shadow-md"
                                onClick={() => {
                                    route.push(`/videos/${value.documentId}`)
                                }}
                    >
                        <Image src={ value.cover
                            ? `${imageURLServer}
                            ${
                                value.cover.formats?.large?.url ||
                                value.cover.formats?.medium?.url ||
                                value.cover.url
                            }`
                            : "/images/ministry-logo.png"} alt="Vídeo Principal" fill className="rounded object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button className="bg-white rounded-full shadow-lg hover:bg-gray-100 transition">
                                <svg className="w-16 h-16 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="absolute bottom-0 flex flex-col items-start">
                            <div className="bg-primary-blue text-white text-xs px-4 py-2 md:mx-3 lg:mx-16 mx-5 font-light">
                                VÍDEOS DO MINISTÉRIO
                            </div>
                            <div className="md:mt-2 mt-1 text-white font-light md:text-[14px] lg:text-[16px] text-[14px] bg-dark-gray bg-opacity-40 md:px-3 lg:px-16 md:py-3 lg:py-5 py-2 px-5">
                                {value.description}
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
}
