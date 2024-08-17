import { useRef } from "react";
import { useImages } from "../../hooks/useImages";
import "./Canvas.css";
import { useDrawing } from "../../hooks/useDrawing";

export const Canvas = () => {
  const { currentImage } = useImages();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useDrawing({ canvasRef, imageRef });

  return (
    <div className="image-container">
      {currentImage ? (
        <img
          ref={imageRef}
          src={currentImage.url}
          alt="Mark the selection you want to annotate"
        />
      ) : null}
      <canvas ref={canvasRef} id="annotation" className="annotation" />
    </div>
  );
};
