"use client";
import "primeicons/primeicons.css";
import { useServicos } from "@/components/contexts/servicos";
import ContentRenderer from "@/lib/utils";
import { twMerge } from "tailwind-merge";
import "@/styles/react-markdown-rerender.css";
import Banner from "@/components/pages/banner";

export default function Servicos() {
  const { direcoes, selectedDirecao, setSelectedDirecao } = useServicos();
  
  return (
    <main className="w-full mb-20">
      <Banner text_1="Instituições" text_2={selectedDirecao.name} link_1="/instituicoes" />
      <section className="w-full container max-w-[88rem] mx-auto px-4">
        <div className="container mx-auto py-20">
          <div className="grid grid-cols-3 gap-12">
            <div className="col-span-2 w-full rerender">
              {
                <ContentRenderer
                  content={selectedDirecao?.content || ""}
                  type={"blocks"}
                />
              }
            </div>
            <div className="col-span-1 flex flex-col space-y-8">
              <div className="p-8 rounded-lg shadow-[0_-10px_39px_0_rgba(8,18,109,.1)] flex flex-col items-start space-y-4">
                <div className="text-primary ">
                  <i
                    className="pi pi-folder-open text-dark-gray"
                    style={{ fontSize: "2.5rem", color: "#5856D6" }}
                  ></i>
                </div>
                <h4 className="text-lg font-semibold text-light">Documentos</h4>

                <a
                  href="#"
                  className="text-primary-blue font-semibold text-sm hover:underline "
                >
                  » Serviço de Directório Online
                </a>
                <p className="font-light text-sm text-justify mb-2 text-text-primary">
                  Disponibilizamos um conjunto de documentos úteis online para
                  consulta e transferência.
                </p>
              </div>

              <div className="bg-[#3A3B7B] text-white p-8 rounded-lg shadow-[0_-10px_39px_0_rgba(8,18,109,.1) flex flex-col items-start space-y-4">
                <div className="text-primary text-3xl">
                  <i
                    className="pi pi-building"
                    style={{ fontSize: "3rem" }}
                  ></i>
                </div>
                <h4 className="text-lg font-semibold">Instituições</h4>
                <ul className="text-sm space-y-2">
                  {direcoes?.map((value, index) => (
                    <li key={index}>
                      <a
                        href={`#${(value.acronym || "").toLowerCase()}`}
                        className={twMerge(
                          "hover:underline font-semibold",
                          value.documentId !== selectedDirecao?.documentId
                            ? "font-light"
                            : ""
                        )}
                        onClick={() => {
                          setSelectedDirecao(value);
                        }}
                      >
                        » {value.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
