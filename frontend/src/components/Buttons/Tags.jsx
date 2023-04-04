import PropTypes from "prop-types";
// import { useCategoryContext } from "../../contexts/CategoryContext";
// import { useEffect, useState } from "react";

function Tags({ name }) {
  // const { activeCategories, setActiveCategories } = useCategoryContext();
  // const [activeClass, setActiveClass] = useState("activeTag");

  const toogleTag = () => {
    // const categories = activeCategories.includes(name)
    //   ? activeCategories.filter((n) => n !== name)
    //   : [...activeCategories, name];
    // setActiveCategories(categories);
    // localStorage.setItem("activeCategories", JSON.stringify(categories));
    // setActiveClass(categories.includes(name) ? "activeTag" : "inactiveTag");
  };

  return (
    <button
      type="button"
      className="activeTag rounded-full inline-flex whitespace-nowrap text px-4 py-[3px] font-medium text-sm mr-4 my-4"
      onClick={toogleTag}
    >
      {name}
    </button>
  );
}

Tags.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Tags;
