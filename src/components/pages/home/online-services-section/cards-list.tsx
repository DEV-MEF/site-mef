"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Card from "./card";
import { useEffect, useState } from "react";
import qs from "qs";
import { AxiosHttpClient } from "@/settings/axios";
import { imageURLServer } from "@/lib/utils";

interface ServiceItem {
  id: number;
  description: string;
  createdAt: string;
  name: string;
  link: string;
  logo: {
    id: number;
    url: string;
    name: string;
    alternativeText: string;
    width: number;
    height: number;
    formats: {
      medium: {
        url: string;
        name: string;
        size: number;
        mime: string;
      };
      large: {
        url: string;
        name: string;
        size: number;
        mime: string;
      };
    };
  };
}

export default function CardsList() {
  const [service, setService] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const query = qs.stringify(
      {
        populate: "*",
        filters: {
          type: "Serviço",
        },
      },
      { encodeValuesOnly: true }
    );

    (async () => {
      AxiosHttpClient.get(`/onlines?${query}`).then(({ data: { data } }) => {
        if (data) {
          setService(data);
        }
      });
    })();
  }, []);

  return (
    <Carousel className="md:pr-14 w-full relative -mt-4">
      {/* Controles de navegação agrupados no canto superior direito */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center -space-x-16">
          <CarouselPrevious className="relative hidden md:flex items-center justify-center text-white bg-primary-blue cursor-pointer hover:bg-primary-blue/90 w-8 h-8 rounded-full" />
          <CarouselNext className="relative hidden md:flex items-center justify-center text-white bg-primary-blue cursor-pointer hover:bg-primary-blue/90 w-8 h-8 rounded-full" />
        </div>
      </div>

      <CarouselContent className="w-full flex flex-row gap-8">
        {service.map((item) => (
          <CarouselItem
            className="pl-1 basis-1/2 md:basis-2/4 lg:basis-2/8 xl:basis-1/5 h-[220px] pt-5"
            key={item.id}
          >
            <Card
              imagePath={
                item.logo?.formats?.large?.url
                  ? `${imageURLServer}${item.logo.formats.large.url}`
                  : `${imageURLServer}${item.logo.url}`
              }
              title={item.name}
              href={item.link || "#"}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
