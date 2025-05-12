"use client";
import { useServicos } from "@/components/contexts/servicos";
import { PdfViewer } from "@/lib/pdf-viewer";
import React from "react";
/*import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';*/

const Footer = () => {
  const { ministerio, contato } = useServicos();
  return (
    <footer className="w-full bg-[#2f353d] text-white min-h-[210px] pt-14 pb-6">
      <div className="container max-w-[88rem]  mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
        {/* Seção da Logo e Informações */}
        {/* <div className="flex flex-col mb-8 md:mb-0">
          <p className="leading-8 text-xs font-light">
            {/* Copyright © 2024 {ministerio.name}
            <br />
            {contato.location} */}
        {/* <br />
            Caixa Postal nº 168
            <br /> */}
        {/* São Tomé e Príncipe
            <br />
            Todos direitos Reservados 
          </p>

          {/* Ícones de Redes Sociais 
          <div className="flex space-x-4 mt-4">
            {/*<a href="#" aria-label="Instagram"><FaInstagram className="text-xl hover:text-gray-400" /></a>
            <a href="#" aria-label="Twitter"><FaTwitter className="text-xl hover:text-gray-400" /></a>
            <a href="#" aria-label="Facebook"><FaFacebook className="text-xl hover:text-gray-400" /></a>
            <a href="#" aria-label="YouTube"><FaYoutube className="text-xl hover:text-gray-400" /></a>
          </div>
        </div> */}

        {/* Seção de Contato */}
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:-mt-9">
            <h2 className="text-lg font-semibold uppercase">
              Nossa Localização
            </h2>
            <div className="mt-4 space-y-2 text-zinc-300">
              <p className="text-sm">
                Ministério do Planeamento, Finanças e Economia Azul, Largo das
                Alfândegas
              </p>
              <p className="text-sm">Água Grande, São Tomé</p>
              <p className="text-sm">Caixa Postal nº 168</p>
              <p className="text-sm">São Tomé e Príncipe</p>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <h2 className="text-lg font-semibold">FALE CONNOSCO</h2>
            <p className="mt-2 leading-8 gap-4 text-sm font-light text-zinc-300">
              Par qualquer informação ou solicitação dos nossos serviços.
            </p>
            <div className="mt-6 space-y-3">
              <h3 className="text-md"> Nossos contatos:</h3>
              <div className="space-y-2">
                <p className="text-sm text-zinc-300">
                  Liga-nos: {contato.phone} / {contato.tel}
                </p>
                <p className="text-sm text-zinc-300"> Email: {contato.mail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Linha de separação e Crédito */}
      <div className="w-full max-w-[88rem] mx-auto container px-4 mt-8 flex flex-col gap-8 items-center justify-center text-sm text-zinc-300 pt-8">
        {/* Website Desenvolvido e Hospedado pela{" "}
        <span className="font-normal text-white">DITEI</span> */}
        <div className="h-[.5px] w-full bg-gray-600"/>
        <span>
          {" "}
          Copyright © 2024 {ministerio.name} - Todos direitos Reservados
        </span>
      </div>
      <PdfViewer />
    </footer>
  );
};

export default Footer;
