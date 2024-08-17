import { create } from "zustand";
import { ApplicationState, ApplicationActions } from "../models/Store";

export const useApplicationStore = create<
  ApplicationState & ApplicationActions
>()((set) => ({
  images: [],
  categories: [],
  annotation: {},
  searchQuery: "",
  setImages: (payload: ApplicationState["images"]) =>
    set(() => ({ images: payload })),
  nextImageInQueue: () => set((state) => ({ images: state.images.slice(1) })),
  setCategories: (payload: ApplicationState["categories"]) =>
    set(() => ({ categories: payload })),
  setAnnotation: (payload: ApplicationState["annotation"]) =>
    set(() => ({ annotation: payload })),
  setAnnotationCategory: (
    payload: ApplicationState["annotation"]["categoryId"]
  ) =>
    set((state) => ({
      annotation: { ...state.annotation, categoryId: payload },
    })),
  setAnnotationBoundingBoxes: (
    payload: ApplicationState["annotation"]["boundingBoxes"]
  ) =>
    set((state) => ({
      annotation: { ...state.annotation, boundingBoxes: payload },
    })),
  setSearchQuery: (payload: ApplicationState["searchQuery"]) =>
    set(() => ({ searchQuery: payload })),
}));
