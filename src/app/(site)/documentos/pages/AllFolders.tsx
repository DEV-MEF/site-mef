import React from 'react';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

const AllFolders = () => {
  const folders = [
    { title: 'GAMAP', documents: 8 },
    { title: 'GARFIP', documents: 3 },
    { title: 'COSSIL', documents: 3 },
    { title: 'UMAP', documents: 3 },
    { title: 'UIF', documents: 8 },
    { title: 'TESOURO', documents: 3 },
    { title: 'PLANEAMENTO', documents: 8 },
    { title: 'PATRIMÔNIO', documents: 3 },
    { title: 'PAGEF', documents: 3 },
    { title: 'MINISTÉRIO', documents: 3 },
    { title: 'ORÇAMENTO', documents: 8 },
    { title: 'AFAP', documents: 3 },
    { title: 'IMPOSTO', documents: 3 },
    { title: 'ITIE', documents: 3 },
    { title: 'GSAFE', documents: 3 },
    { title: 'DITEI', documents: 3 },
    { title: 'CONTABILIDADE', documents: 3 },
    { title: 'CONCURSO', documents: 3 },
    { title: 'CIAD', documents: 3 },
    { title: 'ALFÂNDEGA', documents: 3 },
    { title: 'ADMIN. PÚBLICA', documents: 3 },
  ];

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
          <i className="pi pi-inbox mr-2"></i> 24 Resultados
        </p>
      </div>

      {/* Grid of Folders */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {folders.map((folder, index) => (
          <div
            key={index}
            className="p-4 border border-[#D6DDEB] rounded-lg text-center flex flex-col items-center cursor-pointer efects hover:border-[#5151F8]">
            <i
              className="pi pi-folder text-3xl text-[#5151F8] mb-3"
              style={{ display: 'block' }}
            ></i>
            <p className="text-[#3B4158] text-sm font-semibold mb-2">{folder.title}</p>
            <div
              className="py-1 text-[#5151F8] bg-[#F8F8FD] rounded text-xs px-3"
              style={{ fontSize: '12px' }}
            >
              {folder.documents} Documentos
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFolders;
