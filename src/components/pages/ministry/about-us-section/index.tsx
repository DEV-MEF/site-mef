import SectionTitle from "@/components/layout/title";

export default function AboutUsSection() {
  return (
    <section className="w-full">
      <SectionTitle text="SOBRE NÓS" />
      {/* <h1 className="text-md font-semibold text-light mb-6">SOBRE NÓS</h1> */}
      <p className="text-light mb-4">Natureza</p>
      <h2 className="text-md font-semibold text-light mb-6">
        Ministério da Economia e Finanças
      </h2>
      <p className="font-light text-justify leading-loose mb-8 text-sm">
        O <strong>Ministério da Economia e Finanças (MEF)</strong> é o organismo
        da Administração Central do Estado responsável que tem por missão
        propor, formular, conduzir, executar e avaliar a política financeira do
        Governo, promovendo a gestão racional dos recursos financeiros e
        patrimoniais públicos e o equilíbrio interno e externo das contas
        públicas, bem como a inspeção-geral e fiscalização das finanças
        públicas.
      </p>
      <h3 className="text-md font-semibold text-light my-6">
        Competência o Ministro
      </h3>
      <p className="font-light text-justify leading-loose mb-8 text-sm">
        As competências do Ministro do Planeamento, Finanças e Economia Azul
        (MPFEA) são as consagradas na Orgânica do Governo e todas as previstas
        nos diplomas afins.
      </p>
      <h3 className="text-md font-semibold text-light my-6">
        Integração de novo serviço
      </h3>
      <p className="font-light text-justify leading-loose text-sm">
        É transferida para o Ministério da Economia e Finanças, proveniente do
        extinto Ministério da Defesa e Administração Interna a Direção da
        Descentralização, Assessoria e Apoio às Autarquias. A estrutura da
        Direção disposta no número 1 deste artigo é definida no respectivo
        Estatuto Orgânico.
      </p>
    </section>
  );
}
