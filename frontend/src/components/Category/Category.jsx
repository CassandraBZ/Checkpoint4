import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import expressAPI from "../../services/expressAPI";
import { toastValidation } from "../../services/toastService";

import chevronUp from "../../assets/icons/chevron-up.svg";
import chevronDown from "../../assets/icons/chevron-down.svg";
import trash from "../../assets/icons/trash.svg";
import NotesList from "../Notes/NotesList";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext";

function Category({ title, id }) {
  const { user } = useCurrentUserContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    expressAPI
      .get(`/notes/user/${user.id}/category/${id}`)
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = () => {
    expressAPI
      .delete(`/categories/${id}`)
      .then(() => {
        toastValidation("Votre catégorie a bien été supprimée");
        navigate("/categories");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="rounded-r-lg rounded-tl-lg py-4 px-6 border-2 border-main-light mb-4">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <div className="flex">
            {id !== 1 && (
              <button type="button" className="mr-3" onClick={handleDelete}>
                <img src={trash} alt="delete" />
              </button>
            )}
            <h1 className="text-main font-semibold">{title}</h1>
          </div>
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <img src={chevronUp} alt="close category" />
            ) : (
              <img src={chevronDown} alt="open category" />
            )}
          </button>
        </div>
        {isOpen && <NotesList notes={notes} />}
      </div>
    </div>
  );
}

Category.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
export default Category;
