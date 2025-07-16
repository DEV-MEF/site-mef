import { useEffect, useState } from "react";
import { AxiosHttpClient } from "@/settings/axios";
import {notFound, useRouter} from "next/navigation";

const APIS = {
  document: {
    filesApi: "docs",
    categoriesApi: "docs-categories",
    linkToFiles: "publicacoes/documentos",
  },
  legislation: {
    filesApi: "legislations",
    categoriesApi: "legislation-folders",
    linkToFiles: "publicacoes/legislacoes",
  },
};
export const useHookFolders = (api: "document" | "legislation", superfolder: string | null = null) => {
  const router = useRouter();
  const [updateCount, setUpdateCount] = useState<boolean>(true);
  const [folders, setFolders] = useState<Folders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [listCountByDocumentId, setListCountByDocumentId] =
    useState<CountFileInFolder>({});

  const { filesApi, categoriesApi, linkToFiles } = APIS[api];

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

  useEffect(() => {
    if (updateCount && folders.length > 0) {
      try {
        folders.forEach(({ documentId, id }) => {
          AxiosHttpClient.get(
            `/${filesApi}?filters[folder][documentId][$eq]=${documentId}&pagination[limit]=1`
          ).then(({ data: { meta } }) => {
            listCountByDocumentId[documentId] = (listCountByDocumentId[documentId] || 0) + meta.pagination.total;
            setListCountByDocumentId(listCountByDocumentId);
            setFolders([...folders]);
          });

          AxiosHttpClient.get(
              `/${categoriesApi}?filters[superfolder][$eq]=${id}&&pagination[limit]=1`
          ).then(({ data: { meta } }) => {
            listCountByDocumentId[documentId] =  (listCountByDocumentId[documentId] || 0) + meta.pagination.total;
            setListCountByDocumentId(listCountByDocumentId);
            setFolders([...folders]);
          });
        });
        setUpdateCount(false);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Erro ao carregar documentos"
        );
      } finally {
        setLoading(false);
      }
    }
  }, [filesApi, folders, updateCount, listCountByDocumentId, categoriesApi]);

  interface Folders {
    documentId: string;
    name: string;
    id: string;
  }

  interface CountFileInFolder {
    [k: string]: number;
  }

  const onClickFolder = ({ documentId }: Folders) => {
      router.push(`/${linkToFiles}/${documentId}`);
  };

  return {
    loading,
    error,
    updateCount,
    setUpdateCount,
    folders,
    setFolders,
    listCountByDocumentId,
    setListCountByDocumentId,
    onClickFolder,
  };
};
