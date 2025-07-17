"use client"
import {
    createContext,
    ReactNode,
    useContext,
    useState,
    Dispatch,
    SetStateAction
} from 'react'

const PdfViewerContext = createContext<PdfViewerContext>({} as PdfViewerContext)

export const PdfViewerProvider = ({ children }: PdfViewerProvider) => {
    const [listDocument, setListDocument] = useState<Documents[]>([])
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState<boolean>(false)
    const [selectedDocument, setSelectedDocument] = useState<
        Documents | undefined
    >()
    const [isDocumentMinimized, setIsDocumentMinimized] = useState<boolean>(false)
    const [foldersSelected, setFoldersSelected] = useState<Folders[]>([]);

    const openNewDocument = (document: Documents) => {
        setIsDocumentModalOpen(true)
        setIsDocumentMinimized(false)

        const index = listDocument.findIndex(({id}) => id === document.id);
        if(index !== -1){
            setSelectedDocument(listDocument[index])
            return
        }
        listDocument.push(document)
        setListDocument(listDocument)
        setSelectedDocument(document)
    }

    return (
        <PdfViewerContext.Provider
            value={{
                listDocument,
                setListDocument,
                openNewDocument,
                isDocumentModalOpen,
                setIsDocumentModalOpen,
                selectedDocument,
                setSelectedDocument,
                isDocumentMinimized,
                setIsDocumentMinimized,
                foldersSelected,
                setFoldersSelected
            }}
        >
            {children}
        </PdfViewerContext.Provider>
    )
}

export const usePdfViewer = () => useContext(PdfViewerContext)

interface PdfViewerProvider {
    children: ReactNode
}

interface PdfViewerContext {
    listDocument: Documents[]
    setListDocument: Dispatch<SetStateAction<Documents[]>>
    openNewDocument: (document: Documents) => void
    isDocumentModalOpen: boolean
    setIsDocumentModalOpen: Dispatch<SetStateAction<boolean>>
    selectedDocument: Documents | undefined
    setSelectedDocument: Dispatch<SetStateAction<Documents | undefined>>
    isDocumentMinimized: boolean
    setIsDocumentMinimized: Dispatch<SetStateAction<boolean>>
    foldersSelected: Folders[]
    setFoldersSelected: Dispatch<SetStateAction<Folders[]>>
}

export interface State {
    open: boolean
    reload: boolean
    loading: boolean
    message: string
    title: string
    type?: 'error' | 'success' | 'warning' | 'info'
}

export interface Documents {
    id?: number | string
    uri: string
    name: string
}

interface Folders {
    documentId?: string;
    name?: string;
    id?: string;
}
