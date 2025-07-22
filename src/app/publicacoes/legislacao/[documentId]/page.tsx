import "primeicons/primeicons.css";
import AllFiles from "@/components/pages/publications/legislations/all-files";
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

    const { name, docs, children } = await new Promise<Folders>((resolve) => {
        AxiosHttpClient.get(`/legislation-folders?filters[documentId][$eq]=${documentId}`)
            .then(({ data: { data } }) => {
                resolve(data[0]);
            });
    });

    const description = `Consulta a pasta "${name}", que contém ${docs} instrumento${docs !== 1 ? "s legais" : " legal"} e ${children} subpasta${children !== 1 ? "s" : ""}, reunindo legislação relevante do Ministério das Finanças organizada por tema.`;

    const images = ["/images/logo_governo.png"];
    const type = "website";
    const title = `${name} - Legislação - Ministério das Finanças`;

    const url = location.href;
    const siteName = "mef.gov.st";

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

