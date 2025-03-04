"use client"
import React from 'react';
import Image from 'next/image'
import Logo from '@/assets/brasao1.png'
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {useRouter} from "next/navigation";


export function Header(){

    const router = useRouter();
    const menuItems = [
        {
            label: 'HOME',
            command: () => router.push("/")
        },
        {
            label: 'MINISTÉRIO',
            items: [
                { label: 'Sobre Nós', command: () => router.push("/AboutUs") },
                { label: 'O que fazemos', command: () => router.push("/HowToDo") },
                { label: 'Nossa Equipa', command: () => router.push("/OurTeam") }
            ],
        },
        {
            label: 'DIREÇÕES',
            items: [
                { label: 'Direcção de Tesouro', command: () => router.push("/direcoes") },
                { label: 'Direcção de Orçamento', command: () => router.push("/direcoes") },
                { label: 'Direcção do Património', command: () => router.push("/direcoes") },
                { label: 'Direcção dos Impostos', command: () => router.push("/direcoes") },
                { label: 'Direcção de Contabilidade', command: () => router.push("/direcoes") },
                { label: 'Direcção de Tecnologia de Informação', command: () => router.push("/direcoes") },
                { label: 'Direcção das Alfândegas', command: () => router.push("/direcoes") },
                { label: 'Direcção do Planeamento', command: () => router.push("/direcoes") },
            ],
        },
        {
            label: 'PUBLICAÇÕES',
            items: [
                { label: 'Notícia', command: () => router.push("/notice") },
                { label: 'Comunicado de imprensa', command: () => console.log('Menu item 1 clicked') },
                { label: 'Anúncios', command: () => console.log('Menu item 1 clicked') },
                { label: 'Entrevistas', command: () => console.log('Menu item 1 clicked') },
                { label: 'Eventos', command: () => console.log('Menu item 1 clicked') },
                { label: 'Galeria de imagens', command: () => router.push("/galeria") },
                { label: 'Multimédia', command: () => router.push("/multimedia") },
                { label: 'Documentos', command: () => router.push("/documentos") },

            ],
        },
        {
            label: 'CONTACTE-NOS',
            command: () => router.push("/contactos")
        }
    ];



    return(
        <header className="w-full fixed shadow-[0_2px_28px_0_rgba(0,0,0,0.06)] z-50">
            <div className="relative h-[30px] md:flex hidden items-center justify-end pr-4 text-white text-sm">
                <div className="absolute inset-0 bg-primary-blue clip-diagonal z-10"/>
                <div className="absolute inset-y-0 right-0 w-full bg-gray-800" />
                <span className="relative z-10 text-[11px] block md:block">
                    Ministério da Economia e Finanças da República Democrática de São Tomé e Príncipe
                </span>
            </div>
            <div className="w-full h-24 md:px-10 lg:px-44 bg-white flex justify-between items-center px-10">
                <div >
                    <Image src={Logo} alt='Logo' className='md:w-[95px] w-[70px]'/>
                </div>
                <div >
                <Menubar
                        model={menuItems}
                        className="border-none shadow-none bg-transparent"

                    />
                </div>
            </div>
        </header>

    )
}
