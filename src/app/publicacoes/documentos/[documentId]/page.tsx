import "primeicons/primeicons.css";
import AllFiles from "@/components/pages/publications/documents/all-files";
import {Metadata} from "next";
import {AxiosHttpClient} from "@/settings/axios";

export default function Documents({ params }: never) {
  return (
    <main className="w-full min-h-screen mb-20">
      <AllFiles params={params} />
    </main>
  );
}

interface Folders {
    documentId: string;
    name: string;
    id: string;
    docs: number
    children: number
}

export async function generateMetadata({ params }: { params: Promise<{ documentId: string }> }): Promise<Metadata> {
    const { documentId } = await params;
    const siteName = "mef.gov.st";
    const url = `https://${siteName}/documentos/${documentId}`;
    const { name, docs, children } = await new Promise<Folders>((resolve) => {
        AxiosHttpClient.get(`/docs-categories?filters[documentId][$eq]=${documentId}`)
            .then(({ data: { data } }) => {
                resolve(data[0]);
            });
    });
    const description = `Consulta a pasta "${name}", que contém ${docs} documento${docs !== 1 ? "s" : ""} e ${children} subpasta${children !== 1 ? "s" : ""}, com conteúdos institucionais do Ministério das Finanças organizados por tema.`;
    const images = ["/images/logo_governo.png"];
    const type = "website";
    const title = `${name} - Documentos - Ministério das Finanças`;
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type,
            images,
            url,
            siteName,
        },
    };
}
