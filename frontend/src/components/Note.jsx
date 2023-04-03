import PropTypes from "prop-types";

function Note({ noteId, title, content, colorId }) {
  return (
    <div className={`bg-${colorId}`}>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>{noteId}</p>
    </div>
  );
}

Note.propTypes = {
  noteId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  colorId: PropTypes.number.isRequired,
};

export default Note;
