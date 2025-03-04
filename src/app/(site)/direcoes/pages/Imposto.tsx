import Image from 'next/image';
import imposto from '@/assets/imposto.png';

export default function Imposto() {
    return (
        <div>
            <Image src={imposto} alt="Brasão" width={350} height={150} objectFit="contain" />
            <br />
            
            <p className="font-light text-justify leading-loose mb-8 text-sm ">
                A <b>Direcção dos Impostos</b> é o órgão da Administração Central do Estado, hierarquicamente dependente do Ministério do Plano e Finanças, incumbido de proceder à execução da política fiscal e à administração fiscal do Estado.
                    <br /> <br />
                Esta Direcção foi criada em 2001 no âmbito da reforma global da estrutura interna do Ministério do Planeamento e Finanças. Com efeito, a referida reforma operou à extinção da Direcção de Finanças, criando três novas Direcções, dentre as quais, a Direcção dos Impostos que veio substituir, nas suas missões, às Repartições de Finanças, as quais cabia proceder à administração tributária do Estado.
            </p>
            <h3 className="text-md font-semibold text-light my-6">A Direcção dos Impostos tem como missão: </h3>
            <p className="font-light text-justify leading-loose mb-8 text-sm pl-5">
                * Executar a política fiscal do Estado estabelecida pelo Ministério do Plano e Finanças, numa contínua avaliação da sua repercussão na ordem financeira, económica e social;
                
                <br /> <br /> *Realizar a administração fiscal do Estado, através do controle e acompanhamento da aplicação das leis fiscais, e promover a reintegração ou defesa dos respectivos interesses violados.
            </p>
            <h3 className="text-md font-semibold text-light my-6">Para a realização da sua missão, tem as seguintes atribuições: </h3>
            <p className="font-light text-justify leading-loose mb-8 text-sm pl-5">
            * Assegurar a liquidação dos impostos; <br />
            * Pronunciar-se sobre os casos duvidosos de aplicação das leis fiscais;<br />
            * Exercer a acção de fiscalização tributária;<br />
            * Exercer a justiça tributária;<br />
            * Contribuir para o esclarecimento dos contribuintes e exercer a acção de relações públicas fiscais;<br />
            * Assegurar a execução dos acordos internacionais em matéria fiscal;<br />
            * Contribuir para a investigação no domínio da fiscalidade e para o aperfeiçoamento da técnica fiscal;<br />
            * Estudar e propor medidas fiscais de carácter normativo;<br />
            * Informar sobre os resultados e as circunstâncias ou factos observados na execução das leis;<br />
            * Participar na elaboração do Orçamento Geral do Estado<br />
            
            </p>
        </div>
    );
}
        