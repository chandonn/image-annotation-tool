import { useEffect, useState } from "react";
import { useApplicationStore } from "../store";
import { fetchCategories } from "../services";
import { ApplicationState } from "../models/Store";

export const useCategories = () => {
  const fullCategoriesList = useApplicationStore((state) => state.categories);
  const searchQuery = useApplicationStore((state) => state.searchQuery);
  const setCategories = useApplicationStore((state) => state.setCategories);
  const [filteredCategories, setFilteredCategories] = useState<
    ApplicationState["categories"]
  >([]);

  useEffect(() => {
    fetchCategories().then((categories) => setCategories(categories));
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const updatedList = fullCategoriesList.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(updatedList);
    } else {
      setFilteredCategories(fullCategoriesList);
    }
  }, [searchQuery, fullCategoriesList]);

  return {
    categories: filteredCategories,
  };
};
