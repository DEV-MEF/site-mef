"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function TextWithImageSectionSkeleton() {
  return (
    <div className="w-full mx-auto space-y-8">
      {/* Título da seção */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-36 w-48" />
      </div>

      {/* Primeiro parágrafo - descrição principal */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Subtítulo - Competência do Ministro */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-64" />
      </div>

      {/* Segundo parágrafo - competências */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Subtítulo - Integração de novo serviço */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-56" />
      </div>

      {/* Terceiro parágrafo - integração */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      {/* Subtítulo - Integração de novo serviço */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-56" />
      </div>

      {/* Terceiro parágrafo - integração */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      {/* Subtítulo - Integração de novo serviço */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-56" />
      </div>

      {/* Terceiro parágrafo - integração */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
