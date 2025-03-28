"use client"
import React, {
    createContext, Dispatch, ReactNode, SetStateAction,
    useContext, useRef, useState
} from 'react'
import {Galleria} from "primereact/galleria";
type TImage = { source: string, alt: string, title: string };


const GalleryContext = createContext<GalleryContext>({} as GalleryContext)

export const GalleryProvider = ({ children }: GalleryProvider) => {

    const galleriaRef = useRef<Galleria>(null);
    const [images, setImages] = useState<TImage[]>([]);
    const [documentId, setDocumentId] = useState<string>("");
    const [itemTemplate, setItemTemplate] = useState<(item: TImage) => void>();
    const [thumbnailTemplate, setThumbnailTemplate] = useState<(item: TImage) => void>();

    const responsiveOptions = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    /*const itemTemplate = (item: TImage) => (
        <Image
            src={item.source}
            alt={item.alt}
            width={500} // Largura base
            height={200} // Altura base (ajusta proporcionalmente)
            style={{
                width: '100%',
                display: 'block',
            }}
        />
    );*/

    /*const thumbnailTemplate = (item: TImage) => (
        <Image
            src={item.source}
            alt={item.alt}
            width={500} // Largura base
            height={300} // Altura base (ajusta proporcionalmente)
            style={{ display: 'block', width: 80}}
        />
    );*/

    return (
        <GalleryContext.Provider
            value={{
                images,
                setImages,
                documentId,
                setDocumentId,
                galleriaRef,
                thumbnailTemplate,
                setThumbnailTemplate,
                itemTemplate,
                setItemTemplate,
                responsiveOptions
            }}
        >
            {children}
        </GalleryContext.Provider>
    )
}

export const useGallery = () => useContext(GalleryContext)

interface GalleryProvider {
    children: ReactNode
}

interface GalleryContext {
    images: TImage[],
    documentId: string,
    setImages: Dispatch<SetStateAction<TImage[]>>,
    setDocumentId: Dispatch<SetStateAction<string>>,
    galleriaRef: React.MutableRefObject<Galleria | null>
    thumbnailTemplate:  ((item: TImage) => void) | undefined,
    setThumbnailTemplate: Dispatch<SetStateAction< ((item: TImage) => void) | undefined>>,
    itemTemplate:  ((item: TImage) => void) | undefined,
    setItemTemplate: Dispatch<SetStateAction< ((item: TImage) => void) | undefined>>,
    responsiveOptions: {breakpoint: string, numVisible: number}[]

}

