import { Skeleton } from "@/components/ui/skeleton";

export function Gallerykeleton() {
  return (
    <section className="w-full max-w-[88rem] mx-auto container px-4 py-12">
      {/* Imagem principal com botões laterais */}
      <div className="relative w-[60%] aspect-video rounded-xl overflow-hidden bg-muted mt-12 mx-auto">
        <Skeleton className="absolute inset-0 w-full h-[85%] rounded-xl" />

        {/* Botões de navegação */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      {/* Miniaturas */}
      <div className="flex gap-4 overflow-x-auto -mt-5 w-[60%] mx-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-32 flex-shrink-0 rounded-md" />
        ))}
      </div>
    </section>
  );
}
