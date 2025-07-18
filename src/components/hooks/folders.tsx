import {useCallback, useEffect, useState} from "react";
import { AxiosHttpClient } from "@/settings/axios";
import {useRouter} from "next/navigation";
import {usePdfViewer} from "@/components/contexts/pdf-viewer";

const APIS = {
  document: {
    categoriesApi: "docs-categories",
    linkToFiles: "publicacoes/documentos",
  },
  legislation: {
    categoriesApi: "legislation-folders",
    linkToFiles: "publicacoes/legislacoes",
  },
};
export const useHookFolders = (api: "document" | "legislation", superfolder: string | null = null) => {
  const router = useRouter();
  const [updateCount, setUpdateCount] = useState<boolean>(true);
  const [folders, setFolders] = useState<Folders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {setFoldersSelected, foldersSelected} = usePdfViewer();
  const [error, setError] = useState<string | null>(null);

  const { categoriesApi, linkToFiles } = APIS[api];

  useEffect(() => {
    try {
      AxiosHttpClient.get(`/${categoriesApi}/?filters[superfolder]${superfolder ? `[documentId][$eq]=${superfolder}` : `[$null]=true`}&populate=*`).then(
          ({data: {data}}) => {
            setFolders(data);
          }
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao carregar pastas"
      );
    } finally {
      setLoading(false);
    }
  }, [categoriesApi, superfolder]);
  interface Folders {
    documentId: string;
    name: string;
    id: string;
    docs: number
    children: number
  }

  // Função para simular o router.back() (para teste)
  const goBack = () => {
    if (foldersSelected.length > 1) {
      const newFoldersSelected = [...foldersSelected];
      newFoldersSelected.pop();
      setFoldersSelected(newFoldersSelected);
      setTimeout(() => {
        router.replace(`./${newFoldersSelected?.[newFoldersSelected.length - 1]?.documentId}`);
      })
    } else {
      router.back();
    }
  };

  const onClickFolder = (folder: Folders, isChildren: boolean) => {
    foldersSelected.push(folder);
    setFoldersSelected(foldersSelected);
    if(isChildren){
      router.replace(`/${linkToFiles}/${folder.documentId}`);
      return
    }
    router.push(`/${linkToFiles}/${folder.documentId}`);
  };

  return {
    loading,
    error,
    updateCount,
    setUpdateCount,
    folders,
    setFolders,
    onClickFolder,
    foldersSelected,
    setFoldersSelected,
    goBack
  };
};
