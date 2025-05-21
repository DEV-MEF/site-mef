import { VideosGallery } from "@/components/pages/publications/videos/videos-gallery";

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
