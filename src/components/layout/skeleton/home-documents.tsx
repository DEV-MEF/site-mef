"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function DocumentListSkeleton() {
  return (
    <div className="space-y-10 mt-10 mb-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex items-start space-x-4">
          {/* Ícone do documento */}
          <Skeleton className="h-6 w-6 rounded-sm" />
          <div className="flex flex-col space-y-3 w-full">
            {/* Linha do título + data */}
            <Skeleton className="h-4 w-3/4 sm:w-1/2 md:w-3/7" />
            {/* Descrição */}
            <Skeleton className="h-4 w-2/3 sm:w-1/3 md:w-2/6" />
          </div>
        </div>
      ))}
    </div>
  );
}
