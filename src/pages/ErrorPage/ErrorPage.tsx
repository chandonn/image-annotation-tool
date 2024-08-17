import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import "./ErrorPage.css";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();

  function getErrorMessage() {
    if (isRouteErrorResponse(error)) {
      switch (error.status) {
        case 404:
          return "There's plenty of images to analyze, on the other side!";

        case 401:
          return "This content cannot be seen";

        case 503:
          return "An error ocurred in the API";

        case 418:
          return "Content changed location, go to our home page";

        default:
          return "There's plenty of images to analyze, on the other side!";
      }
    } else {
      return "There's plenty of images to analyze, on the other side!";
    }
  }

  return (
    <div className="full-page center error-page">
      <h2 className="title">This page has no category yet</h2>
      <h3>{getErrorMessage()}</h3>
      <h3>
        Go back and <Link to="/">analyze more content</Link>
      </h3>
    </div>
  );
};
