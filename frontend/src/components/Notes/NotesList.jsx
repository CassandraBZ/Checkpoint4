import PropTypes from "prop-types";

import bullets from "../../assets/images/bullets.svg";
import Note from "./Note";

function NotesList({ notes }) {
  return (
    <div className="flex flex-row flex-wrap gap-4 my-4 mx-8 justify-center">
      {notes.length === 0 && (
        <div className="flex flex-col justify-center items-center text-xl">
          <img src={bullets} alt="bullet-color" className="w-64 mb-6" />
          <h1 className="font-lilita text-main text-center w-1/2 mb-6">
            Vous n'avez pas encore de note, créez en une !
          </h1>
        </div>
      )}
      {notes.map((note) => (
        <Note
          key={note.id}
          noteId={note.id}
          title={note.note_title}
          content={note.content}
          colorId={note.color_id}
        />
      ))}
    </div>
  );
}

NotesList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  notes: PropTypes.array({
    id: PropTypes.number,
    note_title: PropTypes.string,
    content: PropTypes.string,
    user_id: PropTypes.number,
    color_id: PropTypes.number,
    category_id: PropTypes.number,
    note_id: PropTypes.number,
  }),
};

NotesList.defaultProps = {
  notes: [],
};

export default NotesList;
