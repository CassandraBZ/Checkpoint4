import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import folder from "../../assets/icons/folder.svg";

import Tags from "../Buttons/Tags";

import expressAPI from "../../services/expressAPI";

function CategoriesTag() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    expressAPI
      .get(`/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex flex-row justify-between m-6">
      {categories.map((categorie) => (
        <Tags key={categorie.id} name={categorie.category_title} />
      ))}
      <button type="button" onClick={() => navigate("/categories")}>
        <img src={folder} alt="folder" />
      </button>
    </div>
  );
}

export default CategoriesTag;
