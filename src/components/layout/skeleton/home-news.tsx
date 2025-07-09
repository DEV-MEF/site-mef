"use client";
import { Skeleton } from "@/components/ui/skeleton";

export function HomeNewsSkeleton() {
  return (
    <section className="w-full max-w-[88rem] container space-y-6">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col justify-between h-full">
            <Skeleton className="h-48 w-full rounded-t-md" />
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
    </section>
  );
}
