"use client";
import React, { useEffect, useState } from "react";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import { AxiosHttpClient } from "@/settings/axios";
import { Documents, usePdfViewer } from "@/components/contexts/pdf-viewer";
// import { useHookFolders } from "@/components/hooks/folders";
import Banner from "../../banner";
import { ArrowDownToLine, CornerUpLeft, Eye, FileText } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { CornerUpLeft } from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";
import { RepositoryDocumentsSkeleton } from "@/components/layout/skeleton/documents-repositories";
import { useHookFolders } from "@/components/hooks/folders";
import {useHookFolders} from "@/components/hooks/folders";
import PaginationComponent from "@/components/pages/news/pagination";

type File = {
  url: string;
  name: string;
};

type Doc = {
    documentId: string;
    name: string;
    files: File;
    folder: {
        path: string;
    }
};

let urlServer = "";
if (typeof window !== "undefined" && window.location?.origin) {
  urlServer = window.location.origin;
}

type Meta = {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
};

const AllFiles = ({ params }: { params: Promise<{ documentId: string }> }) => {
  const { documentId } = React.use(params);
  const [files, setFiles] = useState<Doc[]>([]);
  const [meta, setMeta] = useState<Meta>();
  const [loading, setLoading] = useState<boolean>(true);
  const { openNewDocument } = usePdfViewer();
  const {folders, foldersSelected, setFoldersSelected} = useHookFolders("document", documentId);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
      const page = Number(searchParams.get("page")) || 1;
      const pageSize = 10;

      AxiosHttpClient.get(
        `/docs?filters[folder][documentId][$eq]=${documentId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`
      ).then(({ data: { data, meta } }) => {
        setLoading(false);
        setMeta(meta);
        setFiles(data);
      });
  }, [documentId, searchParams]);

    useEffect(() => {
        if(files.length && !foldersSelected.length){
            const {folder: {path}} = files[0];
            setFoldersSelected(path.trim().split("/").map((name) => ({name})));
        }
    }, [files, setFoldersSelected, foldersSelected]);

  if ((files.length+folders.length)=== 0 && !loading) {
    return (
      <section className="w-full">
        <Banner
          text_1="Publicaçoes"
          text_2="Documentos"
          link_1="#"
          link_2="/publicacoes/documentos"
          items={foldersSelected.map((folder) => ({
              name: folder.name || documentId,
              link: "#"
          }))}
          onItemClick={(index) => {
              const updated = foldersSelected.slice(0, index + 1);
              setFoldersSelected(updated);
          }}
        />
        <div className="w-full container max-w-[88rem] mx-auto px-4 py-10">
          <div className="flex justify-between items-center my-12">
            <CornerUpLeft
              className="text-primary-blue/80 hover:text-primary-blue/90 cursor-pointer"
              onClick={() => {
                foldersSelected.pop();
                setFoldersSelected(foldersSelected);
                router.back();
              }}
              xlinkTitle="Voltar"
            />
            <p className="text-sm text-[#3b4158a8] flex items-center">
              <i className="pi pi-inbox mr-2"></i>{" "}
              {files.length + folders.length} Resultados
            </p>
          </div>

          <FolderChildren documentId={documentId} />
          <p className="text-sm text-[#3b4158a8] flex items-center my-12 mt-10">
            <i className="pi pi-inbox mr-2"></i> Nenhum resultado encontrado.
          </p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className=" w-full">
        <Banner
          text_1="Publicaçoes"
          text_2="Documentos"
          link_1="#"
          link_2="/publicacoes/documentos"
          items={foldersSelected.map((folder) => ({
              name: folder.name || documentId,
              link: "#"
          }))}
          onItemClick={(index) => {
              const updated = foldersSelected.slice(0, index + 1);
              setFoldersSelected(updated);
          }}
        />
        <RepositoryDocumentsSkeleton />
      </section>
    );
  }

  const handleDownload = (file: Documents) => {
    if (file?.uri) {
      console.log({ selectedDocument: urlServer + file.uri });
      const downloadUrl = urlServer + file.uri;
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.name || "document.pdf"; // Use document name or a default
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className=" w-full">
      <Banner
        text_1="Publicaçoes"
        text_2="Documentos"
        link_1="#"
        link_2="/publicacoes/documentos"
        items={foldersSelected.map((folder) => ({
            name: folder.name || documentId,
            link: "#"
        }))}
        onItemClick={(index) => {
            const updated = foldersSelected.slice(0, index + 1);
            setFoldersSelected(updated);
        }}
      />
      <div className="w-full container px-4 max-w-[88rem] mx-auto py-10 -mt-8 md:mt-0">
        {/* Title and Results */}
        <div className="flex justify-between items-center my-12">
          {/* <SectionTitle text="REPOSITÓRIO"/> */}
          <CornerUpLeft
            className="text-primary-blue/80 hover:text-primary-blue/90 cursor-pointer"
            onClick={() => {
              foldersSelected.pop();
              setFoldersSelected(foldersSelected);
              router.back();
            }}
            xlinkTitle="Voltar"
          />
          <p className="text-sm text-[#3b4158a8] flex items-center">
            <i className="pi pi-inbox mr-2"></i> {files.length + folders.length}{" "}
            Resultado
            {files.length + folders.length === 1 ? "" : "s"}
          </p>
        </div>

        <FolderChildren documentId={documentId} />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {files.map((doc, index) => (
            <div
              key={index}
              className="flex items-start lg:items-center justify-between bg-white border border-[#E2E8F0] rounded-lg p-[14px] efects hover:border-[#5151F8]"
            >
              {/* Ícone do documento */}
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="flex items-center justify-center w-auto h-auto rounded-lg bg-[#F8FAFC] p-2">
                  <FileText className=" text-[#5151F8] size-5" />
                </div>
                {/* Títulos */}
                <div>
                  <p
                    className="text-[#1E293B]/90 font-semibold line-clamp-1 text-sm md:text-base"
                    title={doc.name}
                  >
                    {doc.name}
                  </p>
                  {/* <p className="text-[#64748B] text-sm">{doc.files.name}</p> */}
                </div>
              </div>

              {/* Ações */}
              <div className="flex items-center space-x-2 md:space-x-4 mt-2 lg:mt-0 ml-2">
                <button
                  className="cursor-pointer flex items-center justify-center w-7 h-7 md:w-8 md:h-8 border border-[#E2E8F0] hover:border-[#5151F8] rounded-full text-[#64748B] hover:text-[#5151F8]"
                  title="Visualizar"
                  onClick={() => {
                    openNewDocument({
                      name: doc.name,
                      uri: doc.files.url,
                      id: doc.documentId,
                    });
                  }}
                >
                  <Eye className="size-4 md:size-5"  />
                </button>
                <button
                  className="cursor-pointer flex items-center justify-center w-7 h-7 md:w-8 md:h-8 border border-[#E2E8F0] hover:border-[#5151F8] rounded-full text-[#64748B] hover:text-[#5151F8]"
                  title="Descarregar"
                  onClick={() => {
                    handleDownload({
                      uri: doc.files.url,
                      name: doc.name,
                    });
                  }}
                >
                  <ArrowDownToLine className="size-4 md:size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
        {meta && <PaginationComponent pagination={meta.pagination} />}
    </section>
  );
};


const FolderChildren = ({documentId}: {documentId: string}) => {
  const {onClickFolder, folders} = useHookFolders("document", documentId);

  {/* Grid of Folders */}
  return folders.length > 0 &&
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {folders.map((folder, index) => {
          const count = folder.children+folder.docs;
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
                {count} Ite{count === 1 ? "m" : "ns"}
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default AllFiles;
