"use client";

import { useEffect, useState } from "react";
import { AxiosHttpClient } from "@/settings/axios";
import ContentRenderer from "@/lib/utils";
import "@/styles/react-markdown-rerender.css"
import SectionTitle from "@/components/layout/title";

export default function OurteamSection() {
  const [teamSections, setTeamSections] = useState([]);

  useEffect(() => {
    AxiosHttpClient.get("/teams?populate=*")
      .then(({ data: { data } }) => {
        if (data) {
          setTeamSections(data);
          console.log("Nossa equipa", data)
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da equipe:", error);
      });
  }, []);

  return (
      <section className="w-full flex flex-col gap-8">
        <SectionTitle text="Nossa equipa"/>
        <section className="w-full rerender">
          {teamSections.map(({content, id}) => {
            return <ContentRenderer key={id} content={content} type={"blocks"}/>;
          })}
        </section>
      </section>
  );
}
