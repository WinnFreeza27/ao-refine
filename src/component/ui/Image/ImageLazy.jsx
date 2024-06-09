import React, { useState, useEffect, useRef } from 'react';
import LoadingStatus from '../Status/LoadingStatus';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * ImageLazy component is a lazy-loading image component that accepts an array of images,
 * a style object, and a boolean indicating whether the images should only be displayed
 * without a link.
 */
function ImageLazy ({ images, style, imageOnly, linkTo }) {
  // State to track whether the images are still loading
  const [loading, setLoading] = useState(true);
  
  // Memoize the images to check if they have changed
  const imagesChanged = useMemoizedImages(images);

  // Effect to load the images when they change
  useEffect(() => {

    // If the images haven't changed, return early
    if (!imagesChanged) return;

   //Set the loading to true when the images change
    setLoading(true);

    // Create an array of promises for each image
    const imageLoaders = images.map((image) => {
      return new Promise((resolve) => {
        const img = new Image();
        // Resolve the promise when the image is loaded
        img.onload = () => {
          resolve();
        };
        // Set the image source
        img.src = image.src;
      });
    });

    // Once all the images are loaded, update the loading state
    Promise.all(imageLoaders).then(() => {
      setLoading(false);
    });
  }, [imagesChanged, imageOnly]);
  
  // Render the component
  return (
    <>
      {/* If the images are still loading, render the LoadingStatus component */}
      {loading && <LoadingStatus />}
      {/* If the images have loaded, render the images */}
      {!loading && images.map((image, index) => (
        <React.Fragment key={index}>
          { /* If the imageOnly prop is true, render the image without a link */ }
          { imageOnly ? (
            <img src={image.src} alt={image.alt} className={style.img} id={image.id} onClick={image.onClick} />
          ) : (
            <Link to={linkTo} className={style.div} key={index}>
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

/**
 * Custom hook that memoizes an array of images and compares them with the previous array.
 * It returns a boolean indicating whether the images have changed.
 *
 * @param {Array} images - An array of objects containing the image src and alt text.
 * @returns {boolean} - A boolean indicating whether the images have changed.
 */
const useMemoizedImages = (images) => {
  const previousImagesRef = useRef(); // Reference to the previous array of images

  useEffect(() => {
    previousImagesRef.current = images; // Update the reference with the current array of images
  }, [images]);

  /**
   * Function that compares the previous array of images with the current array of images.
   * It returns a boolean indicating whether the images have changed.
   *
   * @returns {boolean} - A boolean indicating whether the images have changed.
   */
  const imagesChanged = () => {
    // If the previous array does not exist, return true to trigger the effect
    if (!previousImagesRef.current) return true;

    // If the length of the previous array is different from the current array, return true to trigger the effect
    if (previousImagesRef.current.length !== images.length) return true;

    // Iterate over each image in the arrays
    for (let i = 0; i < images.length; i++) {
      // If the src of the image in the previous array is different from the src of the image in the current array, return true to trigger the effect
      if (previousImagesRef.current[i].src !== images[i].src) {
        return true;
      }
    }
    // If none of the conditions above are met, return false to indicate that the images have not changed
    return false;
  };

  return imagesChanged(); // Return the result of the imagesChanged function
};



export default ImageLazy;
