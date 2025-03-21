import {useEffect, useState} from "react";
import {AxiosHttpClient} from "@/settings/axios";
import {useRouter} from "next/navigation";

export const useFolders = () => {
    const router = useRouter()
    const [updateCount, setUpdateCount] = useState<boolean>(true);
    const [folders, setFolders] = useState<Folders[]>([]);
    const [listCountByDocumentId, setListCountByDocumentId] = useState<CountFileInFolder>({});
    useEffect(() => {
        AxiosHttpClient.get("/docs-categories?populate=*").then(({data: {data}}) => {
            setFolders(data)
        })
    }, []);


    useEffect(() => {
        if (updateCount && folders.length > 0) {
            folders.forEach(({documentId}) => {
                AxiosHttpClient.get(`/docs?filters[folder][documentId][$eq]=${documentId}&pagination[limit]=1 `).then(({data: {meta}} ) => {
                    listCountByDocumentId[documentId] = meta.pagination.total
                    setListCountByDocumentId(listCountByDocumentId)
                    setFolders([...folders])
                })
            })
            setUpdateCount(false)
        }
    }, [folders, updateCount, listCountByDocumentId]);

    interface Folders {
        documentId: string
        nome: string
    }

    interface CountFileInFolder {
        [k: string]: number
    }

    const onClickFolder = ({documentId}: Folders) => {
        if (listCountByDocumentId[documentId] > 0) {
            router.push(`/documentos/${documentId}`);
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
