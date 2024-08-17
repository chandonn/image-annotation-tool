import { Outlet } from "react-router-dom";
import "./MainDecorator.css";

export const MainDecorator = () => {
  return (
    <div className={`full-page`}>
      <Outlet />
    </div>
  );
};
