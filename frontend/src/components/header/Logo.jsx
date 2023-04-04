import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext";

import LogoNotes from "../../assets/images/logo_note.svg";

function Logo() {
  const { user } = useCurrentUserContext();
  return (
    <div className="w-2/3 md:w-3/4">
      {user ? (
        <Link to="/Accueil" alt="logo_link">
          <img src={LogoNotes} alt="LogoNotes" />
        </Link>
      ) : (
        <img src={LogoNotes} alt="LogoNotes" />
      )}
    </div>
  );
}

export default Logo;
