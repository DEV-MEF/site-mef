"use client";

import { useEffect, useState } from "react";
import { AxiosHttpClient } from "@/settings/axios";
import ContentRenderer from "@/lib/utils";
import "@/styles/react-markdown-rerender.css";
import SectionTitle from "@/components/layout/title";
import TextSectionSkeleton from "@/components/layout/skeleton/text-section";
export default function WhatWeDoSection() {
  const [whatWeDo, setWhatWeDo] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    AxiosHttpClient.get("/missions?populate=*")
      .then(({ data: { data } }) => {
        if (data) {
          setWhatWeDo(data);
        }
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
        <TextSectionSkeleton />
      ) : (
        <>
          <SectionTitle text="O que fazemos" />
          <section className="w-full rerender">
            {whatWeDo.map(({ content, id }) => {
              return (
                <ContentRenderer key={id} content={content} type={"blocks"} />
              );
            })}
          </section>
        </>
      )}
    </section>
  );
}
