import { Skeleton } from "@/components/ui/skeleton";

export function NewsArticleSkeleton() {
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Conteúdo principal */}
      <div className="lg:col-span-8 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-40" />

        <Skeleton className="h-72 w-full rounded-md" />

        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>

        <Skeleton className="h-64 w-full rounded-md" />

        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        {/* Categorias */}
        <div>
          <div className="space-y-2 pt-6">
            <Skeleton className="h-5 w-32" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-3/4" />
            ))}
          </div>
        </div>

        {/* Notícias recentes */}
        <div>
          <div className="space-y-4 pt-6">
            <Skeleton className="h-5 w-40" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-16 rounded-md" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <div className="space-y-3 pt-6">
            <Skeleton className="h-5 w-24" />
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
