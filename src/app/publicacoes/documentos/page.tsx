import "primeicons/primeicons.css";
import AllFolders from "@/components/pages/publications/documents/all-folders";
import Banner from "@/components/pages/banner";
import {Metadata} from "next";
import {AxiosHttpClient} from "@/settings/axios";

export default async function ministerio() {
  return (
    <main className="w-full min-h-screen">
      <Banner text_1="Publicações" text_2="Documentos" link_1="#" />
      <AllFolders />
    </main>
  );
}


export async function generateMetadata(): Promise<Metadata> {
    const docs = await new Promise<number>((resolve) => {
        AxiosHttpClient.get(`/docs-categories/?filters[superfolder][$null]=true&pagination[limit]=1`).then(
            ({data: {data}}) => {
                resolve(data.length);
            }
        );
    });

    const description =`A pasta contém ${docs} pasta${docs !== 1 ? "s" : ""}`;
    const images =  ["/images/logo_governo.png"];
    const title = "Documentos";
    const type = 'website';
    return {
        title,
        description,
        openGraph: {
            title,
            images,
            description,
            type,
        }
    };
}
