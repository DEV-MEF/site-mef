"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Title from "@/components/layout/title";
import { AxiosHttpClient } from "@/settings/axios";
import qs from "qs";
import { imageURLServer, NewsItem } from "@/lib/utils";
import moment from "moment";
import "moment/locale/pt";
import { MdDateRange } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { HomeNewsSkeleton } from "@/components/layout/skeleton/home-news";
moment.locale("pt");

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = qs.stringify(
      {
        populate: "*",
        pagination: {
          start: 0,
          limit: 4,
        },
        sort: ["createdAt:desc"],
      },
      {
        encodeValuesOnly: true,
      }
    );

    (async () => {
      setLoading(true);
      try {
        const {
          data: { data },
        } = await AxiosHttpClient.get(`/news?${query}`);
        if (data) {
          setNews(data);
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Erro ao carregar notícias"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const readMore = (documentId: string) => {
    router.push(`/publicacoes/noticias/${documentId}`);
  };

  return (
    <section className="w-full max-w-[88rem] container px-4 py-11 md:gap-3 lg:gap-11">
      <div className="flex justify-between py-5 items-center">
        <div className="flex flex-col mb-6 gap-2">
          <Title text="ÚLTIMAS NOTÍCIAS" />
          <p className="text-text-second font-light">
            Acompanhe as últimas notícias e fique sempre atualizado com as
            novidades em tempo real!
          </p>
        </div>
      </div>

      {loading ? (
        <HomeNewsSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-4">
          {news.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-[0_-10px_39px_0_rgba(8,18,109,.1)] rounded overflow-hidden"
            >
              <div className="relative">
                <Image
                  width={300}
                  height={300}
                  unoptimized
                  src={
                    item.image?.formats?.large?.url
                      ? `${imageURLServer}${item.image.formats.large.url}`
                      : item.image?.formats?.medium?.url
                      ? `${imageURLServer}${item.image.formats.medium.url}`
                      : item.image?.url
                      ? `${imageURLServer}${item.image.url}`
                      : "/images/ministry-logo.png"
                  }
                  alt={item.image?.alternativeText || "Imagem da notícia"}
                  className="w-full h-[200px] md:h-[250px] object-cover"
                />
              </div>
              <div className="px-4 md:px-6 lg:px-7 py-3 flex flex-col gap-2">
                <div className="flex items-center text-text-light/90 text-xs mb-2">
                  <MdDateRange size={16} className="mb-1 mr-1" />
                  {moment(item.createdAt, moment.ISO_8601).format("LL")}
                </div>
                <h3 className="text-text-primary font-bold text-sm mb-1">
                  {item.title.slice(0, 82)}
                </h3>
                <p className="text-text-second text-xs font-normal mb-4">
                  {item.summary?.slice(0, 93) || "A Descrição aqui...."}
                </p>
                <button
                  onClick={() => readMore(item.documentId)}
                  className="text-sm w-28 my-3 transition-colors ease-in-out duration-300 text-primary-blue cursor-pointer px-4 py-2 border border-primary-blue hover:bg-primary-blue hover:text-white"
                >
                  Ler Mais
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link
        href="/publicacoes/noticias"
        className="text-sm hover:underline flex items-center transition-colors text-primary-blue/80 mt-10"
      >
        Todas as notícias
        <ChevronsRight className="h-4 w-4 ml-1 " />
      </Link>
    </section>
  );
}
