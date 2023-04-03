import { Link, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext";

import login from "../../assets/icons/log-in-white.svg";
import logout from "../../assets/icons/log-out-white.svg";

import expressAPI from "../../services/expressAPI";

function RightNav() {
  const { user, setUser } = useCurrentUserContext();
  const navigate = useNavigate();

  const handleDisconnection = () => {
    expressAPI
      .get("/logout")
      .then(() => {
        localStorage.removeItem("user");
        setUser("");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex mx-5">
      {user ? (
        <div className=" bg-main-light rounded-full">
          <button
            type="button"
            onClick={handleDisconnection}
            className="w-fit rounded-full p-3"
          >
            <img src={logout} alt="log-out" className="w-8 md:w-6" />
          </button>
        </div>
      ) : (
        <div className=" bg-main-light rounded-full p-2">
          <Link to="/">
            <img src={login} alt="log-in" className="w-7 md:w-6" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default RightNav;
