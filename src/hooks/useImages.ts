import { useEffect } from "react";
import { useApplicationStore } from "../store";
import { fetchImages } from "../services";

export const useImages = () => {
  const images = useApplicationStore((state) => state.images);
  const setImages = useApplicationStore((state) => state.setImages);

  useEffect(() => {
    if (images.length === 0) {
      fetchImages().then((images) => setImages(images));
    }
  }, []);

  return {
    currentImage: images[0],
    images: images.slice(1),
  };
};
