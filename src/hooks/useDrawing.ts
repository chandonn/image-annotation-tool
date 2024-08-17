import { RefObject, useEffect, useState } from "react";
import { useImages } from "./useImages";
import { useApplicationStore } from "../store";
import toast from "react-hot-toast";

export const useDrawing = ({
  canvasRef,
  imageRef,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  imageRef: RefObject<HTMLImageElement>;
}) => {
  const { currentImage } = useImages();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [boxOrigin, setBoxOrigin] = useState<{ x: number; y: number } | null>(
    null
  );
  const { setAnnotationBoundingBoxes, annotation } = useApplicationStore(
    ({ setAnnotationBoundingBoxes, annotation }) => ({
      setAnnotationBoundingBoxes,
      annotation,
    })
  );

  const updateBoxOrigin = (e: MouseEvent) => {
    setBoxOrigin({ x: e.offsetX, y: e.offsetY });
  };

  const draw = (x: number, y: number, width: number, height: number) => {
    if (context) {
      context.strokeStyle = "#ff0000";
      context.fillStyle = "#ff000026";
      context.lineWidth = 2;
      context.beginPath();
      context.fillRect(x, y, width, height);
      context.rect(x, y, width, height);
      context.stroke();
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current && context) {
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  };

  const drawingInteraction = (e: MouseEvent) => {
    clearCanvas();

    if (boxOrigin) {
      draw(
        boxOrigin.x,
        boxOrigin.y,
        e.offsetX - boxOrigin.x,
        e.offsetY - boxOrigin.y
      );
    }
  };

  const setNewSlectionBox = (e: MouseEvent) => {
    if (boxOrigin) {
      setAnnotationBoundingBoxes([
        {
          topLeftX: boxOrigin.x,
          topLeftY: boxOrigin.y,
          width: e.offsetX - boxOrigin.x,
          height: e.offsetY - boxOrigin.y,
        },
      ]);
      toast.success("Your selection was saved");
      setBoxOrigin(null);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const drawingContext = canvasRef.current.getContext("2d");

      if (drawingContext) setContext(drawingContext);

      canvasRef.current.addEventListener("mousedown", updateBoxOrigin);
      canvasRef.current.addEventListener("mouseup", setNewSlectionBox);
      canvasRef.current.addEventListener("mousemove", drawingInteraction);
    }

    return () => {
      canvasRef?.current?.removeEventListener("mousedown", updateBoxOrigin);
      canvasRef?.current?.removeEventListener("mouseup", setNewSlectionBox);
      canvasRef?.current?.removeEventListener("mousemove", drawingInteraction);
    };
  }, [currentImage, boxOrigin, canvasRef]);

  useEffect(() => {
    if (context && annotation?.boundingBoxes?.[0]) {
      console.log(annotation?.boundingBoxes?.[0]);
      const { topLeftX, topLeftY, width, height } = annotation.boundingBoxes[0];

      draw(topLeftX, topLeftY, width, height);
    }
  }, [context, annotation.boundingBoxes?.[0]]);

  useEffect(() => {
    if (canvasRef.current && imageRef.current) {
      canvasRef.current.width = imageRef.current.width;
      canvasRef.current.height = imageRef.current.height;
      canvasRef.current.style.left = imageRef.current.offsetLeft + "px";
      canvasRef.current.style.top = imageRef.current.offsetTop + "px";
    }
  }, [imageRef.current, currentImage]);
};
