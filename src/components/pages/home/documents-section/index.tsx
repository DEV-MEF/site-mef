import { FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import Title from "@/components/layout/title";
import {useEffect, useState} from "react";
import {usePdfViewer} from "@/components/contexts/pdf-viewer";
import {AxiosHttpClient} from "@/settings/axios";
import ContentRenderer from "@/lib/utils";
import {PdfViewer} from "@/lib/pdf-viewer";
import moment from "moment";
import qs from "qs";

type Doc = {
  documentId: string
  name: string,
  description: string,
  files: File
  publishedAt: string
}

type File = {
  url: string,
  name: string
}

export default function DocumentsSection() {
  const [files, setFiles] = useState<Doc[]>([]);
  const {openNewDocument} = usePdfViewer();

  useEffect(() => {
    const query = qs.stringify({
      sort: ['createdAt:desc'],
      pagination: {
        start: 0,
        limit: 3,
      },
      populate: "*"
    }, {
      encodeValuesOnly: true,
    });

    (async () => {
      AxiosHttpClient.get(`/docs?${query}`).then(({data : {data}}) => {
        setFiles(data);
      });
    })()
  }, []);

  console.log(files)

  return (
    <section className="w-full py-6">
      <div className="container mx-auto px-4 lg:px-8 ">
        <div className="flex items-center justify-between mb-6">
          <Title text="Documentos" />
          <Link
            href="/documentos"
            className="text-sm hover:underline flex items-center transition-colors text-primary-blue"
          >
            Mais documentos
            <ChevronRight className="h-4 w-4 ml-1 " />
          </Link>
        </div>

        <div className="grid">
          {
            files.map((value, index) => <div key={index} className="group">
              <div className="block p-4 rounded-sm hover:bg-muted/50 transition-colors"
                   onClick={() => {
                     openNewDocument({name: value.name, uri: value.files.url, id: value.documentId})
                   }}
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 mt-0.5 flex-shrink-0 text-secondary-blue" />
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium group-hover:text-primary transition-colors text-text-primary hover:underline">
                        {value.name}
                      </h3>
                      <span className="text-xs text-stone-500">{moment(value.publishedAt).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className="text-sm  mt-1 line-clamp-1 text-text-second">
                      <ContentRenderer content={value.description} type={"blocks"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>)
          }

          {/*<div className="group">
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
          </div>*/}
        </div>
      </div>
      <PdfViewer />
    </section>
  );
}
