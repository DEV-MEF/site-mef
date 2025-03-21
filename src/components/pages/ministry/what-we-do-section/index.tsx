"use client";


import {useEffect, useState} from "react";
import {AxiosHttpClient} from "@/settings/axios";
import ContentRenderer from "@/lib/utils";

export default function WhatWeDoSection() {

    const [WhatWeDo, setWhatWeDo] = useState([]);

    useEffect(() => {
        AxiosHttpClient.get("/missions?populate=*")
            .then(({data: {data}}) => {
                if (data) {
                    setWhatWeDo(data);
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar dados da equipe:", error);
            });
    }, []);

  return (
    <section>

        {
            WhatWeDo.map(({content, id}) => {
                return <ContentRenderer key={id} content={content} type={"blocks"} />
            })
        }

      {/*<h1 className="text-md font-semibold text-light mb-6">O QUE FAZEMOS</h1>
      <h2 className="text-md font-semibold text-light mb-6">
        Ministério da Economia e Finanças de São Tomé e Príncipe tem a seguinte
        missão:
      </h2>
      <p className="font-light text-justify leading-loose mb-8 text-sm ">
        * Propor, formular, conduzir, executar e avaliar a política financeira
        do Governo, promovendo a gestão racional dos recursos financeiros e
        patrimoniais públicos e o equilíbrio interno e externo das contas
        públicas, bem como a inspecção-geral e fiscalização das finanças
        públicas;
      </p>

      <p className="font-light text-justify leading-loose mb-8 text-sm">
        * Acompanhar a política financeira do Estado nos domínios orçamental,
        monetário e creditício, e a política económica em colaboração com o
        Banco Central;
      </p>

      <p className="font-light text-justify leading-loose text-sm">
        * Assegurar a relação institucional do Governo com as Câmaras Distritais
        e representar o Estado São-tomense junto das instituições financeiras
        regionais e internacionais.
      </p>*/}
    </section>
  );
}
