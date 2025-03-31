import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationComponent() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="text-primary-blue/60" href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="text-primary-blue" href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis className="text-primary-blue/60" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className="text-primary-blue/80 hover:text-primary-blue"
            href="#"
          >
            6
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className="text-primary-blue/80 hover:text-primary-blue"
            href="#"
          >
            7
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className="text-primary-blue/80 hover:text-primary-blue"
            href="#"
          >
            8
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="text-primary-blue hover:text-primary-blue/80"
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
