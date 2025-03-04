import 'primeicons/primeicons.css'; // Importa ícones do PrimeReact
import Image from 'next/image'; // Para carregar imagens otimizadas no Next.js
import Notices1 from '@/assets/notice1.jpg';

export default function VerNoticias() {

    return(
        <div className="container">
      {/* Título e Metadados */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-primary mb-4">
          ZLCI/001/2024 - RESULTADO DO CONCURSO - ESTAGIÁRIO PARA ZUNTAMON
        </h1>
        <div className="text-sm text-gray-500 flex items-center space-x-10">
          <p className="flex items-center">
            <i className="pi pi-user text-primary mr-2"></i> Por: MPFEA
          </p>
          <p className="flex items-center">
            <i className="pi pi-calendar text-primary mr-2"></i> 12 Sep 2024
          </p>
          <p className="flex items-center">
            <i className="pi pi-clock text-primary mr-2"></i> 10 Min Leitura
          </p>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-3 gap-12">

        {/* Coluna de Texto (2x) */}
        <div className="col-span-2">

        <div className="mb-8">
            <Image
              src={Notices1}
              alt="Imagem principal da notícia"
              className="rounded-lg object-cover w-full"
              layout="responsive"
            />
          </div>

          <h2 className="text-xl font-semibold text-primary mb-6">SOBRE NÓS</h2>
          <p className="font-light mb-4">Natureza</p>
          <h3 className="text-lg font-semibold text-primary mb-6">
            Ministério da Economia e Finanças
          </h3>
          <p className="font-light leading-relaxed mb-8">
            O <strong>Ministério da Economia e Finanças (MEF)</strong> é o
            organismo da Administração Central do Estado responsável que tem por missão propor,
            formular, conduzir, executar e avaliar a política financeira do Governo, promovendo a
            gestão racional dos recursos financeiros e patrimoniais públicos e o equilíbrio interno
            e externo das contas públicas, bem como a inspeção-geral e fiscalização das finanças
            públicas.
          </p>
          <h3 className="text-lg font-semibold text-primary my-6">Competência o Ministro</h3>
          <p className="font-light leading-relaxed mb-8">
            As competências do Ministro do Planeamento, Finanças e Economia Azul (MPFEA) são as
            consagradas na Orgânica do Governo e todas as previstas nos diplomas afins.
          </p>
          <h3 className="text-lg font-semibold text-primary my-6">Integração de novo serviço</h3>
          <p className="font-light leading-relaxed mb-8">
            É transferida para o Ministério da Economia e Finanças, proveniente do
            extinto Ministério da Defesa e Administração Interna a Direção da Descentralização,
            Assessoria e Apoio às Autarquias. A estrutura da Direção disposta no número 1 deste
            artigo é definida no respectivo Estatuto Orgânico.
          </p>
          <a href="#" className="text-primary underline">
            Anexo: ZLCI/001/2024 - Resultado Do Concurso - Estagiário Para Unidade De Gestão De
            ZUNTAMON
          </a>
        </div>

        {/* Coluna de Cards (1x) */}
        <div className="col-span-1 flex flex-col space-y-8">
          {/* Card de Categorias */}
          <div className="bg-[#F1F1FF] p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-primary mb-4">Categorias</h4>
            <ul className="font-light text-sm space-y-4">
                <a href="#" className=''><li className="flex justify-between border-b border-gray-300 py-2 efects hover:pl-5">
                    Notícias <span className="text-gray-500">(3)</span>
                </li></a>
              <a href="#"><li className="flex justify-between border-b border-gray-300 py-2 efects hover:pl-5">
                Comunicado De Imprensa <span className="text-gray-500">(2)</span>
              </li></a>
              
            <a href="#"><li className="flex justify-between border-b border-gray-300 py-2 efects hover:pl-5">
                Anúncios <span className="text-gray-500">(5)</span>
              </li></a>
              
              <a href="#"><li className="flex justify-between border-b border-gray-300 py-2 efects hover:pl-5">
                Entrevistas <span className="text-gray-500">(4)</span>
              </li></a>
              <a href="#"><li className="flex justify-between py-2 efects hover:pl-5">
                Eventos <span className="text-gray-500">(4)</span>
              </li></a>
              
              
            </ul>
          </div>

          {/* Card de Notícias Recentes */}
          <div className="bg-[#F1F1FF] p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-primary mb-4">Notícias Recentes</h4>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-16 relative">
                  <Image
                    src={Notices1}
                    alt="Notícia 1"
                    layout="fill"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div>
                  <p className="font-light text-sm">
                    <a href="#" className="text-primary hover:underline">
                      Lorem Ipsum Dolor Sit Amet...
                    </a>
                  </p>
                  <p className="text-gray-500 text-xs">Notícias</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-16 relative">
                  <Image
                    src={Notices1}
                    alt="Notícia 1"
                    layout="fill"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div>
                  <p className="font-light text-sm">
                    <a href="#" className="text-primary hover:underline">
                      Lorem Ipsum Dolor Sit Amet...
                    </a>
                  </p>
                  <p className="text-gray-500 text-xs">Notícias</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-16 relative">
                  <Image
                    src={Notices1}
                    alt="Notícia 1"
                    layout="fill"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div>
                  <p className="font-light text-sm">
                    <a href="#" className="text-primary hover:underline">
                      Lorem Ipsum Dolor Sit Amet...
                    </a>
                  </p>
                  <p className="text-gray-500 text-xs">Notícias</p>
                </div>
              </div>
            </div>
            
          </div>

          {/* Card de Tags Populares */}
          <div className="bg-[#F1F1FF] p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-primary mb-4">Tags Populares</h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#5151F8] text-white px-3 py-1 rounded-full text-[12px] cursor-pointer">TAG1</span>
              <span className="bg-[#5151F8] text-white px-3 py-1 rounded-full text-[12px] cursor-pointer">Tag 2</span>
              <span className="bg-[#5151F8] text-white px-3 py-1 rounded-full text-[12px] cursor-pointer">TAG3</span>
              <span className="bg-[#5151F8] text-white px-3 py-1 rounded-full text-[12px] cursor-pointer">TAG4</span>
              <span className="bg-[#5151F8] text-white px-3 py-1 rounded-full text-[12px] cursor-pointer">TAG5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}
