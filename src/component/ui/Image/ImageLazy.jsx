import React, { useState, useEffect } from 'react';
import LoadingStatus from '../Status/LoadingStatus';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ImageLazy ({ images, style, imageOnly }) {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if(!imageOnly) {
      setLoading(true)
    }
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
      {loading && <LoadingStatus />}
      {!loading && images.map((image, index) => (
        <React.Fragment key={index}>
          { imageOnly ? (
            <img src={image.src} alt={image.alt} className={style.img} id={image.id} onClick={image.onClick} />
          ) : (
            <Link to={"/input"} className={style.div} key={index}>
              <img src={image.src} alt={image.alt} className={style.img} id={image.id} onClick={image.onClick} />
            </Link>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

ImageLazy.propTypes = {
  images: propTypes.array,
  style: propTypes.object,
  imageOnly: propTypes.bool
}

export default ImageLazy;
