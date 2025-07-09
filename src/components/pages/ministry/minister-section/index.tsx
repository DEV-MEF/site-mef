"use client";
import SectionTitle from "@/components/layout/title";
import ContentRenderer from "@/lib/react-markdown-renderer";
import { useEffect, useState } from "react";
import { AxiosHttpClient } from "@/settings/axios";
import TextWithImageSectionSkeleton from "@/components/layout/skeleton/text-with-image-section";

type Ministro = {
  name?: string;
  bibliography?: string;
  photo?: string;
};

export default function MinisterSection() {
  const [ministros, setMinistros] = useState<Ministro>({});
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AxiosHttpClient.get("/ministros?populate=*")
      .then(({ data: { data } }) => {
        setMinistros(data?.[0] || {});
      })
      .catch((error) => {
        setError(error instanceof Error ? error.message : "Erro desconhecido");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full flex flex-col gap-8">
      {loading ? (
        <TextWithImageSectionSkeleton />
      ) : (
        <>
          <SectionTitle text="Mensagem do Ministro" />
          <div className={"w-full mt-6 rerender"}>
            {
              <ContentRenderer
                content={ministros?.bibliography || ""}
                type={"blocks"}
              />
            }
          </div>
        </>
      )}
    </section>
  );
}
