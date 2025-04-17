import Image from 'next/image';
import Notices from '@/assets/notice1.jpg';

const MultimediaSection = () => {
  const videos = [
    {
      title: 'DELEGAÇÃO DO BAD VISITA STP PARA AVALIAR AS PRIORIDADES E AGENDA DO GOVERNO',
      thumbnailUrl: Notices,
    },
    {
      title: 'DELEGAÇÃO DO BAD VISITA STP PARA AVALIAR AS PRIORIDADES E AGENDA DO GOVERNO',
      thumbnailUrl: Notices,
    },
    {
      title: 'DELEGAÇÃO DO BAD VISITA STP PARA AVALIAR AS PRIORIDADES E AGENDA DO GOVERNO',
      thumbnailUrl: Notices,
    },
  ];

  return (
    <div className="p-3 mt-20 bg-white">
      <div className='flex justify-between py-5 items-center'>
      <div className="flex flex-col mb-12 gap-2">
           <h2 className="font-bold uppercase text-[16px] text-primary-blue">Vídeos</h2>
            <p className='text-text-second font-light'>Confira aqui os vídeos mais recentes e mantenha-se atualizado sobre tudo o que está acontecendo em primeira mão!</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-6 md:gap-3">

        {/* Vídeo em Destaque */}
        <div className="relative w-full h-72 md:h-72 lg:h-96 rounded overflow-hidden shadow-md">
          <Image src={Notices} alt="Vídeo Principal" fill className="rounded object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white rounded-full shadow-lg hover:bg-gray-100 transition">
              <svg className="w-10 h-10 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <div className="absolute bottom-0 flex flex-col items-start">
            <div className="bg-primary-blue text-white text-xs px-4 py-2 md:mx-3 lg:mx-16 mx-5 font-light">
               VÍDEOS DO MINISTÉRIO
            </div>
            <div className="md:mt-2 mt-1 text-white font-light md:text-[14px] lg:text-[16px] text-[14px] bg-dark-gray bg-opacity-40 md:px-3 lg:px-16 md:py-3 lg:py-5 py-2 px-5">
              DELEGAÇÃO DO BAD VISITA STP PARA AVALIAR AS PRIORIDADES E AGENDA DO GOVERNO
            </div>
          </div>

        </div>

        {/* Lista de Vídeos */}
        <div className="space-y-5 md:space-y-3 md:px-2 lg:px-5 p-0 ">
          {videos.map((video, index) => (
            <div key={index} className="md:flex d-block items-center gap-9 lg:gap-5 md:gap-3 p-1 hover:bg-gray-100 transition">
              <div className="relative w-[216px] md:h-[80px] h-[150px] lg:h-[114px] overflow-hidden shadow-sm">
                <Image unoptimized src={video.thumbnailUrl} alt="Thumbnail do Vídeo" fill className="rounded object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white p-1 rounded-full shadow-md hover:bg-gray-200 transition overflow-hidden">
                    <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-text-primary text-sm md:text-[12px] text-wrap lg:text-sm font-light lg:w-80 md:leading-5 lg:leading-loose leading-5 my-2 md:my-0">{video.title}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MultimediaSection;
