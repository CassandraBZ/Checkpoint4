import { useEffect, useState } from "react";

import expressAPI from "../../services/expressAPI";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext";

import bullets from "../../assets/images/bullets.svg";

import Note from "./Note";

function NotesList() {
  const [notes, setNotes] = useState([]);
  const { user } = useCurrentUserContext();

  useEffect(() => {
    expressAPI
      .get(`/notes/user/${user.id}`)
      .then((res) => setNotes(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex flex-row">
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

export default NotesList;
