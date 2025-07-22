import "primeicons/primeicons.css";
import SingularNews from "@/components/pages/news/singular-news";
import {Metadata} from "next";
import {AxiosHttpClient} from "@/settings/axios";
import {imageURLServer, NewsItem} from "@/lib/utils";
export default function Noticias({ params }: never) {
  return (
    <main className="mb-20">
      <SingularNews params={params} />
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ documentId: string }> }): Promise<Metadata> {
    const { documentId } = await params;
    const query = `filters[documentId][$eq]=${documentId}&populate=*`;
    const { data: { data: {0: notice}}} : { data: {data: {0: NewsItem}}}= await AxiosHttpClient.get(`/news?${query}`);
    const description = notice.summary;
    const images = [`${imageURLServer}${notice?.image?.formats?.large?.url || notice?.image?.formats?.medium?.url || notice?.image?.url}`];
    const title = `${notice.title} - Notícias - Ministério das Finanças`;
    const keywords = notice?.tags?.map((tag) => tag.name);
    const type = "website";
    const siteName = "mef.gov.st";
    const url = `https://${siteName}/noticias/${documentId}`;
    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            images,
            description,
            type,
            url,
            siteName,
        }
    };
}
