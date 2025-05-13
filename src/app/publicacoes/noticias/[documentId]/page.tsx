import "primeicons/primeicons.css";
import SingularNews from "@/components/pages/news/singular-news";

export default function Noticias({ params }: never) {
  return (
    <main className="mb-20">
      <SingularNews params={params} />
    </main>
  );
}
