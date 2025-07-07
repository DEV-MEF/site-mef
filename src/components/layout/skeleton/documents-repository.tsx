import { Skeleton } from "@/components/ui/skeleton";

export function DocumentsRepositorySkeleton() {
  return (
    <section className="w-full max-w-[88rem] px-4 mx-auto container py-10 space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mt-10">
        <Skeleton className="h-6 w-40" /> {/* Título Repositório */}
        <Skeleton className="h-4 w-28" /> {/* Contador de resultados */}
      </div>

      {/* Pastas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            className="border border-accent bg-transparent rounded-lg p-4 flex flex-col items-center justify-center text-center space-y-3"
          >
            <Skeleton className="h-8 w-8" /> {/* Ícone da pasta */}
            <Skeleton className="h-4 w-24" /> {/* Nome da pasta */}
            <Skeleton className="h-5 w-20 rounded-md" />{" "}
            {/* Quantidade de documentos */}
          </Skeleton>
        ))}
      </div>
    </section>
  );
}
