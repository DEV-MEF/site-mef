import Banner from "@/components/pages/banner";

export default function Services() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <Banner text_1="Ministério" text_2="Sobre nós" link_1="/ministerio" />
      <section className="w-full max-w-[88rem] container px-4 flex flex-col items-start justify-center mt-8">
        <h1>Serviços</h1>
      </section>
    </main>
  );
}
