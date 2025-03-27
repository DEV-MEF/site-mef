import {useEffect, useState} from "react";
import {AxiosHttpClient} from "@/settings/axios";
import {useRouter} from "next/navigation";

const APIS = {
    document: {
        filesApi: "docs",
        categoriesApi: "docs-categories",
        linkToFiles: "documentos"
    },
    legislation: {
        filesApi: "legislations",
        categoriesApi: "legislation-folders",
        linkToFiles: "legislacao"
    }
}
export const useHookFolders = (api: "document" | "legislation") => {
    const router = useRouter()
    const [updateCount, setUpdateCount] = useState<boolean>(true);
    const [folders, setFolders] = useState<Folders[]>([]);
    const [listCountByDocumentId, setListCountByDocumentId] = useState<CountFileInFolder>({});

    const {filesApi, categoriesApi, linkToFiles} = APIS[api];

    useEffect(() => {
        AxiosHttpClient.get(`/${categoriesApi}/?populate=*`).then(({data: {data}}) => {
            setFolders(data)
        })
    }, [categoriesApi]);


    useEffect(() => {
        if (updateCount && folders.length > 0) {
            folders.forEach(({documentId}) => {
                AxiosHttpClient.get(`/${filesApi}?filters[folder][documentId][$eq]=${documentId}&pagination[limit]=1 `).then(({data: {meta}} ) => {
                    listCountByDocumentId[documentId] = meta.pagination.total
                    setListCountByDocumentId(listCountByDocumentId)
                    setFolders([...folders])
                })
            })
            setUpdateCount(false)
        }
    }, [filesApi, folders, updateCount, listCountByDocumentId]);

    interface Folders {
        documentId: string
        name: string
    }

    interface CountFileInFolder {
        [k: string]: number
    }

    const onClickFolder = ({documentId}: Folders) => {
        if (listCountByDocumentId[documentId] > 0) {
            router.push(`/${linkToFiles}/${documentId}`);
        }
    }

    return {
        updateCount,
        setUpdateCount,
        folders, setFolders,
        listCountByDocumentId,
        setListCountByDocumentId,
        onClickFolder
    }
}
