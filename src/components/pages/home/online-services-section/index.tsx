import SectionTitle from "@/components/layout/title";
import CardsList from "./cards-list";
export default function OnlineServicesSection() {
  return (
    <section className="w-full container px-4 flex flex-col items-start justify-center gap-12">
      <SectionTitle text="SERVIÇOS ONLINE" />
      <CardsList />
    </section>
  );
}
