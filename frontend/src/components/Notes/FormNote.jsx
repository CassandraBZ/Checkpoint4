import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import MainButton from "../Buttons/MainButton";
import SecondaryButton from "../Buttons/SecondaryButton";

import trash from "../../assets/icons/trash.svg";

import expressAPI from "../../services/expressAPI";
import { toastError, toastValidation } from "../../services/toastService";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext";

function FormNote({ isEditMode, note, color, category }) {
  const { user } = useCurrentUserContext();
  const { id } = useParams();

  const navigate = useNavigate();
  const [title, setTitle] = useState(note.note_title);
  const [content, setContent] = useState(note.content);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorSelected, setColorSelected] = useState(color);
  const [categorySelected, setCategorySelected] = useState(category);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleColorSelectedChange = (c) => setColorSelected(c);
  const handleCategorySelectedChange = (e) =>
    setCategorySelected(e.target.value);

  const createNote = (currentNote) => {
    if (title && content) {
      expressAPI
        .post(`/notes`, currentNote)
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

  const editNote = (currentNote) => {
    if (title && content) {
      expressAPI
        .put(`/notes/${id}`, currentNote)
        .then(() => {
          toastValidation("Votre note a bien été modifiée !");
          navigate("/Accueil");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      toastError("Veuillez entrer un titre et un texte");
    }
  };

  const handleSubmit = () => {
    const currentNote = {
      note_title: title,
      content,
      user_id: user.id,
      color_id: colorSelected.id,
      category_id: categorySelected.id,
    };
    if (isEditMode) {
      editNote(currentNote);
    } else {
      createNote(currentNote);
    }
  };

  const handleDelete = () => {
    expressAPI
      .delete(`/notes/${id}`)
      .then(() => {
        toastValidation("Votre note a bien été supprimée");
        navigate("/Accueil");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setColorSelected(color);
  }, [color]);

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
        <h1 className="font-lilita text-main text-xl ">
          {isEditMode ? "Modifier ma note" : "Créer une note"}
        </h1>
        <div className="flex flex-row">
          <p className="font-semibold text-gray2 pr-4">Catégories</p>
          <select onChange={handleCategorySelectedChange}>
            {categories &&
              categories.map((c) => (
                <option key={c.id} value={c}>
                  {c.category_title}
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
            className="w-full bg-transparent text-main font-semibold placeholder:text-main"
            placeholder="Titre"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            className="w-full bg-transparent text-main placeholder:text-main"
            placeholder="Contenu"
            value={content}
            onChange={handleContentChange}
          />
        </form>
      </div>
      <div className="flex flex-row mb-5 items-center justify-between">
        <div>
          {isEditMode && (
            <button type="button" onClick={handleDelete}>
              <img src={trash} alt="trash icon" className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="flex flex-row items-center text-gray2 font-semibold justify-end ">
          Couleurs
          {colors &&
            colors.map((c) => (
              <button
                type="button"
                key={c.id}
                className={`h-8 w-8 rounded-full ml-2 ${
                  colorSelected && colorSelected.id === c.id ? "border-2" : ""
                }`}
                style={{ backgroundColor: c.name }}
                onClick={() => handleColorSelectedChange(c)}
                aria-label={c.name}
                title={c.name}
              />
            ))}
        </div>
      </div>
      <MainButton handleClick={handleSubmit}>
        {" "}
        {isEditMode ? "Enregistrer les modifications" : "Enregistrer la note"}
      </MainButton>
      <SecondaryButton handleClick={() => navigate("/Accueil")}>
        {isEditMode ? "Ne pas enregistrer" : "Annuler"}
      </SecondaryButton>
    </div>
  );
}

FormNote.propTypes = {
  isEditMode: PropTypes.bool,
  note: PropTypes.shape({
    note_title: PropTypes.string,
    content: PropTypes.string,
  }),
  color: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  category: PropTypes.shape({
    id: PropTypes.number,
    category_title: PropTypes.string,
  }),
};

FormNote.defaultProps = {
  isEditMode: false,
  note: {
    note_title: "",
    content: "",
  },
  color: {
    id: 1,
    name: "#B2B8A3",
  },
  category: {
    id: 1,
    category_title: "Tout",
  },
};

export default FormNote;
