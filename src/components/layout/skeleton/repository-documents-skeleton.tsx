import { Skeleton } from "@/components/ui/skeleton";

export function RepositoryDocumentsSkeleton() {
  return (
    <section className="w-full container max-w-[88rem] px-4 mx-auto py-10 space-y-6 mt-12">
      {/* Topo - Navegação */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-6" /> {/* Ícone voltar */}
        <Skeleton className="h-4 w-24" /> {/* Contador de resultados */}
      </div>

      {/* Lista de documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="border-accent rounded-lg px-4 py-4 flex items-center justify-between gap-4"
          >
            {/* Esquerda: ícone + nome */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-md" /> {/* Ícone doc */}
              <Skeleton className="h-4 w-40" /> {/* Nome do doc */}
            </div>

            {/* Direita: ações */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </Skeleton>
        ))}
      </div>
    </section>
  );
}
