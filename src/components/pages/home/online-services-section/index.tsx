"use client";
import SectionTitle from "@/components/layout/title";
import CardsList from "./cards-list";
export default function OnlineServicesSection() {
  return (
    <section className="w-full container px-4 lg:px-8  flex flex-col items-start justify-center">
      <SectionTitle text="SERVIÇOS ONLINE" />
      <CardsList />
    </section>
  );
}
