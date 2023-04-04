import PropTypes from "prop-types";

function Input({ handleChange, value, inputType, inputId }) {
  return (
    <input
      className="px-5 border-2 border-main-light h-10 rounded-full mb-2"
      type={inputType}
      id={inputId}
      value={value}
      onChange={handleChange}
    />
  );
}

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  inputType: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
};

Input.defaultProps = {
  handleChange: () => {},
};

export default Input;
