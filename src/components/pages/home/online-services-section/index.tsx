"use client";
import SectionTitle from "@/components/layout/title";
import CardsList from "./cards-list";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
export default function OnlineServicesSection() {
  return (
    <section className="w-full container px-4 flex flex-col items-start justify-center mt-8">
      <SectionTitle text="SERVIÇOS ONLINE" />
      <CardsList />
      <Link
        href="/documentos"
        className="text-sm hover:underline flex items-center transition-colors text-primary-blue/80 mt-10"
      >
        Todos os serviços
        <ChevronsRight className="h-4 w-4 ml-1 " />
      </Link>
    </section>
  );
}
