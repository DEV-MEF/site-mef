"use client";
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Modal } = require('./modal');
import { FaWindowClose, FaRedo, FaMinus, FaFileAlt, FaBars } from 'react-icons/fa'; // Added FaBars for mobile menu
import { Documents, usePdfViewer } from "@/components/contexts/pdf-viewer";

let urlServer = "";
if (typeof window !== "undefined" && window.location?.origin) {
    urlServer = window.location.origin;
}

export const PdfViewer: React.FC = () => {
    // const urlServer = process.env.WEB_BASE_SERVER;
    const {
        listDocument,
        setListDocument,
        isDocumentModalOpen,
        setIsDocumentModalOpen,
        setSelectedDocument,
        selectedDocument,
        isDocumentMinimized,
        setIsDocumentMinimized
    } = usePdfViewer();

    // State for mobile: to toggle document list visibility
    const [isMobileDocListOpen, setIsMobileDocListOpen] = React.useState(false);

    const openModal = (document?: Documents) => {
        setIsDocumentModalOpen(true);
        setIsDocumentMinimized(false);
        setIsMobileDocListOpen(false); // Close mobile doc list when opening modal
        if (document?.name) {
            setSelectedDocument(document);
        }
    };

    const closeModal = (force?: boolean) => {
        if (listDocument.length > 1 && !force) {
            const updatedList = listDocument.filter(
                (doc) => doc.id !== selectedDocument?.id
            );

            if (updatedList.length > 0) {
                setSelectedDocument(updatedList[0]);
            } else {
                setSelectedDocument(undefined);
            }

            setListDocument(updatedList);
        } else {
            setListDocument([]);
            setIsDocumentModalOpen(false);
            setIsDocumentMinimized(false);
            setSelectedDocument(undefined);
            setIsMobileDocListOpen(false); // Ensure closed on full modal close
        }
    };

    const minimizeModal = () => setIsDocumentMinimized(true);

    const reloadIframe = () => {
        if (selectedDocument) {
            setSelectedDocument({ ...selectedDocument });
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 transition-colors">
            <Modal
                isOpen={isDocumentModalOpen && !isDocumentMinimized}
                onRequestClose={() => {
                    closeModal();
                }}
                contentLabel="PDF Modal"
                ariaHideApp={false}
                style={{
                    overlay: {
                        zIndex: 1000,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    },
                    content: {
                        top: '0', // Full screen on mobile
                        left: '0',
                        right: '0',
                        bottom: '0',
                        display: 'flex',
                        flexDirection: 'column', // Stack elements vertically on mobile
                        padding: 0,
                        border: 'none',
                        height: '100vh',
                        width: '100vw' // Full width on mobile
                    }
                }}
            >
                <div className="flex flex-col w-full h-full lg:flex-row"> {/* flex-col on mobile, flex-row on larger screens */}
                    {/* Mobile: Header for document list and controls */}
                    <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 lg:hidden border-b border-gray-300 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                            <FaFileAlt className="mr-2 text-blue-600 dark:text-blue-400" />
                            <span>Documentos</span>
                        </h3>
                        <div className="flex space-x-3">
                            <button
                                title="Minimizar"
                                onClick={minimizeModal}
                                className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                            >
                                <FaMinus className="text-gray-500 dark:text-gray-300 text-lg" />
                            </button>
                            <button
                                title="Recarregar"
                                onClick={reloadIframe}
                                className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                            >
                                <FaRedo className="text-gray-500 dark:text-gray-300 text-lg" />
                            </button>
                            <button
                                title="Fechar"
                                onClick={() => closeModal()}
                                className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                            >
                                <FaWindowClose className="text-red-500 dark:text-red-300 text-lg" />
                            </button>
                            <button
                                title="Mostrar Lista"
                                onClick={() => setIsMobileDocListOpen(!isMobileDocListOpen)}
                                className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                            >
                                <FaBars className="text-gray-500 dark:text-gray-300 text-lg" />
                            </button>
                        </div>
                    </div>

                    {/* Document List (Hidden on mobile by default, shown when toggled) */}
                    <div className={`
                        w-full bg-gray-100 dark:bg-gray-800 p-4 border border-gray-300 dark:border-gray-700 shadow-sm
                        lg:w-1/5 lg:block
                        ${isMobileDocListOpen ? 'block' : 'hidden'}
                        ${isMobileDocListOpen ? 'absolute inset-x-0 top-0 h-full overflow-y-auto z-20' : ''} /* Full screen overlay for mobile list */
                    `}>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 hidden lg:flex items-center"> {/* Hidden on mobile, shown on larger screens */}
                            <FaFileAlt className="mr-2 text-blue-600 dark:text-blue-400" />
                            <span>Lista de Documentos</span>
                        </h3>
                        <div className="border-b-2 border-blue-500 dark:border-blue-300 mb-4 hidden lg:block"></div> {/* Hidden on mobile, shown on larger screens */}
                        <ul className="space-y-2">
                            {listDocument.map((document, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        openModal(document);
                                        setIsMobileDocListOpen(false); // Close list after selection
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

                    {/* PDF Viewer Area */}
                    <div className="w-full relative lg:w-4/5 flex flex-col h-full"> {/* Adjust width for mobile, flex-col to stack controls */}
                        {/* Desktop Controls (hidden on mobile) */}
                        <div className="hidden lg:flex absolute top-4 right-4 flex-col space-y-2 z-10">
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
                                    closeModal();
                                }}
                                className="cursor-pointer p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                            >
                                <FaWindowClose className="text-red-500 dark:text-red-300 text-lg" />
                            </div>
                        </div>

                        <iframe
                            id="pdfIframe"
                            src={"https://docs.google.com/gview?url="+urlServer + selectedDocument?.uri + '&embedded=true#navpanes=0&scrollbar=0'}
                            className="w-full flex-grow border-none" // flex-grow to take available height
                            title={selectedDocument?.name}
                        ></iframe>
                    </div>
                </div>
            </Modal>

            {isDocumentMinimized && (
                <div
                    className="fixed bottom-4 right-4 w-40 h-10 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-sm flex justify-between items-center p-2 z-[3000] shadow-lg" // Adjusted size and shadow for minimized button
                    onClick={() => {
                        openModal();
                    }}
                >
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        Documentos
                    </span>
                    <FaWindowClose
                        onClick={(e) => {
                            e.stopPropagation();
                            closeModal(true);
                        }}
                        className="text-red-500 dark:text-red-300 cursor-pointer text-base" // Adjusted icon size
                    />
                </div>
            )}
        </div>
    );
};
