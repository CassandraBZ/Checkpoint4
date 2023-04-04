import { useState, useEffect } from "react";

import expressAPI from "../../services/expressAPI";
import Category from "./Category";

function CategoriesCard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    expressAPI
      .get(`categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {categories.map((categorie) => (
        <Category key={categorie.id} title={categorie.category_title} />
      ))}
    </div>
  );
}

export default CategoriesCard;
