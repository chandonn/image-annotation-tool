import "./HomePage.css";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { Annotation } from "../../components/Annotation/Annotation";
import { ImageQueue } from "../../components/ImageQueue/ImageQueue";

export const HomePage = () => {
  return (
    <div className="home-page">
      <PageTitle />
      <Annotation />
      <ImageQueue />
    </div>
  );
};
