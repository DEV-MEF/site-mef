"use client"

import React from 'react';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import { Galleria } from 'primereact/galleria';
import Notices from '@/assets/notice.png';
import Notices1 from '@/assets/notice1.jpg';

//type Image = { source: Notices, alt: 'Imagem 1', title: 'Imagem 1' },

const GaleryImages = () => {
  const images = [
    { source: Notices, alt: 'Imagem 1', title: 'Imagem 1' },
    { source: Notices1, alt: 'Imagem 2', title: 'Imagem 2' },
    { source: Notices, alt: 'Imagem 3', title: 'Imagem 3' },
    { source: Notices1, alt: 'Imagem 4', title: 'Imagem 4' },
  ];

  const itemTemplate = (item: any) => (
    <img
      src={item.source}
      alt={item.alt}
      className="w-full h-auto object-cover"
    />
  );

  const thumbnailTemplate = (item : any) => (
    <img
      src={item.source}
      alt={item.alt}
      className="w-20 h-20 object-cover rounded-md"
    />
  );

  return (
    <div className="container mx-auto px-10 py-20">
      <h1 className="text-2xl font-semibold text-primary mb-6">Galeria de Imagens</h1>
      <Galleria
        value={images}
        numVisible={4}
        circular
        showItemNavigators
        showItemNavigatorsOnHover
        showThumbnails
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        style={{ maxWidth: '900px', margin: '0 auto' }}
      />
    </div>
  );
};

export default GaleryImages;
