import { VideosGallery } from "@/components/pages/publications/videos/videos-gallery";
import {Metadata} from "next";
import {imageURLServer} from "@/lib/utils";
import {AxiosHttpClient} from "@/settings/axios";

export default async function Galeria({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;
  return (
    <main className="w-full min-h-screen">
      <VideosGallery documentId={documentId} />
    </main>
  );
}

interface ImageType {
  name: string;
  documentId: string;
  url: string;
  alternativeText: string;
  formats: {
    large?: ImageType;
    medium?: ImageType;
    small?: ImageType;
  };
}

interface VideoType {
  description: string;
  plataforn: string;
  cover: ImageType;
  link: string;
}

interface ApiResponse {
  documentId: string;
  description: string;
  media: VideoType[];
  cover: ImageType;
}

export async function generateMetadata({ params }: { params: Promise<{ documentId: string }> }): Promise<Metadata> {
  const { documentId } = await params;
  const query = `filters[documentId][$eq]=${documentId}&populate=*`;
  const { data: { data: {0: video}}} : { data: {data: {0: ApiResponse}}}= await AxiosHttpClient.get(`/towatches?${query}`);
  const description = "";
  const images = [`${imageURLServer}${video?.cover?.formats?.large?.url || video?.cover?.formats?.medium?.url || video?.cover?.url}`];
  const title = `${video.description} - Galeria de Videos - Ministério das Finanças`;
  const type = "website";
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
