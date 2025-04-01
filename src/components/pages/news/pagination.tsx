"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationProps {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

export default function PaginationComponent({pagination}: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const totalPages = pagination.pageCount;

    const changePage = (page: number) => {
        if (page < 1 || page > totalPages) return;

        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("page", page.toString());

        router.push(`?${newParams.toString()}`, {scroll: false});
    };

    const renderPageNumbers = () => {
        const pages = [];
        const range = 2; // Número de páginas ao redor da atual

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - range && i <= currentPage + range)
            ) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== "...") {
                pages.push("...");
            }
        }

        return pages.map((page, index) =>
            page === "..." ? (
                <PaginationItem key={index}>
                    <PaginationEllipsis className="text-primary-blue/60"/>
                </PaginationItem>
            ) : (
                <PaginationItem key={page}>
                    <PaginationLink
                        className={`text-primary-blue ${
                            currentPage === page ? "font-bold border-b-2 border-primary-blue" : ""
                        }`}
                        href="#"
                        onClick={() => changePage(Number(page))}
                    >
                        {page}
                    </PaginationLink>
                </PaginationItem>
            )
        );
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* Botão Anterior */}
                <PaginationItem>
                    <PaginationPrevious
                        className={`text-primary-blue hover:text-primary-blue/80 ${
                            currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                        }`}
                        href="#"
                        onClick={() => changePage(currentPage - 1)}
                    />
                </PaginationItem>

                {/* Páginas */}
                {renderPageNumbers()}

                {/* Botão Próximo */}
                <PaginationItem>
                    <PaginationNext
                        className={`text-primary-blue hover:text-primary-blue/80 ${
                            currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
                        }`}
                        href="#"
                        onClick={() => changePage(currentPage + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
