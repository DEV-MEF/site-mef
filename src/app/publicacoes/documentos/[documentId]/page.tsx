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

export async function generateMetadata({params}: {params: {documentId: string}}): Promise<Metadata> {
    const {documentId} = params;
    const {name: title, docs, children} = await new Promise<Folders>((resolve) => {
        AxiosHttpClient.get(`/docs-categories?filters[documentId][$eq]=${documentId}&populate=*`)
            .then(({ data: { data } }) => {
                resolve(data[0]);
            });
    });

    const description =`A pasta contém ${docs} documento${docs !== 1 ? "s" : ""} e ${children} pasta${children !== 1 ? "s" : ""}`;
    const images =  ["/images/logo_governo.png"];
    const type = 'website';
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type,
            images,
        },
    };
}
