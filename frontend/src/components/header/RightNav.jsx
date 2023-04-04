import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext";

import login from "../../assets/icons/log-in-white.svg";
import logout from "../../assets/icons/log-out-white.svg";

import expressAPI from "../../services/expressAPI";

function RightNav() {
  const { user, setUser } = useCurrentUserContext();
  const [avatar, setAvatar] = useState();
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

  useEffect(() => {
    if (user)
      expressAPI
        .get(`/avatars/${user.avatar_id}`)
        .then((res) => setAvatar(res.data))
        .catch((err) => {
          console.error(err);
        });
  }, [user]);

  return (
    <div className="flex mx-5">
      {user ? (
        <div className="flex items-center gap-2">
          <p className="mr-2 font-semibold text-main">{user.pseudo}</p>
          {avatar && (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                avatar.image
              }`}
              alt="avatar"
              className="h-10 w-10"
            />
          )}
          <div className=" bg-main-light rounded-full">
            <button
              type="button"
              onClick={handleDisconnection}
              className="w-fit rounded-full p-3"
            >
              <img src={logout} alt="log-out" className="w-6 md:w-7" />
            </button>
          </div>
        </div>
      ) : (
        <div className=" bg-main-light rounded-full p-2">
          <Link to="/">
            <img src={login} alt="log-in" className="w-6 md:w-7" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default RightNav;
