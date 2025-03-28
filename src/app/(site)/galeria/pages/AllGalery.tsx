"use client"
import Image from 'next/image';
import {useEffect, useState} from "react";
import {AxiosHttpClient} from "@/settings/axios";
import {imageURLServer} from "@/lib/utils";
import {useRouter} from "next/navigation";

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

export default function AllGalery() {
    const route = useRouter();
    const [colecao, setColecao] = useState<TImageApi[]>();
    useEffect(() => {
        (async () => {
            AxiosHttpClient.get(`/galleries?&populate=*`).then(({data : {data}}) => {
                setColecao(data);
            });
        })()
    }, []);

    return (
        <div className="">
            <div className="flex flex-col mb-6 gap-2">
                <h2 className="font-bold text-[16px] text-primary-blue">Galeria</h2>
                <p className='text-text-second font-light'>Veja a nossa Galeria e acompanhe as nossas actividades!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                {
                    colecao?.map((value, index) => {
                        return <div key={index} className="relative w-full h-72 md:h-72 lg:h-72 rounded overflow-hidden shadow-md" onClick={() => {
                            route.push(`/galeria/${value.documentId}`)
                        }}>
                            <Image src={imageURLServer+(value.cover?.formats?.medium || value.cover).url} alt="Vídeo Principal" fill className="rounded object-cover" />

                            <div className="absolute bottom-0 flex flex-col items-start">
                                <div className="bg-primary-blue text-white text-xs px-4 py-2 md:mx-3 lg:mx-5 mx-5 font-semibold">
                                    Galeria
                                </div>
                                <div className="md:mt-2 mt-1 cursor-pointer text-white font-light md:text-[14px] lg:text-[14px] text-[14px] bg-dark-gray bg-opacity-40 md:px-3 lg:px-5 md:py-3 lg:py-5 py-2 px-5">
                                    {value.description || ""}
                                    <small className='text-text-light font-semibold mt-3 block'>{value.medias.length} Foto{value.medias.length === 1 ? "" : "s"}</small>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>

    );
}
