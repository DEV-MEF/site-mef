"use client";

import { useEffect, useState } from "react";
import { AxiosHttpClient } from "@/settings/axios";
import ContentRenderer from "@/lib/utils";
import "@/styles/react-markdown-rerender.css"
export default function WhatWeDoSection() {
  const [whatWeDo, setWhatWeDo] = useState([]);

  useEffect(() => {
    AxiosHttpClient.get("/missions?populate=*")
      .then(({ data: { data } }) => {
        if (data) {
          setWhatWeDo(data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da equipe:", error);
      });
  }, []);

  return (
    <section className="w-full rerender">
      {whatWeDo.map(({ content, id }) => {
        return <ContentRenderer key={id} content={content} type={"blocks"} />;
      })}

    </section>
  );
}
