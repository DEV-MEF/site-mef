import "primeicons/primeicons.css";
import ImagesGallery from "@/components/pages/publications/images/gallery";

export default function Galeria({ params }: never) {
  return (
    <main className="w-full mb-20">
      <ImagesGallery params={params} />
    </main>
  );
}
