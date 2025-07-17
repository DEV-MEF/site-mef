"use client";
import React, {useEffect} from "react";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import { useHookFolders } from "@/components/hooks/folders";
import SectionTitle from "@/components/layout/title";
import { DocumentsRepositorySkeleton } from "@/components/layout/skeleton/documents-repository";
//DocumentsRepositorySkeleton
const AllFolders = () => {
  const { onClickFolder, folders, loading, setFoldersSelected } =  useHookFolders("document");

  useEffect(() => {
      setFoldersSelected([])
  }, [setFoldersSelected]);

  if (loading) {
    return <DocumentsRepositorySkeleton />;
  }

  if (folders.length === 0 && !loading) {
    return (
      <section className="w-full container max-w-[88rem] mx-auto px-4 py-10">
        <div className="mt-10">
          <SectionTitle text="REPOSITÓRIO" />
        </div>
        <p className="text-sm text-[#3b4158a8] flex items-center my-12">
          <i className="pi pi-inbox mr-2"></i> Nenhum resultado encontrado.
        </p>
      </section>
    );
  }
  return (
    <section className="w-full container max-w-[88rem] mx-auto px-4 py-10 min-h-[700px]">
      {/* Title and Results */}
      <div className="w-full flex justify-between items-center my-12">
        <SectionTitle text="REPOSITÓRIO" />
        <p className="text-sm text-[#3b4158a8] flex items-center">
          <i className="pi pi-inbox mr-2"></i> {folders.length} Resultado
          {folders.length === 1 ? "" : "s"}
        </p>
      </div>

      {/* Grid of Folders */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {folders.map((folder, index) => {
            const count = folder.docs+folder.children;
          return (
            <div
              key={index}
              className="p-4 border border-[#D6DDEB] rounded-lg text-center flex flex-col items-center cursor-pointer efects hover:border-[#5151F8]"
              onClick={() => {
                onClickFolder(folder);
              }}
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
                {count ?? "--"} Ite{count === 1 ? "m" : "ns"}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AllFolders;
