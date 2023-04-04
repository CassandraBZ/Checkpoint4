import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

import expressAPI from "../services/expressAPI";
import Categories from "../components/Category/CategoriesTag";
import SearchBar from "../components/Accueil/SearchBar";
import RoundButton from "../components/Buttons/RoundButton";

import create from "../assets/icons/addition_white.svg";
import NotesList from "../components/Notes/NotesList";

function Accueil() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const { user } = useCurrentUserContext();

  useEffect(() => {
    expressAPI
      .get(`/notes/user/${user.id}`)
      .then((res) => setNotes(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCreateNote = (e) => {
    e.preventDefault();
    navigate("/creation-note");
  };

  return (
    <div>
      <SearchBar />
      <Categories />
      <NotesList notes={notes} />
      <div className="flex flex-col justify-center items-center mt-8">
        <RoundButton
          src={create}
          alt="add note"
          handleClick={handleCreateNote}
        />
      </div>
    </div>
  );
}

export default Accueil;
