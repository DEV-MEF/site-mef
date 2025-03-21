"use client"
import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const {Modal} = require('./modal');
import { FaWindowClose, FaRedo, FaMinus, FaFileAlt } from 'react-icons/fa'
import {Documents, usePdfViewer} from "@/components/contexts/pdf-viewer";

let urlServer = "";
if (typeof window !== "undefined" && window.location?.origin) {
    urlServer = window.location.origin;
}

export const PdfViewer: React.FC = () => {

    const {
        listDocument,
        setListDocument,
        isDocumentModalOpen,
        setIsDocumentModalOpen,
        setSelectedDocument,
        selectedDocument,
        isDocumentMinimized,
        setIsDocumentMinimized
    } = usePdfViewer()

    const openModal = (document?: Documents) => {
        setIsDocumentModalOpen(true)
        setIsDocumentMinimized(false)
        if (document?.name) {
            setSelectedDocument(document)
        }
    }

    const closeModal = (force?: boolean) => {
        if (listDocument.length > 1 && !force) {
            const updatedList = listDocument.filter(
                (doc) => doc.id !== selectedDocument?.id
            )

            if (updatedList.length > 0) {
                setSelectedDocument(updatedList[0])
            } else {
                setSelectedDocument(undefined)
            }

            setListDocument(updatedList)
        } else {
            setListDocument([])
            setIsDocumentModalOpen(false)
            setIsDocumentMinimized(false)
            setSelectedDocument(undefined)
        }
    }

    const minimizeModal = () => setIsDocumentMinimized(true)

    const reloadIframe = () => {
        if(selectedDocument) {
            setSelectedDocument({...selectedDocument})
        }
    }

    return (
        <div className="bg-white dark:bg-gray-900 transition-colors">
            <Modal
                isOpen={isDocumentModalOpen && !isDocumentMinimized}
                onRequestClose={() => {
                    closeModal()
                }}
                contentLabel="PDF Modal"
                ariaHideApp={false}
                style={{
                    overlay: {
                        zIndex: 1000,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    },
                    content: {
                        top: '2%',
                        left: '1%',
                        right: '1%',
                        bottom: '0',
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 0,
                        border: 'none',
                        height: '100vh'
                    }
                }}
            >
                <div className="flex w-full h-full">
                    <div className="w-1/5 bg-gray-100 dark:bg-gray-800 p-4 border border-gray-300 dark:border-gray-700 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                            <FaFileAlt className="mr-2 text-blue-600 dark:text-blue-400" />
                            <span>Lista de Documentos</span>
                        </h3>
                        <div className="border-b-2 border-blue-500 dark:border-blue-300 mb-4"></div>
                        <ul className="space-y-2">
                            {listDocument.map((document, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        openModal(document)
                                    }}
                                    className={`cursor-pointer flex items-center p-3 rounded-md border border-gray-300 dark:border-gray-600 transition-all duration-300 text-sm
                    ${selectedDocument?.id === document.id ? 'bg-blue-50 dark:bg-blue-700 text-blue-600 dark:text-white border-blue-500' : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                                >
                                    <FaFileAlt className="mr-3 text-blue-600 dark:text-blue-300" />
                                    <span
                                        className={`font-medium ${selectedDocument?.id === document.id ? 'text-blue-600 dark:text-white' : 'text-gray-800 dark:text-gray-300'}`}
                                    >
                    {document.name}
                  </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-4/5 relative">
                        <div className="absolute top-16 right-10 flex flex-col space-y-2">
                            <div
                                title="Minimizar"
                                onClick={minimizeModal}
                                className="cursor-pointer p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                            >
                                <FaMinus className="text-gray-500 dark:text-gray-300 text-lg" />
                            </div>
                            <div
                                title="Recarregar"
                                onClick={reloadIframe}
                                className="cursor-pointer p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                            >
                                <FaRedo className="text-gray-500 dark:text-gray-300 text-lg" />
                            </div>
                            <div
                                title="Fechar"
                                onClick={() => {
                                    closeModal()
                                }}
                                className="cursor-pointer p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                            >
                                <FaWindowClose  className="text-red-500 dark:text-red-300 text-lg" />
                            </div>
                        </div>
                        <iframe
                            id="pdfIframe"
                            src={urlServer+"/api/docs?file="+(selectedDocument?.uri || '') + '#navpanes=0&scrollbar=0'}
                            className="w-full h-full border-none"
                            title={selectedDocument?.name}
                        ></iframe>
                    </div>
                </div>
            </Modal>

            {isDocumentMinimized && (
                <div
                    className="fixed bottom-10 right-10 w-48 h-12 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-sm flex justify-between items-center p-2 z-[3000]"
                    onClick={() => {
                        openModal()
                    }}
                >
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Documentos
          </span>
                    <FaWindowClose
                        onClick={(e) => {
                            e.stopPropagation()
                            closeModal(true)
                        }}
                        className="text-red-500 dark:text-red-300 cursor-pointer"
                    />
                </div>
            )}
        </div>
    )
}
