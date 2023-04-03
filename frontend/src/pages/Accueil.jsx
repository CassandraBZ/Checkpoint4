import Categories from "../components/Accueil/Categories";
import SearchBar from "../components/Accueil/SearchBar";

import bullets from "../assets/images/bullets.svg";
import create from "../assets/icons/addition_white.svg";

function Accueil() {
  return (
    <div>
      <SearchBar />
      <Categories />
      <div className="flex flex-col justify-center items-center text-xl">
        <img src={bullets} alt="bullet-color" className="w-64 mb-6" />
        <h1 className="font-lilita text-main text-center w-1/2">
          Vous n'avez pas encore de note, créez en une !
        </h1>

        <div className=" bg-main-light rounded-full mt-5">
          <button
            type="button"
            className="w-fit rounded-full p-3 hover:bg-main"
          >
            <img src={create} alt="log-out" className="w-7 md:w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
