import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { toastError, toastValidation } from "../services/toastService";
import expressAPI from "../services/expressAPI";

import Input from "./Input";
import MainButton from "./Buttons/MainButton";

import bullets from "../assets/images/bullets.svg";

function RegistrationForm() {
  const navigate = useNavigate();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState();

  const handlePseudoChange = (e) => setPseudo(e.target.value);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleAvatar = (avatar) => setSelectedAvatar(avatar);

  const handleForm = (e) => {
    e.preventDefault();

    if ((email, password, pseudo, selectedAvatar)) {
      expressAPI
        .post("/users", {
          pseudo,
          email,
          hashed_password: password,
          avatar_id: selectedAvatar.id,
        })
        .then(() => {
          toastValidation("Votre compte a bien été créé");
          navigate("/");
        })
        .catch((err) => console.error(err));
    } else {
      toastError("Veuillez renseigner votre email et votre statut");
    }
  };

  useEffect(() => {
    expressAPI
      .get("/avatars")
      .then((res) => setAvatars(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="my-8 flex flex-col max-w-[450px] mx-8 sm:m-auto">
      <div className="flex flex-col m-auto">
        <h1 className="font-lilita text-main text-3xl">
          Inscrivez vous sur notes
        </h1>
        <img className="mt-4 h-12" src={bullets} alt="bullet-color" />
      </div>
      <div className="flex flex-wrap flex-row gap-2 my-10 mx-10 md:mx-auto md:max-w-[200px]">
        {avatars.map((avatar) => (
          <img
            key={avatar.id}
            className={`w-14 h-14 ${
              selectedAvatar && selectedAvatar.id === avatar.id
                ? "border-4 rounded-full border-main"
                : ""
            }`}
            src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/${
              avatar.image
            }`}
            alt="avatars"
            onClick={() => handleAvatar(avatar)}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="flex flex-row text-left">
        <p className="text-grey1 text-s pr-4">J'ai déjà un compte ?</p>
        <Link
          to="/"
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
        <div className="flex flex-col mb-8">
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
        <div className="flex justify-center items-center">
          <MainButton handleClick={handleForm}>M'enregistrer</MainButton>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
