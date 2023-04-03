import { useEffect, useState } from "react";

import expressAPI from "../services/expressAPI";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

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
    <div>
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
