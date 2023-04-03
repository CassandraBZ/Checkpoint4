import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import expressAPI from "../services/expressAPI";
import { toastError } from "../services/toastService";

import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import MainButton from "./Buttons/MainButton";
import Input from "./Input";

import bullets from "../assets/images/bullets.svg";

function ConnexionForm() {
  const navigate = useNavigate();
  const { setUser } = useCurrentUserContext();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      expressAPI
        .post("/login", { email, hashed_password: password })
        .then((res) => {
          const user = { ...res.data.user };
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/Accueil");
        })
        .catch(() => toastError("Le mot de passe ou l'email est incorrect"));
    } else {
      toastError("Veuillez renseigner un email et un mot de passe");
    }
  };

  return (
    <div>
      <div className="">
        <h1 className="font-lilita text-main text-3xl">
          Connectez vous sur notes
        </h1>
        <img src={bullets} alt="bullet-color" />
      </div>
      <div className="flex flex-row text-left">
        <p className="text-grey1 text-s pr-4">Je n'ai pas de compte ?</p>
        <Link
          to="/Registration"
          className="text-main-light font-semibold text-sm underline decoration-2 decoration-main-light"
        >
          M'inscrire
        </Link>
      </div>
      <form className="flex flex-col text-left mt-5 mb-6">
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
        <MainButton handleClick={handleSubmit}>Me connecter</MainButton>
      </form>
    </div>
  );
}

export default ConnexionForm;
