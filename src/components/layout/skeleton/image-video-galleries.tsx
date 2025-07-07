import { Skeleton } from "@/components/ui/skeleton";

export function ImagesGallerySkeleton() {
  return (
    <section className="w-full max-w-6xl mx-auto container py-10 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" /> {/* Título */}
        <Skeleton className="h-4 w-80" /> {/* Subtítulo */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden shadow-md"
          >
            <Skeleton className="h-48 w-full rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-accent/50 via-accent/30 to-transparent rounded-xl p-4 flex flex-col justify-end">
              <Skeleton className="h-5 bg-accent w-28 mb-2" />{" "}
              {/* Label Galeria */}
              <Skeleton className="h-6 bg-accent w-40 mb-1" />{" "}
              {/* Título da galeria */}
              <div className="flex items-center justify-between text-white">
                <Skeleton className="h-4 bg-accent w-16" /> {/* Nº de fotos */}
                <Skeleton className="h-4 bg-accent w-20" /> {/* Ver galeria */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
