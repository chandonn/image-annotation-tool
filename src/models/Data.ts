export type Image = {
  id: number;
  url: string;
};

export type Category = {
  id: number;
  name: string;
};

export type BoundingBox = {
  topLeftX: number;
  topLeftY: number;
  width: number;
  height: number;
};

export type Annotation = {
  categoryId?: Category["id"];
  boundingBoxes?: BoundingBox[];
};
