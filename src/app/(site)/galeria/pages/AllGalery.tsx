import Image from 'next/image';
import Notices from '@/assets/notice1.jpg';

export default function AllGalery() {
    return (
        <div className="">
            <div className="flex flex-col mb-6 gap-2">
                <h2 className="font-bold text-[16px] text-primary-blue">Galeria</h2>
                <p className='text-text-second font-light'>Veja a nossa Galeria e acompanhe as nossas actividades!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                <div className="relative w-full h-72 md:h-72 lg:h-72 rounded overflow-hidden shadow-md">
                    <Image src={Notices} alt="Vídeo Principal" fill className="rounded object-cover" />

                    <div className="absolute bottom-0 flex flex-col items-start">
                        <div className="bg-primary-blue text-white text-xs px-4 py-2 md:mx-3 lg:mx-5 mx-5 font-semibold">
                        Galeria
                        </div>
                        <div className="md:mt-2 mt-1 cursor-pointer text-white font-light md:text-[14px] lg:text-[14px] text-[14px] bg-dark-gray bg-opacity-40 md:px-3 lg:px-5 md:py-3 lg:py-5 py-2 px-5">
                            DELEGAÇÃO DO BAD VISITA STP PARA AVALIAR AS PRIORIDADES E AGENDA DO GOVERNO


                            <small className='text-text-light font-semibold mt-3 block'>3 Fotos</small>
                        </div>
                    </div>
                </div>
                <div className="relative w-full h-72 md:h-72 lg:h-72 rounded overflow-hidden shadow-md">
                    <Image src={Notices} alt="Vídeo Principal" fill className="rounded object-cover"  />

                    <div className="absolute bottom-0 flex flex-col items-start">
                        <div className="bg-primary-blue text-white text-xs px-4 py-2 md:mx-3 lg:mx-5 mx-5 font-semibold">
                        Galeria
                        </div>
                        <div className="md:mt-2 mt-1 cursor-pointer text-white font-light md:text-[14px] lg:text-[14px] text-[14px] bg-dark-gray bg-opacity-40 md:px-3 lg:px-5 md:py-3 lg:py-5 py-2 px-5">
                            DELEGAÇÃO DO BAD VISITA STP PARA AVALIAR AS PRIORIDADES E AGENDA DO GOVERNO

                            <small className='text-text-light font-semibold mt-3 block'>3 Fotos</small>
                        </div>
                    </div>
                </div>
                <div className="relative w-full h-72 md:h-72 lg:h-72 rounded overflow-hidden shadow-md">
                    <Image src={Notices} alt="Vídeo Principal" fill className="rounded object-cover" />

                    <div className="absolute bottom-0 flex flex-col items-start">
                        <div className="bg-primary-blue text-white text-xs px-4 py-2 md:mx-3 lg:mx-5 mx-5 font-semibold">
                        Galeria
                        </div>
                        <div className="md:mt-2 mt-1 cursor-pointer text-white font-light md:text-[14px] lg:text-[14px] text-[14px] bg-dark-gray bg-opacity-40 md:px-3 lg:px-5 md:py-3 lg:py-5 py-2 px-5">
                            DELEGAÇÃO DO BAD VISITA STP PARA AVALIAR AS PRIORIDADES E AGENDA DO GOVERNO

                            <small className='text-text-light font-semibold mt-3 block'>3 Fotos</small>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}
