"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { imageURLServer, NewsItem } from "@/lib/utils";
import { useRouter } from "next/navigation";
import qs from "qs";
import { AxiosHttpClient } from "@/settings/axios";
import SectionTitle from "@/components/layout/title";
import { MdDateRange } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
moment.locale("pt");

type Filters = {
  tags?: { name: { $contains: string } };
  category?: { documentId: { $eq: string } };
};

export default function AllNews() {
  const router = useRouter();

  const [params, setParams] = useState<{ [key: string]: string } | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramsObj: { [key: string]: string } = {};

    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });

    setParams(paramsObj);
  }, []);

  useEffect(() => {
    if (!params) return;

    const filters: Filters = {
      ...(params["tag"] && { tags: { name: { $contains: params["tag"] } } }),
      ...(params["category"] && {
        category: { documentId: { $eq: params["category"] } },
      }),
    };

    const query = qs.stringify(
      {
        filters: Object.keys(filters).length ? { $or: [filters] } : undefined,
        populate: "*",
        sort: ["createdAt:desc"],
      },
      { encodeValuesOnly: true }
    );

    AxiosHttpClient.get(`/news?${query}`).then(({ data: { data } }) => {
      setNews(data);
    });
  }, [params]);

  const readMore = (documentId: string) => {
    router.push(`/noticias/${documentId}`);
  };

  return (
    <section className="w-full flex- flex-col">
      <div className="w-full flex flex-col md:flex-row mb-6 gap-2 items-center justify-between">
        <div className="w-full">
          <SectionTitle text="ÚLTIMAS NOTÍCIAS" />
          <p className="text-zinc-500 mt-2 mb-4">
            Acompanhe as últimas notícias e fique sempre atualizado com as
            novidades em tempo real!
          </p>
        </div>
        <div className="w-full relative md:w-6/12 lg:w-5/12 2xl:w-4/12">
          <Input
            placeholder="Pesquisar..."
            className="w-full h-12 pl-5 pr-12 rounded-md border border-zinc-300 focus:border-primary-blue focus-visible:ring-0 focus:ring-0 focus:outline-none text-zinc-800"
          />
          <Search className="absolute right-4 top-3 cursor-pointer transition-colors placeholder:text-text-light/90 text-text-second/60 hover:text-text-second/80" />
        </div>
      </div>
      <div className="w-full py-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-8 2xl:gap-4">
          {news.map((item) => (
            <div
              key={item.documentId}
              className="bg-white shadow-[0_-10px_39px_0_rgba(8,18,109,.1)] rounded overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={
                    item && item.image
                      ? `${imageURLServer}${
                          item.image.formats?.large?.url ||
                          item.image.formats?.medium?.url ||
                          item.image.url
                        }`
                      : "/images/ministry-logo.png"
                  }
                  width={1212}
                  height={1212}
                  alt="News Image"
                  className="w-full h-[200px] md:h-[250px] object-cover"
                />
              </div>
              <div className="px-4 md:px-6 lg:px-7 py-4 flex flex-col gap-2">
                <div className="flex items-center text-text-light text-xs mb-2">
                  <MdDateRange size={16} className="mb-1 mr-1" />
                  {moment(item.createdAt, moment.ISO_8601).format("LL")}
                </div>
                <h3 className="text-text-primary font-bold text-sm mb-1">
                  {item.title.slice(0, 82)}
                </h3>
                <p className="text-text-light text-xs font-normal mb-4">
                  {item.summary?.slice(0, 98)}
                </p>
                <button
                  onClick={() => readMore(item.documentId)}
                  className="cursor-pointer text-sm w-28 my-3
                                    text-primary-blue px-4 py-2 border border-primary-blue
                                    hover:bg-primary-blue hover:text-white transition-all duration-300 ease-in-out"
                >
                  Ler Mais
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
