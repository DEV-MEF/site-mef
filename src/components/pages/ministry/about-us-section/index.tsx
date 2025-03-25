"use client";
import SectionTitle from "@/components/layout/title";
import ContentRenderer from "@/lib/react-markdown-renderer";
import { useEffect, useState } from "react";
import { AxiosHttpClient } from "@/settings/axios";
import "@/styles/react-markdown-rerender.css"
export default function AboutUsSection() {
  const [aboutUsData, setAboutUsData] = useState([]);
  useEffect(() => {
    AxiosHttpClient.get("/abouts?populate=*").then(({ data: { data } }) => {
      setAboutUsData(data);
      console.log("dados", data);
    });
  }, []);
  return (
    <section className="w-full flex flex-col gap-8">
      <SectionTitle text="SOBRE NÓS" />
      <div className={"w-full mt-2 rerender"}>
        {aboutUsData.map(({ content, id }) => {
          return <ContentRenderer key={id} content={content} type={"blocks"} />;
        })}
      </div>
    </section>
  );
}
