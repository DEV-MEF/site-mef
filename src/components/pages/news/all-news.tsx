"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { imageURLServer, NewsItem } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { AxiosHttpClient } from "@/settings/axios";
import SectionTitle from "@/components/layout/title";
import { MdDateRange } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { RiSearchLine } from "react-icons/ri";
import PaginationComponent from "./pagination";
import { X } from "lucide-react";

moment.locale("pt");

type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export default function AllNews() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = 6;

    const filters = {
      ...(searchParams.get("tag") && {
        tags: { name: { $contains: searchParams.get("tag") } },
      }),
      ...(searchParams.get("category") && {
        category: { documentId: { $eq: searchParams.get("category") } },
      }),
      ...(searchParams.get("search") && {
        title: { $contains: searchParams.get("search") },
      }),
      ...(searchParams.get("search") && {
        summary: { $contains: searchParams.get("search") },
      }),
    };

    const query = qs.stringify(
      {
        filters: Object.keys(filters).length ? { $or: [filters] } : undefined,
        populate: "*",
        sort: ["createdAt:desc"],
        pagination: { page, pageSize },
      },
      { encodeValuesOnly: true }
    );

    AxiosHttpClient.get(`/news?${query}`)
      .then(({ data: { data, meta } }) => {
        setNews(data);
        setMeta(meta);
      })
      .catch((error) => {
        console.error("Erro ao buscar notícias:", error);
      });
  }, [searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const applySearch = () => {
    //const newParams = new URLSearchParams(window.location.search);
    const newParams = new URLSearchParams();

    if (search.trim()) {
      newParams.set("search", search);
      newParams.set("page", "1");
    } else {
      newParams.delete("search");
    }

    router.push(`/publicacoes/noticias?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const deleteSearch = () => {
    setSearch("");
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete("search");
    router.push(`/publicacoes/noticias`, {
      scroll: false,
    });
  };

  const readMore = (documentId: string) => {
    router.push(`/publicacoes/noticias/${documentId}`);
  };

  return (
    <section className="w-full flex flex-col">
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
            onChange={handleSearch}
            onKeyDown={(e) => e.key === "Enter" && applySearch()}
            placeholder="Pesquisar..."
            className={`${
              search ? "pl-9" : "pl-5"
            } w-full h-12  pr-12 rounded-md border border-zinc-300 focus:border-primary-blue transition-all duration-100 focus-visible:ring-0 focus:ring-0 focus:outline-none text-zinc-800`}
          />
          {search && (
            <X
              onClick={() => deleteSearch()}
              className="absolute w-5 text-red-400 hover:text-red-500 left-3 top-3 cursor-pointer transition-colors"
            />
          )}
          <RiSearchLine
            size={24}
            onClick={applySearch}
            className="absolute right-4 top-3 cursor-pointer transition-colors placeholder:text-text-light/90 text-text-second/60 hover:text-text-second/80"
            title="Pesquisar notícias"
          />
        </div>
      </div>

      <div className="w-full py-3 mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-8 2xl:gap-4">
          {news.map((item) => (
            <div
              key={item.documentId}
              className="bg-white shadow-[0_-10px_39px_0_rgba(8,18,109,.1)] rounded overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={
                    item?.image
                      ? `${imageURLServer}${
                          item.image.formats?.large?.url ||
                          item.image.formats?.medium?.url ||
                          item.image.url
                        }`
                      : "/images/ministry-logo.png"
                  }
                  width={1212}
                  height={1212}
                  unoptimized
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
                  className="cursor-pointer text-sm w-28 my-3 text-primary-blue px-4 py-2 border border-primary-blue hover:bg-primary-blue hover:text-white transition-all duration-300 ease-in-out"
                >
                  Ler Mais
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {meta && <PaginationComponent pagination={meta.pagination} />}
    </section>
  );
}
