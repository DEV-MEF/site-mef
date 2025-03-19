import { FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import Title from "@/components/layout/title";

export default function DocumentsSection() {
  return (
    <section className="w-full py-6">
      <div className="container mx-auto px-4 lg:px-8 ">
        <div className="flex items-center justify-between mb-6">
          <Title text="Documentos" />
          <Link
            href="#"
            className="text-sm hover:underline flex items-center transition-colors text-primary-blue"
          >
            Mais documentos
            <ChevronRight className="h-4 w-4 ml-1 " />
          </Link>
        </div>

        <div className="grid">
          <div className="group">
            <Link
              href="/documentos/estrategia-agua"
              className="block p-4 rounded-sm hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 mt-0.5 flex-shrink-0 text-secondary-blue" />
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium group-hover:text-primary transition-colors text-text-primary hover:underline">
                      Água que une - Estratégia Nacional para a Gestão da Água
                    </h3>
                    <span className="text-xs text-stone-500">09/03/2025</span>
                  </div>
                  <p className="text-sm  mt-1 line-clamp-1 text-text-second">
                    Apresentação da estratégia nacional para gestão de recursos
                    hídricos.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="group">
            <Link
              href="/documentos/subsidio-mobilidade"
              className="block p-4 rounded-sm hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 mt-0.5 flex-shrink-0 text-secondary-blue" />
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium group-hover:text-primary transition-colors text-text-primary hover:underline">
                      Relatório final do grupo de trabalho para revisão do
                      subsídio social de mobilidade
                    </h3>
                    <span className="text-xs text-text-light">09/03/2025</span>
                  </div>
                  <p className="text-sm mt-1 line-clamp-1 text-text-second">
                    Relatório sobre o subsídio social de mobilidade.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="group">
            <Link
              href="/documentos/apresentacao-educacao"
              className="block p-4 rounded-sm hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 mt-0.5 flex-shrink-0 text-secondary-blue" />
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium group-hover:text-primary transition-colors text-text-primary hover:underline">
                      Apresentação do Ministro da Educação na Comissão de
                      Educação e Ciência
                    </h3>
                    <span className="text-xs text-text-light">05/03/2025</span>
                  </div>
                  <p className="text-sm mt-1 line-clamp-1 text-text-second">
                    Apresentação do Ministro na Comissão de Educação e Ciência.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="group">
            <Link
              href="/documentos/apresentacao-educacao"
              className="block p-4 rounded-sm hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 mt-0.5 flex-shrink-0 text-secondary-blue" />
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium group-hover:text-primary transition-colors text-text-primary hover:underline">
                      Decreto Lei 32/2025
                    </h3>
                    <span className="text-xs text-text-light">05/03/2025</span>
                  </div>
                  <p className="text-sm mt-1 line-clamp-1 text-text-second">
                    Documento do Decreto Lei 32/2025, em que se estabelece o
                    Decreto Lei 32/2025
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
