import "primeicons/primeicons.css";
import Banner from "@/components/pages/banner";
import AllFolders from "@/components/pages/publications/legislations/all-folders";
import {Metadata} from "next";
import {AxiosHttpClient} from "@/settings/axios";

export default function ministerio() {
  return (
    <main className="mb-20 min-h-screen">
      <Banner text_1="Publicações" text_2="Legislações" link_1="#" />
      <AllFolders />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
    const docs = await new Promise<number>((resolve) => {
        AxiosHttpClient.get(`/legislation-folders/?filters[superfolder][$null]=true&pagination[limit]=1`).then(
            ({data: {data}}) => {
                resolve(data.length);
            }
        );
    });

    const description =`A pasta contém ${docs} pasta${docs !== 1 ? "s" : ""}`;
    const images =  ["/images/logo_governo.png"];
    const title = "Legislações";
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
