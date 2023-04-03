import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { toastError } from "../services/toastService";
import expressAPI from "../services/expressAPI";

import Input from "./Input";
import MainButton from "./Buttons/MainButton";

import bullets from "../assets/images/bullets.svg";

function RegistrationForm() {
  const navigate = useNavigate();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [avatar, setAvatar] = useState(1);

  const handlePseudoChange = (e) => setPseudo(e.target.value);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleForm = (e) => {
    e.preventDefault();

    if ((email, password, pseudo)) {
      expressAPI
        .post("/users", { pseudo, email, hashed_password: password })
        .then(() => navigate("/Connexion"))
        .catch((err) => console.error(err));
    } else {
      toastError("Veuillez renseigner votre email et votre statut");
    }
  };

  return (
    <div>
      <div className="">
        <h1 className="font-lilita text-main text-3xl">
          Inscrivez vous sur notes
        </h1>
        <img src={bullets} alt="bullet-color" />
      </div>
      <div className="flex flex-row text-left">
        <p className="text-grey1 text-s pr-4">J'ai déjà un compte ?</p>
        <Link
          to="/Connexion"
          className="text-main-light font-semibold text-sm underline decoration-2 decoration-main-light"
        >
          Me connecter
        </Link>
      </div>
      <form className="flex flex-col text-left mt-5 mb-6">
        <div className="mb-5 flex flex-col">
          <label htmlFor="firstname" className="text-grey1 font-semibold mb-1">
            Pseudo
          </label>
          <Input
            inputType="pseudo"
            inputId="pseudo"
            value={pseudo}
            handleChange={handlePseudoChange}
          />
        </div>
        <div className="mb-5 flex flex-col">
          <label htmlFor="email" className="text-grey1 font-semibold mb-1">
            Adresse mail
          </label>
          <Input
            inputType="email"
            inputId="email"
            value={email}
            handleChange={handleEmailChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-grey1 font-semibold mb-1">
            Mot de passe
          </label>
          <Input
            inputType="password"
            inputId="password"
            value={password}
            handleChange={handlePasswordChange}
          />
        </div>
        <MainButton handleClick={handleForm}>Me connecter</MainButton>
      </form>
    </div>
  );
}

export default RegistrationForm;
