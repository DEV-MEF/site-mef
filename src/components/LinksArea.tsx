import Image from 'next/image';
import Efactura from '@/assets/efactura.png';
import DireccaoImpostos from '@/assets/imposto.png';
import BancoCentral from '@/assets/bc.png';
import IMF from '@/assets/fmi.png';

const PartnerLogos = () => {
  return (
    <div className="p-3 my-20">
        <div className='flex justify-between py-5 items-center'>
      <div className="flex flex-col mb-12 gap-2">
           <h2 className="font-bold uppercase text-[16px] text-primary-blue">Links e Acessos</h2>
        </div>
        
        <div className="md:flex items-center justify-end mb-4 hidden">
          <button className="p-2 rounded-full bg-light-gray mr-2">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 010 1.414L8.414 10l3.879 3.293a1 1 0 11-1.293 1.414l-5-4a1 1 0 010-1.414l5-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-light-gray">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 010-1.414L11.586 10 7.707 6.707a1 1 0 011.293-1.414l5 4a1 1 0 010 1.414l-5 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
          
          {/* Logo E-factura */}
          <a href="https://efactura.st/index" target='_blank' className='flex items-center justify-center bg-light-gray p-5'>     
            <Image src={Efactura} alt="e-factura" objectFit="contain" />
          </a>

          {/* Logo Direção dos Impostos */}
          <a href="https://impostos.financas.gov.st/" target='_blank' className='bg-light-gray p-5 flex items-center justify-center'>       
              <Image src={DireccaoImpostos} alt="Direção dos Impostos" objectFit="contain" />
          </a>

          {/* Logo Banco Central */}
          <a href="https://bcstp.st/" target='_blank' className='flex items-center justify-center bg-light-gray p-5 '>
              <Image src={BancoCentral} alt="Banco Central" objectFit="contain" />
          </a>    

          {/* Logo IMF */}
          <a href="https://www.imf.org/en/Home" target='_blank' className='flex items-center justify-center bg-light-gray p-10'>           
              <Image src={IMF} alt="International Monetary Fund" objectFit="contain" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogos;
