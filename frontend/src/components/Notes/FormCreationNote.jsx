import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MainButton from "../Buttons/MainButton";
import SecondaryButton from "../Buttons/SecondaryButton";

import expressAPI from "../../services/expressAPI";
import { toastError, toastValidation } from "../../services/toastService";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext";

function FormCreationNote() {
  const { user } = useCurrentUserContext();

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState("");
  const [colorSelected, setColorSelected] = useState({
    id: 1,
    name: "#B2B8A3",
  });
  const [categorySelected, setCategorySelected] = useState({
    id: 1,
    category_title: "Tout",
  });

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleColorSelectedChange = (color) => setColorSelected(color);
  const handleCategorySelectedChange = (e) =>
    setCategorySelected(e.target.value);

  const handleSubmit = () => {
    if (title && content) {
      expressAPI
        .post(`/notes`, {
          note_title: title,
          content,
          user_id: user.id,
          color_id: colorSelected.id,
          category_id: categorySelected.id,
        })
        .then(() => {
          toastValidation("Votre note a bien été créée !");
          navigate("/Accueil");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      toastError("Veuillez entrer un titre et un texte");
    }
  };

  useEffect(() => {
    expressAPI
      .get(`/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    expressAPI
      .get(`/colors`)
      .then((res) => setColors(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="mt-20 mx-8">
      <div className="flex flex-row items-center justify-between mb-5">
        <h1 className="font-lilita text-main text-xl">Créer une note</h1>
        <div className="flex flex-row">
          <p className="font-semibold text-gray2 pr-4">Catégories</p>
          <select onChange={handleCategorySelectedChange}>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category}>
                  {category.category_title}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div
        className="rounded-r-lg rounded-tl-lg p-10 mb-8"
        style={{ backgroundColor: colorSelected.name }}
      >
        <form>
          <input
            type="text"
            className="w-full bg-transparent text-main placeholder:text-main"
            placeholder="Titre"
            onChange={handleTitleChange}
          />
          <textarea
            className="w-full bg-transparent text-main placeholder:text-main"
            placeholder="Contenu"
            onChange={handleContentChange}
          />
        </form>
      </div>
      <div className="flex flex-row justify-end">
        {colors &&
          colors.map((color) => (
            <div
              key={color.id}
              className={`h-8 w-8 rounded-full mb-5 ml-2 ${
                colorSelected && colorSelected.id === color.id ? "border-2" : ""
              }`}
              style={{ backgroundColor: color.name }}
              onClick={() => handleColorSelectedChange(color)}
              aria-hidden="true"
            />
          ))}
      </div>
      <MainButton handleClick={handleSubmit}>Enregistrez la note</MainButton>
      <SecondaryButton handleClick={() => navigate("/Accueil")}>
        Annuler
      </SecondaryButton>
    </div>
  );
}

export default FormCreationNote;
