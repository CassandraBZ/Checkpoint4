import { useNavigate } from "react-router-dom";

import Categories from "../components/Accueil/Categories";
import SearchBar from "../components/Accueil/SearchBar";
import RoundButton from "../components/Buttons/RoundButton";

import bullets from "../assets/images/bullets.svg";
import create from "../assets/icons/addition_white.svg";
import NotesList from "../components/NotesList";

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
      <div className="flex flex-col justify-center items-center text-xl">
        <img src={bullets} alt="bullet-color" className="w-64 mb-6" />
        <h1 className="font-lilita text-main text-center w-1/2 mb-6">
          Vous n'avez pas encore de note, créez en une !
        </h1>
        <RoundButton
          src={create}
          alt="add note"
          handleClick={handleCreateNote}
        />
      </div>
      <NotesList />
    </div>
  );
}

export default Accueil;
