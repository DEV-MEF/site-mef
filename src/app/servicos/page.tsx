// import Banner from "@/components/pages/banner";

// export default function Services() {
//   return (
//     <main className="w-full">
//       <Banner text_1="Início" text_2="Serviços" link_1="/" />
//       <section className="w-full max-w-[88rem] container px-4 flex flex-col items-start justify-center mt-8 mx-auto">
//         <h1>Serviços</h1>
//       </section>
//     </main>
//   );
// }

// app/servicos/page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { AxiosHttpClient } from "@/settings/axios";
import qs from "qs";
import { imageURLServer } from "@/lib/utils";
import Banner from "@/components/pages/banner";
import SectionTitle from "@/components/layout/title";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function ServicosPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  //ServicesListSkeleton
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

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
      setLoading(true);
      try {
        AxiosHttpClient.get(`/onlines?${query}`).then(({ data: { data } }) => {
          if (data) {
            setServices(data);
            console.log("Online Services Data:", data);
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <main className="w-full">
      <Banner text_1="Início" text_2="Serviços" link_1="/" />
      <div className="w-full container px-4 max-w-[88rem] my-16 mx-auto">
        <SectionTitle text="Serviços Online" />
        <p className="text-zinc-500 mt-2 mb-4">
          Confira abaixo a lista de serviços online disponíveis. Clique no
          serviço para acessar diretamente a página correspondente.
        </p>
      </div>

      {loading ? (
        <section className="w-full container px-4 max-w-[88rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto pb-32">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Card
              key={idx}
              className="h-80 border-accent rounded-xl transition hover:shadow-lg p-0"
            >
              <CardHeader className="w-full p-0">
                <Skeleton className="w-full h-32 rounded-xl rounded-br-none rounded-bl-none" />
              </CardHeader>
              <CardContent>
                <Skeleton className="w-1/2 h-5 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-3/4 h-4" />
              </CardContent>
            </Card>
          ))}
        </section>
      ) : (
        <section className="w-full min-h-[700px] container px-4 max-w-[88rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto pb-32">
          {services.map((service) => {
            const imageUrl = service.logo?.formats?.large?.url
              ? `${imageURLServer}${service.logo.formats.large.url}`
              : `${imageURLServer}${service.logo.url}`;

            return (
              <Link
                key={service.id}
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="border-accent transition hover:shadow-lg h-80 cursor-pointer p-0">
                  <CardHeader className="w-full p-0">
                    <div className="w-full h-40 relative rounded-xl rounded-br-none rounded-bl-none p-0 bg-primary-blue/20">
                      <Image
                        src={`${imageUrl}`}
                        alt={service.name}
                        width={1000}
                        height={1000}
                        className="w-full object-cover h-full rounded-xl rounded-br-none rounded-bl-none"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg mb-3 text-primary-blue">
                      {service.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground text-zinc-700">
                      {service.description || "Sem descrição disponível."}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </section>
      )}
    </main>
  );
}
