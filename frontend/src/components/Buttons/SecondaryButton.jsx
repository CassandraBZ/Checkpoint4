import PropTypes from "prop-types";

function SecondaryButton({ children, handleClick }) {
  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex font-asap justify-center w-full font-semibold text-main-light underline decoration-2 text-sm mb-6 md:w-1/5 hover:text-main"
    >
      {children}
    </button>
  );
}

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func,
};

SecondaryButton.defaultProps = {
  handleClick: () => {},
};

export default SecondaryButton;
