import React from 'react';
import Image from 'next/image';
import Notices from '@/assets/notice.png'
import Notices1 from '@/assets/notice1.jpg'

export default function AllNotice() {
    const newsItems = [
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices, 
        },
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices1,
        },
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices,
        },
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices, 
        },
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices1,
        },
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices,
        },
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices, 
        },
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices1,
        },
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices,
        },
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices, 
        },
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices1,
        },
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices,
        },
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices, 
        },
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices1,
        },
        {
        date: '16 Maio De 2024',
        title: 'ZUNTAMON LCI - Nota de Atribuição do con...',
        description: 'Anexo: ZLCI - AVIS D\'INFORMATION - REALISATION D\'AUDIT COMPTABLE POUR EXERCICES 2022,2023 ET 2024...',
        imageUrl: Notices,
        },
    ];

    return (
        <div className="">
            <div className="flex flex-col mb-6 gap-2">
                <h2 className="font-bold text-[16px] text-primary-blue">ÚLTIMAS NOTÍCIAS</h2>
                <p className='text-text-second font-light'>Acompanhe as últimas notícias e fique sempre atualizado com as novidades em tempo real!</p>
            </div>
            <div className="py-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                    {newsItems.map((item, index) => (
                    <div key={index} className="bg-white shadow-[0_-10px_39px_0_rgba(8,18,109,.1)] rounded overflow-hidden">
                        <div className="relative">
                        <Image src={item.imageUrl} alt="News Image" className="w-full h-[200px] md:h-[250px] object-cover" />
                        </div>
                        <div className="px-4 md:px-6 lg:px-7 py-4 flex flex-col gap-2">
                        <div className="flex items-center text-text-light text-xs mb-2">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 2a1 1 0 000 2h8a1 1 0 100-2H6zM3 5a2 2 0 012-2h10a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm3 1a1 1 0 100 2h8a1 1 0 100-2H6z" />
                            </svg>
                            {item.date}
                        </div>
                        <h3 className="text-text-primary font-bold text-sm mb-1">{item.title}</h3>
                        <p className="text-text-second text-xs font-normal mb-4">{item.description}</p>
                        <button className="text-sm w-28 my-3 text-primary-blue px-4 py-2 border border-primary-blue hover:bg-primary-blue hover:text-white">
                            Ler Mais
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}