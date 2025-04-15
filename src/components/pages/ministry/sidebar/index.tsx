"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MinistrySidebar() {
  const pathname = usePathname();
  return (
    <div className="col-span-1 flex flex-col space-y-8">
      <div className="p-8 rounded-lg shadow-[0_-10px_39px_0_rgba(8,18,109,.1)] flex flex-col items-start space-y-4">
        <div className="text-primary ">
          <i
            className="pi pi-folder-open text-dark-gray"
            style={{ fontSize: "2.5rem", color: "#5856D6" }}
          ></i>
        </div>
        <h4 className="text-lg font-semibold text-light">Documentos</h4>
        <Link
          href="/documentos"
          className="text-primary-blue font-semibold text-sm hover:underline "
        >
          » Serviço de Directório Online
        </Link>

        <p className="font-light text-sm mb-2 text-text-primary">
          Disponibilizamos um conjunto de documentos úteis online para consulta
          e transferência.
        </p>
      </div>

      <div className="bg-[#3A3B7B] text-white p-8 rounded-lg shadow-[0_-10px_39px_0_rgba(8,18,109,.1) flex flex-col items-start space-y-4">
        <div className="text-primary text-3xl">
          <i className="pi pi-building" style={{ fontSize: "3rem" }}></i>
        </div>
        <h4 className="text-lg">O Ministério</h4>
        <ul className="text-sm space-y-2">
          <li>
            <Link
              href="/ministerio/sobre-nos"
              className={
                pathname.includes("/ministerio/sobre-nos")
                  ? "hover:underline font-semibold"
                  : "hover:underline font-light"
              }
            >
              » Sobre nós
            </Link>
          </li>
          <li>
            <Link
              href="/ministerio/o-que-fazemos"
              className={
                pathname.includes("/ministerio/o-que-fazemos")
                  ? "hover:underline font-normal"
                  : "hover:underline font-light"
              }
            >
              » O que Fazemos
            </Link>
          </li>
          <li>
            <Link
              href="/ministerio/nossa-equipa"
              className={
                pathname.includes("/ministerio/nossa-equipa")
                  ? "hover:underline font-semibold"
                  : "hover:underline font-light"
              }
            >
              » Nossa Equipa
            </Link>
          </li>
          <li>
            <Link
                href="/ministerio/o-ministro"
                className={
                  pathname.includes("/ministerio/o-ministro")
                      ? "hover:underline font-semibold"
                      : "hover:underline font-light"
                }
            >
              » Mensagem do Ministro
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
