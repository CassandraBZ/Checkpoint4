import PropTypes from "prop-types";
import { useState } from "react";

import chevronUp from "../../assets/icons/chevron-up.svg";
import chevronDown from "../../assets/icons/chevron-down.svg";
import NotesList from "../Notes/NotesList";

function Category({ title }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-r-lg rounded-tl-lg py-4 px-6 border-2 border-main-light mb-4">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-main font-semibold">{title}</h1>
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <img src={chevronUp} alt="close category" />
            ) : (
              <img src={chevronDown} alt="open category" />
            )}
          </button>
        </div>
        {isOpen && <NotesList />}
      </div>
    </div>
  );
}

Category.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Category;
