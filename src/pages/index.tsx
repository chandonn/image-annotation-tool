import { createHashRouter } from "react-router-dom";
import { MainDecorator } from "./Root/MainDecorator";
import { ErrorPage } from "./ErrorPage/ErrorPage";
import "../styles/index.css";
import { HomePage } from "./HomePage/HomePage";

export const router = createHashRouter([
  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <MainDecorator />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
