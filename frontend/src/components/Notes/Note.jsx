import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import expressAPI from "../../services/expressAPI";

function Note({ title, content, colorId, noteId }) {
  const navigate = useNavigate();
  const [color, setColor] = useState();

  useEffect(() => {
    expressAPI
      .get(`/colors/${colorId}`)
      .then((res) => setColor(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex justify-center cursor-pointer">
      {color && (
        <div
          onClick={() => navigate(`/edit-note/${noteId}`)}
          className="mx-4 my-4 rounded-r-lg rounded-tl-lg py-4 px-6 text-main text-sm max-w-[90%]"
          style={{ backgroundColor: color.name }}
          aria-hidden="true"
        >
          <h2 className="font-semibold mb-3">{title}</h2>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}

Note.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  colorId: PropTypes.number.isRequired,
  noteId: PropTypes.number.isRequired,
};

export default Note;
