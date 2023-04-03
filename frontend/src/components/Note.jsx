import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import expressAPI from "../services/expressAPI";

function Note({ title, content, colorId }) {
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
    <div>
      {color && (
        <div
          className="mx-5 rounded-r-lg rounded-tl-lg py-4 px-6 text-main text-sm max-w-[45%]"
          style={{ backgroundColor: color.name }}
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
};

export default Note;
