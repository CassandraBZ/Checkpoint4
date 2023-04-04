import { useEffect } from "react";

import expressAPI from "../../services/expressAPI";
import Category from "./Category";
import { useCategoryContext } from "../../contexts/CategoryContext";

function CategoriesCard() {
  const { categories, setCategories, activeCategories, setActiveCategories } =
    useCategoryContext();

  useEffect(() => {
    expressAPI
      .get(`categories`)
      .then((res) => {
        setCategories(res.data);
        localStorage.setItem("categories", JSON.stringify(res.data));

        if (!activeCategories) {
          const categoriesName = res.data.map((c) => c.category_title);
          setActiveCategories(categoriesName);
          localStorage.setItem(
            "activeCategories",
            JSON.stringify(categoriesName)
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {categories.map((categorie) => (
        <Category
          key={categorie.id}
          id={categorie.id}
          title={categorie.category_title}
        />
      ))}
    </div>
  );
}

export default CategoriesCard;
