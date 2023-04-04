import { useNavigate } from "react-router-dom";

import arrowBack from "../assets/icons/arrow-left.svg";
import add from "../assets/icons/addition_icon.svg";
import CategoriesCard from "../components/Accueil/CategoriesCard";

function Categories() {
  const navigate = useNavigate();
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
          <button type="button">
            <img src={add} alt="add category" className="w-6 h-6" />
          </button>
        </div>
      </div>
      <CategoriesCard />
    </div>
  );
}

export default Categories;
