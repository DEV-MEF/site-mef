"use client"
import Image from 'next/image';
import fundo from '@/assets/fundoPages.png';
import 'primeicons/primeicons.css';
import {useServicos} from "@/components/contexts/servicos";
import ContentRenderer from "@/lib/utils";
import {twMerge} from "tailwind-merge";


export default function Servicos() {
    const {direcoes, selectedDirecao, setSelectedDirecao} = useServicos();

  return (
    <div className='mb-20'>
        <div className="relative w-full h-[300px]"> {/* Define o tamanho desejado */}
            {/* Imagem com opacidade sobreposta */}
            <Image
                src={fundo}
                alt="Fundo Sobre Nós"
                fill className="object-cover"
                quality={100}
            />
            {/* Camada de opacidade */}
            <div
                className="absolute inset-0 bg-[#3A3B7B] opacity-50"
                aria-hidden="true"
            ></div>
            {/* Texto sobre a imagem */}
            <div className="absolute inset-0 flex items-center px-44 py-56">
                <h1 className="text-white text-3xl font-bold">Serviços <small className='font-light'>» {selectedDirecao.name || ""}</small></h1>
            </div>
        </div>

        <div className="container mx-auto px-44 py-20">
      <div className="grid grid-cols-3 gap-12">

        <div className="col-span-2">
            {<ContentRenderer content={selectedDirecao?.content || ""} type={"blocks"} />}
        </div>
        <div className="col-span-1 flex flex-col space-y-8">

          <div className="p-8 rounded-lg shadow-[0_-10px_39px_0_rgba(8,18,109,.1)] flex flex-col items-start space-y-4">

            <div className="text-primary " >
              <i className="pi pi-folder-open text-dark-gray" style={{ fontSize: '2.5rem', color: '#5856D6' }}></i>
            </div>
            <h4 className="text-lg font-semibold text-light">Documentos</h4>

            <a href="#" className="text-primary-blue font-semibold text-sm hover:underline ">
              » Serviço de Directório Online
            </a>
            <p className="font-light text-sm text-justify mb-2 text-text-primary">Disponibilizamos um conjunto de documentos úteis online para consulta e transferência.</p>
          </div>

          <div className="bg-[#3A3B7B] text-white p-8 rounded-lg shadow-[0_-10px_39px_0_rgba(8,18,109,.1) flex flex-col items-start space-y-4">

            <div className="text-primary text-3xl">
              <i className="pi pi-building" style={{ fontSize: '3rem' }}></i>
            </div>
            <h4 className="text-lg font-semibold">Serviços</h4>
            <ul className="text-sm space-y-2">
                {
                    direcoes?.map((value, index) => <li key={index}>
                        <a href={`#${value.acronym || ""}`}
                           className={twMerge("hover:underline font-semibold", value.documentId !== selectedDirecao?.documentId ? "font-light" : "")}
                           onClick={() => {
                               setSelectedDirecao(value)
                           }}
                        >
                            » {value.name}
                        </a>
                    </li>)
                }
              {/*<li>
                <a href="#" className="hover:underline font-light">
                  » Direcção de Orçamento
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline font-light">
                 »  Direcção do Património
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline font-light">
                 » Direcção dos Impostos
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline font-light">
                  » Direcção de Contabilidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline font-light">
                 »  Direcção de Tecnologia de Informação
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline font-light">
                 » Direcção das Alfândegas
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline font-light">
                  » Direcção do Planeamento
                </a>
              </li>*/}
            </ul>
          </div>
        </div>
      </div>
    </div>



    </div>
  );
}
