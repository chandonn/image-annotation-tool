import { Image, Category, Annotation } from "./Data";

export interface ApplicationState {
  images: Image[];
  categories: Category[];
  annotation: Annotation;
  searchQuery?: string;
}

export interface ApplicationActions {
  setImages: (payload: ApplicationState["images"]) => void;
  nextImageInQueue: () => void;
  setCategories: (payload: ApplicationState["categories"]) => void;
  setAnnotation: (payload: ApplicationState["annotation"]) => void;
  setAnnotationCategory: (
    payload: ApplicationState["annotation"]["categoryId"]
  ) => void;
  setAnnotationBoundingBoxes: (
    payload: ApplicationState["annotation"]["boundingBoxes"]
  ) => void;
  setSearchQuery: (payload: ApplicationState["searchQuery"]) => void;
}
