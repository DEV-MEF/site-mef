"use client";
import "primeicons/primeicons.css"; // Importa ícones do PrimeReact
import Image from "next/image"; // Para carregar imagens otimizadas no Next.js
import { useEffect, useState } from "react";
import { AxiosHttpClient } from "@/settings/axios";
import qs from "qs";
import ContentRenderer, {
  CategoryNews,
  imageURLServer,
  NewsItem,
} from "@/lib/utils";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import Banner from "../banner";

moment.locale("pt");

interface CountFileInFolder {
  [k: string]: number;
}

export default function SingularNews({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem>();
  const [reticentlyNews, setReticentlyNews] = useState<NewsItem[]>([]);
  const [listCountByDocumentId, setListCountByDocumentId] =
    useState<CountFileInFolder>({});
  const [categoryNews, setCategoryNews] = useState<CategoryNews[]>([]);

  // carregamento de noticia
  useEffect(() => {
    (async () => {
      const { documentId } = await params;
      const query = qs.stringify(
        {
          populate: "*",
          filters: {
            documentId: {
              $eq: documentId,
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );

      const {
        data: { data },
      } = await AxiosHttpClient.get(`/news?${query}`);
      setNews(data[0]);
    })();
  }, [params]);

  // categorias de notícias
  useEffect(() => {
    (async () => {
      await AxiosHttpClient.get(`/categoria-de-noticias`).then(
        ({ data: { data } }) => {
          setCategoryNews(data);
        }
      );
    })();
  }, []);

  // noticias recentes
  useEffect(() => {
    const query = qs.stringify(
      {
        pagination: {
          start: 0,
          limit: 3,
        },
        populate: "*",
        sort: ["createdAt:desc"],
      },
      {
        encodeValuesOnly: true,
      }
    );

    (async () => {
      const {
        data: { data },
      } = await AxiosHttpClient.get(`/news?${query}`);
      if (data) {
        setReticentlyNews(data);
      }
    })();
  }, []);

  // contagem de notícias por categorias
  useEffect(() => {
    if (categoryNews.length === 0) return;

    const fetchCounts = async () => {
      const updatedCounts: CountFileInFolder = {};

      await Promise.all(
        categoryNews.map(async ({ documentId }) => {
          const query = qs.stringify(
            {
              pagination: { limit: 1 },
              filters: {
                category: {
                  documentId: {
                    $eq: documentId,
                  },
                },
              },
              sort: ["createdAt:desc"],
            },
            { encodeValuesOnly: true }
          );

          const {
            data: { meta },
          } = await AxiosHttpClient.get(`/news?${query}`);
          updatedCounts[documentId] = meta.pagination.total;
        })
      );

      setListCountByDocumentId(updatedCounts);
    };

    fetchCounts();
  }, [categoryNews]);

  const readMore = (documentId: string) => {
    router.push(`/publicacoes/noticias/${documentId}`);
  };

  const filterNews = (tag: string, category: string) => {
    router.push(`/publicacoes/noticias/?tag=${tag}&category=${category}`);
  };

  return (
    <div className="w-full">
      <Banner
        text_1="Publicações"
        text_2="Notícias"
        link_1="/publicacoes"
        text_3={news?.title}
        link_2="/publicacoes/noticias"
      />

      <section className="w-full container max-w-[88rem] mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
            {news ? news.title : "Carregando..."}
          </h1>
          <div className="text-sm text-gray-500 flex items-center space-x-6">
            <p className="flex items-center">
              <i className="pi pi-user text-primary mr-2 text-primary-blue" />
              Por: {news ? news.service?.name : "MEF"}
            </p>
            <p className="flex items-center">
              <i className="pi pi-calendar text-primary mr-2 text-primary-blue" />
              {news ? moment(news.createdAt).format("LL") : "Carregando..."}
            </p>
            <p className="flex items-center">
              <i className="pi pi-clock text-primary mr-2 text-primary-blue"></i>{" "}
              10 Min Leitura
            </p>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="w-full flex flex-col md:flex-row gap-12">
          {/* Coluna de Texto (2x) */}
          <div className="w-full lg:w-8/12">
            <div className="mb-8">
              <Image
                src={
                  news && news.image
                    ? `${imageURLServer}${
                        news.image.formats?.large?.url ||
                        news.image.formats?.medium?.url ||
                        news.image.url
                      }`
                    : "/images/ministry-logo.png"
                }
                alt="Imagem principal da notícia"
                width={1212}
                height={1212}
                className="rounded-lg object-cover w-full"
                layout="responsive"
                unoptimized
              />
            </div>

            {news && (
              <>
                <p className="font-light mb-4">{news.summary}</p>
                <ContentRenderer
                  key={news.documentId}
                  content={news.content}
                  type={"blocks"}
                />
              </>
            )}

            {news?.attaches?.map((item) => (
              <a
                key={item.documentId}
                href={imageURLServer + item.url}
                target={"_blank"}
              >
                <li className="flex justify-between border-b border-gray-300 py-2 cursor-pointer efects hover:pl-5">
                  {item.name} <span className="text-gray-500"></span>
                </li>
              </a>
            ))}
          </div>

          {/* Coluna de Cards (1x) */}
          <div className="col-span-2 flex flex-col space-y-8">
            <div className="bg-[#f1f1ffd7] p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-primary mb-4">
                Categorias
              </h4>
              <ul className="font-light text-sm space-y-4 cursor-pointer">
                {categoryNews.map((categoria, index) => (
                  <a
                    key={index}
                    onClick={() => filterNews("", categoria.documentId)}
                  >
                    <li className="flex justify-between border-b border-gray-300 py-2 efects hover:pl-5">
                      {categoria.Descricao}{" "}
                      <span className="text-gray-500">
                        {listCountByDocumentId[categoria.documentId]}
                      </span>
                    </li>
                  </a>
                ))}
              </ul>
            </div>

            <div className="bg-[#f1f1ffd7] p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-primary mb-4">
                Notícias Recentes
              </h4>
              <div className="space-y-6">
                {reticentlyNews.map((news, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-24 h-16 relative">
                      <Image
                        unoptimized
                        src={
                          news && news.image
                            ? `${imageURLServer}${
                                news.image.formats?.large?.url ||
                                news.image.formats?.medium?.url ||
                                news.image.url
                              }`
                            : "/images/ministry-logo.png"
                        }
                        alt="Notícia"
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-light text-sm cursor-pointer">
                        <a
                          onClick={() => readMore(news.documentId)}
                          className="text-primary hover:underline"
                        >
                          {news.title.slice(0, 32)}
                        </a>
                      </p>
                      <p className="text-gray-500 text-xs">
                        {news.category?.Descricao}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F1F1FF] p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-primary mb-4">
                Tags Populares
              </h4>
              <div className="flex flex-wrap gap-2">
                {news?.tags?.map((tag) => (
                  <span
                    onClick={() => filterNews(tag.name, "")}
                    key={tag.id}
                    className="bg-[#5151F8] text-white px-3 py-1 rounded-full text-[12px] cursor-pointer"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
