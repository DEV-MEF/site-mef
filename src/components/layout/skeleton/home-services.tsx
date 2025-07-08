"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesListSkeleton() {
  return (
    <section className="w-full flex items-start justify-center mt-14 gap-8 mb-6 overflow-x-hidden">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="w-full flex justify-between h-full">
          <Skeleton className="w-56 h-40 md:h-44 md:w-64 rounded-t-md" />
        </div>
      ))}
    </section>
  );
}
