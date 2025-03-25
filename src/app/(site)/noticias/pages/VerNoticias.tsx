"use client"
import 'primeicons/primeicons.css'; // Importa ícones do PrimeReact
import Image from 'next/image'; // Para carregar imagens otimizadas no Next.js
import Notices1 from '@/assets/notice1.jpg';
import {useEffect, useState} from "react";
import {AxiosHttpClient} from "@/settings/axios";
import qs from "qs";
import ContentRenderer, {imageURLServer} from "@/lib/utils";
import moment from "moment/moment";
import {useRouter} from "next/navigation";
moment.locale("pt");

interface NewsItem {
    createdAt: string;
    title: string;
    documentId: string;
    summary: string;
    content: string;
    image?: {
        id: number;
        url: string;
        name: string;
        alternativeText: string;
        width: number;
        height: number;
        formats?: {
            medium?: { url: string };
            large?: { url: string };
        };
    };
    service?: {
        id:number;
        name: string;
        webpage: string;
        acronym: string;
    };
    tags?:[
        {
            id:number;
            name: string
        }
    ];
    category?:{
        id:number;
        documentId:string;
        Descricao: string;
    }
}

interface categoryNews {
    id: string;
    documentId: string;
    Descricao:string;
    createdAt:string;
}
export default function VerNoticias({ params }: { params: { documentId: string } }) {
    const router = useRouter(); // Substituindo useNavigate por useRouter
    const [news, setNews] = useState<NewsItem>()
    const [reticentlyNews, setReticentlyNews] = useState<NewsItem[]>([]);

    const [categoryNews, setCategoryNews] = useState<categoryNews[]>([])

    useEffect(() => {
        (async () => {
            const {documentId} = await params;
            const query = qs.stringify({
                populate: "*",
                filters: {
                    documentId: {
                        $eq: documentId,
                    }
                },
            }, {
                encodeValuesOnly: true,
            });

            AxiosHttpClient.get(`/news?${query}`).then(({data: {data}}) => {
                setNews(data[0]);
                console.log(data[0])
            });
        })()
    }, [params]);

    useEffect(() => {
        (async () => {
            AxiosHttpClient.get(`/categoria-de-noticias?`).then(({data: {data}}) => {
                setCategoryNews(data);
                console.log(data)
            });
        })()
    }, []);

    useEffect(() => {
        const query = qs.stringify(
            {
                populate: "*",
                pagination: {
                    start: 0,
                    limit: 3,
                },
                sort: ["createdAt:desc"],
            },
            {
                encodeValuesOnly: true,
            }
        );

        (async () => {
                const { data: { data } } = await AxiosHttpClient.get(`/news?${query}`);
                if (data) {
                    setReticentlyNews(data);
                }
        })();
    }, []);

    const readMore = (documentId: string) => {
        router.push(`/noticias/${documentId}`);
    };

    return (
        <div className="container">
            <div className="mb-10">
                <h1 className="text-2xl font-semibold text-primary mb-4">
                    {news ? news.title : "Carregando..."}
                </h1>
                <div className="text-sm text-gray-500 flex items-center space-x-10">
                    <p className="flex items-center">
                        <i className="pi pi-user text-primary mr-2"></i>
                       Por: {news ? news.service?.name : "MEF"}
                    </p>
                    <p className="flex items-center">
                        <i className="pi pi-calendar text-primary mr-2"></i>
                        {news ? moment(news.createdAt).format("LL") : "Carregando..."}
                    </p>
                    <p className="flex items-center">
                        <i className="pi pi-clock text-primary mr-2"></i> 10 Min Leitura
                    </p>
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="grid grid-cols-3 gap-12">
                {/* Coluna de Texto (2x) */}
                <div className="col-span-2">
                    <div className="mb-8">
                        <Image
                            src={news && news.image
                                ? `${imageURLServer}${news.image.formats?.large?.url || news.image.formats?.medium?.url || news.image.url}`
                                : "/images/ministry-logo.png"
                            }
                            alt="Imagem principal da notícia"
                            width={1212}
                            height={1212}
                            className="rounded-lg object-cover w-full"
                            layout="responsive"
                        />
                    </div>

                    {news && (
                        <>
                            <p className="font-light mb-4">{news.summary}</p>
                            <ContentRenderer key={news.documentId} content={news.content} type={"blocks"} />
                        </>
                    )}
                </div>

                {/* Coluna de Cards (1x) */}
                <div className="col-span-1 flex flex-col space-y-8">
                    <div className="bg-[#F1F1FF] p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-primary mb-4">Categorias</h4>
                        <ul className="font-light text-sm space-y-4">
                            {categoryNews.map((categoria, index) => (
                                <a key={index} href="#">
                                    <li className="flex justify-between border-b border-gray-300 py-2 efects hover:pl-5">
                                        {categoria.Descricao} <span className="text-gray-500">(3)</span>
                                    </li>
                                </a>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-[#F1F1FF] p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-primary mb-4">Notícias Recentes</h4>
                        <div className="space-y-6">
                            {reticentlyNews.map((news, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <div className="w-24 h-16 relative">
                                        <Image
                                            src={news && news.image
                                                ? `${imageURLServer}${news.image.formats?.large?.url || news.image.formats?.medium?.url || news.image.url}`
                                                : "/images/ministry-logo.png"
                                            }
                                            alt="Notícia"
                                            fill className="rounded-lg object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-light text-sm cursor-pointer">
                                            <a
                                                onClick={() => readMore(news.documentId)}
                                                className="text-primary hover:underline">{news.title.slice(0,32)}</a>
                                        </p>
                                        <p className="text-gray-500 text-xs">{news.category?.Descricao}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#F1F1FF] p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-primary mb-4">Tags Populares</h4>
                        <div className="flex flex-wrap gap-2">
                            {news?.tags?.map((tag) => (
                                <span key={tag.id} className="bg-[#5151F8] text-white px-3 py-1 rounded-full text-[12px] cursor-pointer">
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
