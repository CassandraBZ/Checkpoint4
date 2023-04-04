import { useNavigate } from "react-router-dom";

import Categories from "../components/Accueil/CategoriesTag";
import SearchBar from "../components/Accueil/SearchBar";
import RoundButton from "../components/Buttons/RoundButton";

import create from "../assets/icons/addition_white.svg";
import NotesList from "../components/Notes/NotesList";

function Accueil() {
  const navigate = useNavigate();

  const handleCreateNote = (e) => {
    e.preventDefault();
    navigate("/creation-note");
  };

  return (
    <div>
      <SearchBar />
      <Categories />
      <NotesList />
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
