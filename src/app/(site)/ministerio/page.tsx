import Image from 'next/image';
import fundo from '@/assets/fundoPages.png';
import 'primeicons/primeicons.css';
import HowToDo from './pages/HowToDo';

export default function ministerio() {
  return (
    <div className='mb-20'>
        <div className="relative w-full h-[300px]">

            <Image
                src={fundo}
                alt="Fundo Sobre Nós"
                fill className="object-cover"
                quality={100}
            />
            <div
                className="absolute inset-0 bg-[#3A3B7B] opacity-50"
                aria-hidden="true"
            ></div>
            <div className="absolute inset-0 flex items-center px-44 py-56">
                <h1 className="text-white text-3xl font-bold">SOBRE NÓS</h1>
            </div>
        </div>

        <div className="container mx-auto px-44 py-20">
      <div className="grid grid-cols-3 gap-12">

        <div className="col-span-2">
          <HowToDo/>
        </div>
        <div className="col-span-1 flex flex-col space-y-8">

          <div className="p-8 rounded-lg shadow-[0_-10px_39px_0_rgba(8,18,109,.1)] flex flex-col items-start space-y-4">

            <div className="text-primary ">
              <i className="pi pi-folder-open text-dark-gray" style={{ fontSize: '2.5rem', color: '#5856D6' }}></i>
            </div>
            <h4 className="text-lg font-semibold text-light">Documentos</h4>

            <a href="#" className="text-primary-blue font-semibold text-sm hover:underline ">
              » Serviço de Directório Online
            </a>
            <p className="font-light text-sm text-justify mb-2 text-text-primary">Disponibilizamos um conjunto de documentos úteis online para consulta e transferência.</p>
          </div>

          <div className="bg-[#3A3B7B] text-white p-8 rounded-lg shadow-[0_-10px_39px_0_rgba(8,18,109,.1) flex flex-col items-start space-y-4">

            <div className="text-primary text-3xl">
              <i className="pi pi-building" style={{ fontSize: '3rem' }}></i>
            </div>
            <h4 className="text-lg font-semibold">O Ministério</h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline font-semibold">
                 » Sobre nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline font-light">
                  » O que Fazemos
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline font-light">
                 »  Nossa Equipa
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
