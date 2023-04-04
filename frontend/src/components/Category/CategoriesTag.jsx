import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import folder from "../../assets/icons/folder.svg";

import Tags from "../Buttons/Tags";

import expressAPI from "../../services/expressAPI";
import { useCategoryContext } from "../../contexts/CategoryContext";

function CategoriesTag() {
  const navigate = useNavigate();
  const { categories, setCategories, activeCategories, setActiveCategories } =
    useCategoryContext();
  useEffect(() => {
    expressAPI
      .get(`/categories`)
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
    <div className="flex m-6">
      <div className="flex justify-between overflow-y-auto mr-5">
        {categories &&
          categories.map((categorie) => (
            <Tags key={categorie.id} name={categorie.category_title} />
          ))}
      </div>
      <button type="button" onClick={() => navigate("/categories")}>
        <img src={folder} alt="folder" />
      </button>
    </div>
  );
}

export default CategoriesTag;
