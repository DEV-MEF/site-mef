"use client"
import Image from "next/image";
import Logo from "@/assets/brasao1.png";
import {useServicos} from "@/components/contexts/servicos";
/*import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';*/

const Footer = () => {
  const {ministerio, contato} = useServicos();
  return (
    <footer className="bg-[#2f353d] text-white md:px-10 lg:px-44 px-12 py-8">
      <div className="container mx-auto px-4 lg:px-8  flex flex-col md:flex-row justify-between items-start">
        {/* Seção da Logo e Informações */}
        <div className="flex flex-col mb-8 md:mb-0">
          <Image
            src={Logo}
            alt="Brasão de São Tomé e Príncipe"
            width={80}
            height={80}
            className="object-contain"
          />
          <p className="mt-4 leading-8 text-xs font-light">
            Copyright © 2024 {ministerio.name}
            <br />
            {contato.location}
            <br />
            Caixa Postal nº 168
            <br />
            São Tomé e Príncipe
            <br />
            Todos direitos Reservados
          </p>

          {/* Ícones de Redes Sociais */}
          <div className="flex space-x-4 mt-4">
            {/*<a href="#" aria-label="Instagram"><FaInstagram className="text-xl hover:text-gray-400" /></a>
            <a href="#" aria-label="Twitter"><FaTwitter className="text-xl hover:text-gray-400" /></a>
            <a href="#" aria-label="Facebook"><FaFacebook className="text-xl hover:text-gray-400" /></a>
            <a href="#" aria-label="YouTube"><FaYoutube className="text-xl hover:text-gray-400" /></a>*/}
          </div>
        </div>

        {/* Seção de Contato */}
        <div>
          <h2 className="text-lg font-semibold">FALE CONNOSCO</h2>
          <p className="mt-2 leading-8 gap-4 text-xs font-light">
            Par qualquer informação ou solicitação dos nossos serviços.
            <br /> <br />
            Fale connosco aqui:
            <br />
            Liga-nos {contato.phone} / {contato.tel}
            <br />
            Email: {contato.mail}
          </p>
        </div>
      </div>

      {/* Linha de separação e Crédito */}
      <div className="border-t border-gray-600 mt-8 pt-4 text-center text-sm">
        Website Desenvolvido e Hospedado pela{" "}
        <span className="font-normal text-white">DITEI</span>
      </div>
    </footer>
  );
};

export default Footer;
