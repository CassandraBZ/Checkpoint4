import { useNavigate } from "react-router-dom";
import { useState } from "react";

import arrowBack from "../assets/icons/arrow-left.svg";
import add from "../assets/icons/addition_icon.svg";
import remove from "../assets/icons/substraction_icon.svg";

import CategoriesCard from "../components/Category/CategoriesCard";
import SecondaryButton from "../components/Buttons/SecondaryButton";

import expressAPI from "../services/expressAPI";
import { toastError, toastValidation } from "../services/toastService";

function Categories() {
  const navigate = useNavigate();
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleSubmit = () => {
    if (title) {
      expressAPI
        .post(`/categories`, { category_title: title })
        .then(() => {
          toastValidation("La catégorie a bien été créée !");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      toastError("Veuillez renseigner un titre");
    }
  };

  return (
    <div className="mx-8">
      <button
        type="button"
        onClick={() => navigate("/Accueil")}
        className="mt-14 mb-7"
      >
        <img src={arrowBack} alt="back arrow" className="w-7 h-7" />
      </button>
      <div className="flex flex-row items-center justify-between mb-5">
        <h1 className="font-lilita text-main text-xl">Vos catégories</h1>
        <div className="flex flex-row">
          <p className="font-semibold text-gray2 pr-4">Ajouter</p>
          <button type="button" onClick={() => setIsCreateMode(!isCreateMode)}>
            {isCreateMode ? (
              <img src={remove} alt="remove category" className="w-6 h-6" />
            ) : (
              <img src={add} alt="add category" className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      {isCreateMode && (
        <div>
          <input
            value={title}
            onChange={handleTitleChange}
            className="rounded-r-lg rounded-tl-lg py-4 px-6 border-2 border-green mb-4 w-full"
            placeholder="Titre"
          />
          <SecondaryButton handleClick={handleSubmit}>
            Enregistrer
          </SecondaryButton>
        </div>
      )}
      <CategoriesCard />
    </div>
  );
}

export default Categories;
