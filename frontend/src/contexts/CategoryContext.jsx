import PropTypes from "prop-types";
import { createContext, useContext, useState, useMemo } from "react";

const CategoryContext = createContext();

export const useCategoryContext = () => useContext(CategoryContext);

function CategoryContextProvider({ children }) {
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories"))
  );
  const [activeCategories, setActiveCategories] = useState(
    JSON.parse(localStorage.getItem("activeCategories"))
  );

  const categoryMemo = useMemo(
    () => ({
      categories,
      setCategories,
      activeCategories,
      setActiveCategories,
    }),
    [categories]
  );
  return (
    <CategoryContext.Provider value={categoryMemo}>
      {children}
    </CategoryContext.Provider>
  );
}

CategoryContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CategoryContextProvider;
