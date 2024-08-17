import { Canvas } from "../Canvas/Canvas";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Annotation.css";

export const Annotation = () => {
  return (
    <div className="analyzer-container">
      <Canvas />
      <Sidebar />
    </div>
  );
};
