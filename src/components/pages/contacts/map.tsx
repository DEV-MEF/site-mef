"use client"
import {useServicos} from "@/components/contexts/servicos";

export default function ContactMap() {
    const {contato} = useServicos();
  return (
    <section className="w-full">
      <iframe
        title="Mapa do Ministério das Finanças e do Plano"
        src={contato.linkmap}
        width="100%"
        height="312"
        style={{ border: 0 }}
        className="rounded-lg"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
