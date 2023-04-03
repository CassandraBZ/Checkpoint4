import PropTypes from "prop-types";

function MainButton({ children, handleClick }) {
  return (
    <button
      onClick={handleClick}
      type="button"
      className="font-asap flex justify-center py-3 w-full rounded-full bg-main-light font-semibold text-white text-sm mb-6 md:w-[70%] hover:bg-main"
    >
      {children}
    </button>
  );
}

MainButton.propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func,
};

MainButton.defaultProps = {
  handleClick: () => {},
};

export default MainButton;
