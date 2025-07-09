"use client";
import { Skeleton } from "@/components/ui/skeleton";

export function NewsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-12">
        <div>
          <Skeleton className="h-5 w-40 mb-1" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-6 w-64" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="flex flex-col justify-between h-full">
            <Skeleton className="h-40 w-full rounded-t-md" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-5 w-11/12" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-10/12" />
              <div className="pt-2">
                <Skeleton className="h-8 w-24 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center pt-6">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}
