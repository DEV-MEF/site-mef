"use client";
import SectionTitle from "@/components/layout/title";
import ContentRenderer from "@/lib/react-markdown-renderer";
import { useEffect, useState } from "react";
import { AxiosHttpClient } from "@/settings/axios";

type Ministro = {
    name?: string
    bibliography?: string
    photo?: string
}

export default function MinisterSection() {
    const [ministros, setMinistros] = useState<Ministro>({});
    useEffect(() => {
        AxiosHttpClient.get("/ministros?populate=*").then(({data : {data}}) => {
            setMinistros(data?.[0] || {})
        })
    }, []);
  return (
    <section className="w-full flex flex-col gap-8">
      <SectionTitle text="O MINISTRO" />
        <div className={"w-full mt-6"}>
            {
                <ContentRenderer content={ministros?.bibliography || ""} type={"blocks"} />
            }
        </div>
    </section>
  );
}
