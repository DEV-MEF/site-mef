"use client"

import React, {useEffect, useState} from 'react';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import { Galleria } from 'primereact/galleria';
import Image from "next/image";
import {AxiosHttpClient} from "@/settings/axios";
import {imageURLServer} from "@/lib/utils";

type ImageType = {
  name: string
  documentId: string
  url: string
  alternativeText: string
  formats: {[k in ("large" | "medium" | "small")]: ImageType}
}

type TImage = { source: string, alt: string, title: string };
type TImageApi = {
  documentId: string,
  description: string,
  medias: ImageType[]
  cover: ImageType
};

const GalleryImages = ({params} : {params : Promise<{documentId: string}>}) => {
  const [images, setImages] = useState<TImage[]>();

  useEffect(() => {
    (async () => {
      const {documentId} = await params;
      AxiosHttpClient.get(`/galleries?filters[documentId][$eq]=${documentId}&populate=*`).then(({data : {data}}) => {
        const colecao : TImageApi = data[0];
        console.log(colecao)
        setImages((colecao?.medias || []).map((value) => {
          return {
            title: value.alternativeText,
            alt: value.alternativeText || value.name,
            source: imageURLServer+(value?.formats?.medium || value).url
          }
        }));
      });
    })()
  }, [params]);

  const itemTemplate = (item: TImage) => (
    <Image
      src={item.source}
      alt={item.alt}
      width={500} // Largura base
      height={300} // Altura base (ajusta proporcionalmente)
      layout="intrinsic" // Mantém a proporção da imagem
      className="w-full h-auto object-cover"
    />
  );

  const thumbnailTemplate = (item: TImage) => (
    <Image
      src={item.source}
      alt={item.alt}
      width={500} // Largura base
      height={300} // Altura base (ajusta proporcionalmente)
      layout="intrinsic" // Mantém a proporção da imagem
      className="w-20 h-20 object-cover rounded-md"
    />
  );

  return (
    <div className="container mx-auto px-10 py-20">
      <h1 className="text-2xl font-semibold text-primary mb-6">Galeria de Imagens</h1>
      <Galleria
        value={images}
        numVisible={8}
        circular
        showItemNavigators
        showItemNavigatorsOnHover
        showThumbnails
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        style={{ margin: '0 auto' }}
      />
    </div>
  );
};

export default GalleryImages;
