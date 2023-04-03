import PropTypes from "prop-types";

function RoundButton({ src, alt, handleClick }) {
  return (
    <div className=" bg-main-light rounded-full">
      <button
        type="button"
        onClick={handleClick}
        className="w-fit rounded-full p-3 hover:bg-main"
      >
        <img src={src} alt={alt} className="w-7 md:w-6" />
      </button>
    </div>
  );
}

RoundButton.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default RoundButton;
