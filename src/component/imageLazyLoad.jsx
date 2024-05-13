import React, { useState, useEffect } from 'react';

const ImageGallery = ({ images }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const imageLoaders = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imageLoaders).then(() => {
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [images]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          {images.map((image, index) => (
            <div className='item-card' key={index}>
            <img  src={image.src} alt={image.alt} className='"w-full h-full' id={image.id} onClick={image.onClick}/>
            </div>
          ))}
          </>
      )}
      </>
  );
};

export default ImageGallery;