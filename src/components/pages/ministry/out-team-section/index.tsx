"use client";

import { useEffect, useState } from "react";
import { AxiosHttpClient } from "@/settings/axios";
import ContentRenderer from "@/lib/utils";
import "@/styles/react-markdown-rerender.css";
import SectionTitle from "@/components/layout/title";
import TextSectionSkeleton from "@/components/layout/skeleton/text-section";

export default function OurteamSection() {
  const [teamSections, setTeamSections] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    AxiosHttpClient.get("/teams?populate=*")
      .then(({ data: { data } }) => {
        if (data) {
          setTeamSections(data);
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
          <SectionTitle text="Nossa equipa" />
          <section className="w-full rerender">
            {teamSections.map(({ content, id }) => {
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
