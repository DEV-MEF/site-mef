import "primeicons/primeicons.css";
import ImagesGallery from "@/components/pages/publications/images/gallery";
import {Metadata} from "next";
import {AxiosHttpClient} from "@/settings/axios";
import {imageURLServer} from "@/lib/utils";

export default function Galeria({ params }: never) {
  return (
    <main className="w-full mb-20">
      <ImagesGallery params={params} />
    </main>
  );
}

type ImageType = {
    name: string;
    documentId: string;
    url: string;
    alternativeText: string;
    formats: { [k in "large" | "medium" | "small"]: ImageType };
};

type TImageApi = {
    documentId: string;
    description: string;
    medias: ImageType[];
    cover: ImageType;
};
export async function generateMetadata({ params }: { params: Promise<{ documentId: string }> }): Promise<Metadata> {
    const url = location.href;
    const siteName = "mef.gov.st";
    const { documentId } = await params;
    const query = `filters[documentId][$eq]=${documentId}&populate=*`;
    const { data: { data: {0: image}}} : { data: {data: {0: TImageApi}}}= await AxiosHttpClient.get(`/galleries?${query}`);
    const description = "";
    const images = [`${imageURLServer}${image?.cover?.formats?.large?.url || image?.cover?.formats?.medium?.url || image?.cover?.url}`];
    const title = `${image.description} - Galeria de Imagens - Ministério das Finanças`;
    const type = "website";
    return {
        title,
        description,
        openGraph: {
            title,
            images,
            description,
            siteName,
            type,
            url,
        }
    };
}
