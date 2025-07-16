"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AxiosHttpClient } from "@/settings/axios";
import qs from "qs";

type Dir = {
  name?: string;
  documentId?: string;
  acronym?: string;
  content?: string;
  webpage?: string;
};

type Ministerio = {
  name?: string;
  documentId?: string;
  acronym?: string;
  logo?: string;
};

type Contato = {
  location?: string;
  phone?: string;
  tel?: string;
  mail?: string;
  webpage?: string;
  photos?: ImageType[];
  linkmap?: string;
};

type ImageType = {
  name: string;
  documentId: string;
  url: string;
  alternativeText: string;
  formats: { [k in "large" | "medium" | "small"]: ImageType };
};

const ServicosContext = createContext<ServicosContext>({} as ServicosContext);

export const ServicosProvider = ({ children }: ServicosProvider) => {
  const [direcoes, setDirecoes] = useState<Dir[]>([]);
  const [ministerio, setMinisterio] = useState<Ministerio>({});
  const [contato, setContato] = useState<Contato>({});
  const [selectedDirecao, setSelectedDirecao] = useState<Dir>({});

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const index = direcoes.findIndex(
        ({ acronym }) => hash.toLowerCase() === acronym?.toLowerCase()
      );

      if (hash === "") {
        setSelectedDirecao(direcoes[0] || {});
        return;
      }

      if (index !== -1) {
        setSelectedDirecao(direcoes[index]);
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
    AxiosHttpClient.get("/directions?populate=*").then(({ data: { data } }) => {
      setDirecoes(data);
    });

    const query = qs.stringify(
      {
        sort: ["createdAt:desc"],
        pagination: {
          start: 0,
          limit: 1,
        },
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

    AxiosHttpClient.get(`/ministries?${query}`).then(({ data: { data } }) => {
      setMinisterio(data?.[0] || {});
    });

    AxiosHttpClient.get(`/contacts?${query}`).then(({ data: { data } }) => {
      setContato(data?.[0] || {});
    });
  }, []);

  return (
    <ServicosContext.Provider
      value={{
        direcoes,
        setDirecoes,
        selectedDirecao,
        setSelectedDirecao,
        ministerio,
        contato,
      }}
    >
      {children}
    </ServicosContext.Provider>
  );
};

export const useServicos = () => useContext(ServicosContext);

interface ServicosProvider {
  children: ReactNode;
}

interface ServicosContext {
  setDirecoes: Dispatch<SetStateAction<Dir[]>>;
  selectedDirecao: Dir;
  direcoes: Dir[];
  setSelectedDirecao: Dispatch<SetStateAction<Dir>>;
  ministerio: Ministerio;
  contato: Contato;
}
