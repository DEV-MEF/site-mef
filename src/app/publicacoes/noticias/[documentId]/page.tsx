import "primeicons/primeicons.css";
import SingularNews from "@/components/pages/news/singular-news";
import { Suspense } from "react";

export default function Noticias({ params }: never) {
  return (
    <main className="mb-20">
      <Suspense fallback={null}>
        <SingularNews params={params} />
      </Suspense>
    </main>
  );
}
