import axios, { AxiosResponse } from "axios";
import { ApplicationState } from "../models/Store";
import { Image } from "../models/Data";
import toast from "react-hot-toast";

const serviceDefaultConfigs = {};
const service = axios.create(serviceDefaultConfigs);

service.interceptors.request.use(function (error) {
  return Promise.reject(error);
});

export const fetchImages = (): Promise<ApplicationState["images"]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<ApplicationState["images"]> =
        await axios.get(
          "https://5f2f729312b1481b9b1b4eb9d00bc455.api.mockbin.io/unanalyzed-images"
        );
      resolve(response.data);
    } catch (e) {
      handleRequestError(e, reject);
    }
  });
};

export const fetchCategories = (): Promise<ApplicationState["categories"]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<ApplicationState["categories"]> =
        await axios.get(
          "https://f6fe9241e02b404689f62c585d0bd967.api.mockbin.io/categories"
        );
      resolve(response.data);
    } catch (e) {
      handleRequestError(e, reject);
    }
  });
};

export const submitAnnotation = (
  imageId: Image["id"],
  annotation: ApplicationState["annotation"]
): Promise<unknown> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<unknown> = await axios.post(
        "https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations",
        {
          imageId,
          annotations: [annotation],
        }
      );
      toast.success("Image annotation sent!");
      resolve(response.data);
    } catch (e) {
      handleRequestError(e, reject);
    }
  });
};

export const discardAnnotation = (imageId: Image["id"]): Promise<unknown> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<unknown> = await axios.post(
        "https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations",
        {
          imageId,
          annotations: [],
        }
      );
      toast.success("Image annotation discarded");
      resolve(response.data);
    } catch (e) {
      handleRequestError(e, reject);
    }
  });
};

const handleRequestError = (error: unknown, reject: (r: unknown) => void) => {
  toast.error("An error ocurred, please try again");
  reject(error);
};
