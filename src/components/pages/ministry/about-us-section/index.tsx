"use client";
import SectionTitle from "@/components/layout/title";
import ContentRenderer from "@/lib/react-markdown-renderer";
import { useEffect, useState } from "react";
import { AxiosHttpClient } from "@/settings/axios";
import "@/styles/react-markdown-rerender.css";
import TextSectionSkeleton from "@/components/layout/skeleton/text-section";

export default function AboutUsSection() {
  const [aboutUsData, setAboutUsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      AxiosHttpClient.get("/abouts?populate=*").then(({ data: { data } }) => {
        setAboutUsData(data);
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <section className="w-full flex flex-col gap-8">
      {isLoading ? (
        <TextSectionSkeleton />
      ) : (
        <>
          <SectionTitle text="SOBRE NÓS" />
          <div className={"w-full mt-2 rerender"}>
            {aboutUsData.map(({ content, id }) => {
              return (
                <ContentRenderer key={id} content={content} type={"blocks"} />
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
