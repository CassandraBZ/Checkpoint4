import { useState } from "react";
import { useNavigate } from "react-router-dom";

import expressAPI from "../services/expressAPI";
import { toastError } from "../services/toastService";

import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import MainButton from "./Buttons/MainButton";

function ConnexionForm() {
  const navigate = useNavigate();
  const { user, setUser } = useCurrentUserContext();

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
      <form className="flex flex-col text-left mt-5 mb-6">
        <div className="mb-5 flex flex-col">
          <label htmlFor="email" className="text-grey1 font-semibold mb-1">
            Adresse mail
          </label>
          <input
            className="border border-grey3 h-10 rounded"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-grey1 font-semibold mb-1">
            Mot de passe
          </label>
          <input
            className="border border-grey3 h-10 rounded mb-10"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <MainButton handleClick={handleSubmit}>Me connecter</MainButton>
      </form>
    </div>
  );
}

export default ConnexionForm;
