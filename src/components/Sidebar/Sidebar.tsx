import { useCategories } from "../../hooks/useCategories";
import { discardAnnotation, submitAnnotation } from "../../services";
import { useApplicationStore } from "../../store";
import "./Sidebar.css";

export const Sidebar = () => {
  const { categories } = useCategories();
  const {
    images,
    annotation,
    searchQuery,
    setSearchQuery,
    setAnnotationCategory,
    setAnnotationBoundingBoxes,
    nextImageInQueue,
  } = useApplicationStore(
    ({
      images,
      annotation,
      searchQuery,
      setSearchQuery,
      setAnnotationCategory,
      setAnnotationBoundingBoxes,
      nextImageInQueue,
    }) => ({
      images,
      annotation,
      searchQuery,
      setSearchQuery,
      nextImageInQueue,
      setAnnotationCategory,
      setAnnotationBoundingBoxes,
    })
  );

  const handleAnnotationSubmit = async () => {
    const response = await submitAnnotation(images[0].id, annotation);
    if (response) {
      setAnnotationCategory(undefined);
      setAnnotationBoundingBoxes([]);
      nextImageInQueue();
    }
  };

  const handleAnnotationDiscard = async () => {
    const response = await discardAnnotation(images[0].id);
    if (response) {
      nextImageInQueue();
    }
  };

  return (
    <div className="sidebar">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search categories"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul className="options-list">
        {categories.map((category, index) => (
          <li
            onClick={() => setAnnotationCategory(category.id)}
            key={index}
            className={
              category.id === annotation?.categoryId ? "highlight" : ""
            }
          >
            {category.name}
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button onClick={handleAnnotationDiscard}>Discard</button>
        <button
          disabled={!annotation.categoryId || !annotation.boundingBoxes?.length}
          onClick={handleAnnotationSubmit}
        >
          Complete
        </button>
      </div>
    </div>
  );
};
