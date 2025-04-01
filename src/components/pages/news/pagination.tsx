"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export default function PaginationComponent({ pagination }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = pagination.pageCount;

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const newParams = new URLSearchParams(window.location.search);
    newParams.set("page", page.toString());

    router.push(`?${newParams.toString()}`);
  };

  return (
      <Pagination>
        <PaginationContent>
          {/* Botão Anterior */}
          <PaginationItem>
            <PaginationPrevious
                className={`text-primary-blue/60 ${currentPage === 1 ? "opacity-50 cursor-pointer pointer-events-none" : "cursor-pointer"}`}
                onClick={() => changePage(currentPage - 1)}
                href="#"
            />
          </PaginationItem>

          {/* Paginação dinâmica */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                    className={`text-primary-blue ${
                        currentPage === page ? "cursor-pointer font-bold border-b-2 border-primary-blue" : "cursor-pointer"
                    }`}
                    href="#"
                    onClick={() => changePage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
          ))}

          {/* Botão Próximo */}
          <PaginationItem>
            <PaginationNext
                className={`text-primary-blue/60 ${currentPage === totalPages ? " cursor-pointer opacity-50 pointer-events-none" : "cursor-pointer"}`}
                onClick={() => changePage(currentPage + 1)}
                href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
  );
}
