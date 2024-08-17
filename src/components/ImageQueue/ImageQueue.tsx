import { useImages } from "../../hooks/useImages";
import "./ImageQueue.css";

export const ImageQueue = () => {
  const { images } = useImages();

  return (
    <div className="image-queue">
      <h2>Next images in queue:</h2>
      <ul className="queue-list">
        {images.map((image, index) => (
          <li key={index} className="queue-item">
            <img src={image.url} alt={image.id.toString()} />
          </li>
        ))}
      </ul>
    </div>
  );
};
