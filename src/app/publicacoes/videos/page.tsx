import "primeicons/primeicons.css";
import Banner from "@/components/pages/banner";
import VideoGalleriesContainer from "@/components/pages/publications/videos/video-galleries-container";

export default function ministerio() {
  return (
    <div className="mb-20">
      <Banner text_1="Início" text_2="Vídeos" link_1="/" />
      <div className="w-full max-w-[88rem] container mx-auto py-10 mb-20">
        <VideoGalleriesContainer />
      </div>
    </div>
  );
}
