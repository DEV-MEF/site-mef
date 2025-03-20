"use client"
import React, {useEffect, useState} from 'react';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import {AxiosHttpClient} from "@/settings/axios";
import {useRouter} from "next/navigation";

interface Folders {
    documentId: string
    nome: string
}

interface CountFileInFolder {
    [k: string]: number
}

const AllFolders = () => {
    const router = useRouter()
    const [updateCount, setUpdateCount] = useState<boolean>(true);
    const [folders, setFolders] = useState<Folders[]>([]);
    const [listCountByDocumentId, setListCountByDocumentId] = useState<CountFileInFolder>({});
    useEffect(() => {
        AxiosHttpClient.get("/docs-categories?populate=*").then(({data}) => {
            setFolders(data)
        })
    }, []);


    useEffect(() => {
        if (updateCount && folders.length > 0) {
            folders.forEach(({documentId}) => {
                AxiosHttpClient.get(`/docs?filters[folder][documentId][$eq]=${documentId}`).then(({data}) => {
                    listCountByDocumentId[documentId] = data.length
                    setListCountByDocumentId(listCountByDocumentId)
                    setFolders([...folders])
                })
            })
            setUpdateCount(false)
        }
    }, [folders, updateCount]);

    const onClickFolder = ({documentId}: Folders) => {
        if (listCountByDocumentId[documentId] > 0) {
            router.push(`/documentos/${documentId}`);
        }
    }

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div
        className="px-6 py-6 bg-[#F8FAFC] rounded mb-6"
        style={{ border: '1px solid #D6DDEB' }}
      >
        <p className="text-[#3B4158] text-sm flex items-center">
          Home &raquo; Publicações &raquo; <span className="font-semibold"> Documentos</span>
        </p>
      </div>

      {/* Title and Results */}
      <div className="flex justify-between items-center my-12">
        <h1 className="text-xl font-semibold text-[#3B4158]">REPOSITÓRIO</h1>
        <p className="text-sm text-[#3B4158] flex items-center">
          <i className="pi pi-inbox mr-2"></i> {folders.length} Resultados
        </p>
      </div>

      {/* Grid of Folders */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {folders.map((folder, index) => (
          <div
            key={index}
            className="p-4 border border-[#D6DDEB] rounded-lg text-center flex flex-col items-center cursor-pointer efects hover:border-[#5151F8]"
            onClick={() => {
                onClickFolder(folder)
            }}
          >
            <i
              className="pi pi-folder text-3xl text-[#5151F8] mb-3"
              style={{ display: 'block' }}
            ></i>
            <p className="text-[#3B4158] text-sm font-semibold mb-2">{folder.nome}</p>
            <div
              className="py-1 text-[#5151F8] bg-[#F8F8FD] rounded text-xs px-3"
              style={{ fontSize: '12px' }}
            >
              {listCountByDocumentId[folder.documentId] ?? "--"} Documentos
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFolders;
