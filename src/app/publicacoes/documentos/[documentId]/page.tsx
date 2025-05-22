import "primeicons/primeicons.css";
import AllFiles from "@/components/pages/publications/documents/all-files";

export default function Documents({ params }: never) {
  return (
    <main className="w-full min-h-screen mb-20">
      <AllFiles params={params} />
    </main>
  );
}
