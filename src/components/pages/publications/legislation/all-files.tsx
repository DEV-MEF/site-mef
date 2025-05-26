"use client";
import React, { useEffect, useState } from "react";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import { AxiosHttpClient } from "@/settings/axios";
import { usePdfViewer } from "@/components/contexts/pdf-viewer";
import { useHookFolders } from "@/components/hooks/folders";
import Banner from "../../banner";

type File = {
  url: string;
  name: string;
};

type Doc = {
  documentId: string;
  name: string;
  files: File;
};

const AllFiles = ({ params }: { params: Promise<{ documentId: string }> }) => {
  const { onClickFolder, folders, listCountByDocumentId } =
    useHookFolders("document");

  const [files, setFiles] = useState<Doc[]>([]);
  const { openNewDocument } = usePdfViewer();

  useEffect(() => {
    (async () => {
      const { documentId } = await params;
      AxiosHttpClient.get(
        `/docs?filters[folder][documentId][$eq]=${documentId}&populate=*`
      ).then(({ data: { data } }) => {
        setFiles(data);
      });
    })();
  }, [params]);

  return (
    <section className=" w-full">
      <Banner
        text_1="Publicaçoes"
        text_2="Legislações"
        link_1="/publicacoes"
        link_2="/publicacoes/legislacoes"
        text_3="Repositorio qq"
      />
      <div className="w-full container px-4 max-w-[88rem] mx-auto py-10">
        {/* Title and Results */}
        <div className="flex justify-between items-center my-12">
          <h1 className="text-xl font-semibold text-[#3B4158]">REPOSITÓRIO</h1>
          <p className="text-sm text-[#3b4158a8] flex items-center">
            <i className="pi pi-inbox mr-2"></i> {files.length} Resultado
            {files.length === 1 ? "" : "s"}
          </p>
        </div>

        {/* Grid of Folders */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {folders.map((folder, index) => {
            const count = listCountByDocumentId[folder.documentId];
            return (
              <div
                key={index}
                onClick={() => {
                  onClickFolder(folder);
                }}
                className="p-4 border border-[#D6DDEB] rounded-lg text-center flex flex-col items-center cursor-pointer efects hover:border-[#5151F8]"
              >
                <i
                  className="pi pi-folder text-3xl text-[#5151F8] mb-3"
                  style={{ display: "block" }}
                ></i>
                <p className="text-[#3B4158] text-sm font-semibold mb-2">
                  {folder.name}
                </p>
                <div
                  className="py-1 text-[#5151F8] bg-[#F8F8FD] rounded text-xs px-3"
                  style={{ fontSize: "12px" }}
                >
                  {count} Documento{count === 1 ? "" : "s"}
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-14">
          {files.map((doc, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white border border-[#E2E8F0] rounded-lg p-4 efects hover:border-[#5151F8]"
            >
              {/* Ícone do documento */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#F8FAFC]">
                  <i className="pi pi-file text-[#5151F8] text-2xl"></i>
                </div>
                {/* Títulos */}
                <div>
                  <p className="text-[#1E293B]/90 font-semibold">{doc.name}</p>
                  <p className="text-[#64748B] text-sm">{doc.files.name}</p>
                </div>
              </div>

              {/* Ações */}
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <button
                  className="cursor-pointer flex items-center justify-center w-8 h-8 border border-[#E2E8F0] rounded-full text-[#64748B]"
                  title="Visualizar"
                  onClick={() => {
                    openNewDocument({
                      name: doc.name,
                      uri: doc.files.url,
                      id: doc.documentId,
                    });
                  }}
                >
                  <i className="pi pi-eye"></i>
                </button>
                <button
                  className="cursor-pointer flex items-center justify-center w-8 h-8 border border-[#E2E8F0] rounded-full text-[#64748B]"
                  title="Informação"
                >
                  <i className="pi pi-info-circle"></i>
                </button>
                <button
                  className="cursor-pointer flex items-center justify-center w-8 h-8 border border-[#E2E8F0] rounded-full text-[#64748B]"
                  title="Download"
                >
                  <i className="pi pi-download"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllFiles;
