"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import Title from "@/components/layout/title";
import {AxiosHttpClient} from "@/settings/axios";
import qs from "qs";
import {imageURLServer} from "@/lib/utils";

interface NewsItem {
    createdAt: string;
    title: string;
    summary: string;
    image: {
        id: number,
        name: string,
        url: string,
        size: number
    };
}

export default function NewsSection() {
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const query = qs.stringify({
            sort: ['createdAt:desc'],
            pagination: {
                start: 0,
                limit: 3,
            },
            populate: "*"
        }, {
            encodeValuesOnly: true,
        });

        AxiosHttpClient.get(`/news?${query}`)
            .then(({data: {data}}) => {
                if (data) {
                    setNews(data);
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar dados da equipe:", error);
            });
    }, []);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('pt-PT', options);
        return formattedDate.replace(/de (\w+)/, (_, month) => `${month.charAt(0).toUpperCase() + month.slice(1)}`); // Capitaliza o mês
    }

    return (
        <section className="w-full container px-4 lg:px-8  py-11 md:gap-3 lg:gap-11">
            <div className="flex justify-between py-5 items-center">
                <div className="flex flex-col mb-6 gap-2">
                    <Title text="ÚLTIMAS NOTÍCIAS"/>
                    <p className="text-text-second font-light">
                        Acompanhe as últimas notícias e fique sempre atualizado com as
                        novidades em tempo real!
                    </p>
                </div>

                <div className="md:flex items-center justify-end mb-4 hidden">
                    <button className="p-2 rounded-full bg-light-gray flex justify-center mr-2">
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.293 5.293a1 1 0 010 1.414L8.414 10l3.879 3.293a1 1 11-1.293 1.414l-5-4a1 1 010-1.414l5-4a1 1 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <button className="p-2 rounded-full bg-light-gray flex justify-center">
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.707 14.707a1 1 010-1.414L11.586 10 7.707 6.707a1 1 011.293-1.414l5 4a1 1 010 1.414l-5 4a1 1 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                {news.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-[0_-10px_39px_0_rgba(8,18,109,.1)] rounded overflow-hidden"
                    >
                        <div className="relative">
                            <Image
                                width={300}
                                height={300}
                                src={item.image && item.image.url ? `${imageURLServer}${item.image.url}` : "/images/ministry-logo.png"}
                                alt="News Image"
                                className="w-full h-[200px] md:h-[250px] object-cover"
                            />
                        </div>
                        <div className="px-4 md:px-6 lg:px-7 py-4 flex flex-col gap-2">
                            <div className="flex items-center text-text-light text-xs mb-2">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6 2a1 1 0 000 2h8a1 1 0 100-2H6zM3 5a2 2 0 012-2h10a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm3 1a1 1 0 100 2h8a1 1 0 100-2H6z" />
                                </svg>
                                { formatDate(item.createdAt) }
                            </div>
                            <h3 className="text-text-primary font-bold text-sm mb-1">
                                {item.title}
                            </h3>
                            <p className="text-text-second text-xs font-normal mb-4">
                                {item.summary.slice(0,100) || "A Descrção aqui...."}
                            </p>
                            <button
                                className="text-sm w-28 my-3 text-primary-blue px-4 py-2 border border-primary-blue hover:bg-primary-blue hover:text-white">
                                Ler Mais
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}