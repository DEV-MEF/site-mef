"use client"
import {
    createContext, Dispatch,
    ReactNode, SetStateAction,
    useContext, useEffect, useState
} from 'react'
import {AxiosHttpClient} from "@/settings/axios";

type Dir = {
    name?: string
    documentId?: string
    acronym?: string
    content?: string
    webpage?: string
}

const ServicosContext = createContext<ServicosContext>({} as ServicosContext)

export const ServicosProvider = ({ children }: ServicosProvider) => {

    const [direcoes, setDirecoes] = useState<Dir[]>([]);
    const [selectedDirecao, setSelectedDirecao] = useState<Dir>({});

    useEffect(() => {
        const handleHashChange = () => {
            const hash  = window.location.hash.replace("#", "");
            const index = direcoes.findIndex(({acronym}) => hash === acronym);

            console.log({hash})
            if (hash === ""){
                setSelectedDirecao(direcoes[0] || {})
                return
            }

            if(index !== -1){
                setSelectedDirecao(direcoes[index])
            }
        };

        // Captura o hash na primeira renderização
        handleHashChange();

        // Adiciona um listener para mudanças no hash
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, [direcoes]);

    useEffect(() => {
        AxiosHttpClient.get("/directions?populate=*").then(({data : {data}}) => {
            setDirecoes(data);
        });
    }, [])

    return (
        <ServicosContext.Provider
            value={{
                direcoes,
                setDirecoes,
                selectedDirecao,
                setSelectedDirecao
            }}
        >
            {children}
        </ServicosContext.Provider>
    )
}

export const useServicos = () => useContext(ServicosContext)

interface ServicosProvider {
    children: ReactNode
}

interface ServicosContext {
    direcoes: Dir[]
    setDirecoes: Dispatch<SetStateAction<Dir[]>>
    selectedDirecao: Dir,
    setSelectedDirecao: Dispatch<SetStateAction<Dir>>
}

