"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function HeroBannerSkeleton() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Fundo simulado */}
      <Skeleton className="absolute inset-0 w-full h-full object-cover" />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-accent" />

      {/* Conteúdo simulado */}
      <div className="absolute mx-auto inset-0 top-12 flex flex-col justify-center w-full container px-4 max-w-[88rem] z-10 space-y-4">
        {/* Título linha 1 */}
        <Skeleton className="h-6 md:h-10 w-[45%] md:w-1/2 rounded-lg" />
        {/* Título linha 2 */}
        <Skeleton className="h-6 md:h-10 w-[35%] md:w-1/3 rounded-lg" />
        {/* Subtítulo */}
        <Skeleton className="h-4 md:h-10 w-[25%] md:w-1/4 rounded" />
        {/* Botão simulado */}
        <Skeleton className="h-10 md:h-12 w-[15%] rounded-md mt-4" />
      </div>

      {/* Botões de navegação laterais simulados */}
      <Skeleton className="absolute top-[90%] md:top-[50%] right-4 md:left-4 transform -translate-y-1/2 h-10 w-10 rounded-full bg-gray-500/30" />
      <Skeleton className="absolute top-[75%] md:top-[50%] right-4 transform -translate-y-1/2 h-10 w-10 rounded-full bg-gray-500/30" />
    </div>
  );
}
