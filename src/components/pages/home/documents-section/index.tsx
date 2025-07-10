import { FileText, ChevronsRight } from "lucide-react";
import Link from "next/link";
import Title from "@/components/layout/title";
import { useEffect, useState } from "react";
import { usePdfViewer } from "@/components/contexts/pdf-viewer";
import { AxiosHttpClient } from "@/settings/axios";
import moment from "moment";
import qs from "qs";
import DocumentListSkeleton from "@/components/layout/skeleton/home-documents";

type Doc = {
  documentId: string;
  name: string;
  content: string;
  summary: string;
  files: File;
  publishedAt: string;
};

type File = {
  url: string;
  name: string;
};

export default function DocumentsSection() {
  const [files, setFiles] = useState<Doc[]>([]);
  const { openNewDocument } = usePdfViewer();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = qs.stringify(
      {
        sort: ["createdAt:desc"],
        pagination: {
          start: 0,
          limit: 4,
        },
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

    (async () => {
      setLoading(true);
      try {
        const {
          data: { data },
        } = await AxiosHttpClient.get(`/docs?${query}`);
        if (data) {
          setFiles(data);
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Erro ao carregar documentos"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="w-full py-6">
      <div className="container max-w-[88rem] mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Title text="Documentos Recentes" />
        </div>
        {loading ? (
          <DocumentListSkeleton />
        ) : (
          <div className="grid">
            {files.map((value, index) => (
              <div key={index} className="group">
                <div
                  className="block p-4 rounded-sm hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    openNewDocument({
                      name: value.name,
                      uri: value.files.url,
                      id: value.documentId,
                    });
                  }}
                >
                  <div className="flex items-start gap-2">
                    <FileText className="h-5 w-5 mt-0.5 flex-shrink-0 text-secondary-blue" />
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium group-hover:text-primary transition-colors text-text-primary hover:underline max-w-full line-clamp-1 md:line-clamp-2">
                          {value.name}
                        </h3>
                        <span className="text-xs text-text-light/90">
                          {moment(value.publishedAt).format("DD/MM/YYYY")}
                        </span>
                      </div>
                      <div className="text-sm  mt-1 line-clamp-1 text-text-second/90">
                        {value.summary}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <Link
            href="/publicacoes/documentos"
            className="text-sm hover:underline flex items-center transition-colors text-primary-blue/80 mt-4"
          >
            Todos os documentos
            <ChevronsRight className="h-4 w-4 ml-1 " />
          </Link>
        </div>
      </div>
    </section>
  );
}
