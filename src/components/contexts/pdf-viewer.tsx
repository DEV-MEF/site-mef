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

    const openNewDocument = (document: Documents) => {
        setIsDocumentModalOpen(true)
        setIsDocumentMinimized(false)

        document.id = new Date().getTime()
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
                setIsDocumentMinimized
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
