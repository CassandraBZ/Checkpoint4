import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import expressAPI from "../services/expressAPI";
import FormNote from "../components/Notes/FormNote";

function NoteEdit() {
  const { id } = useParams();
  const [note, setNote] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    expressAPI
      .get(`/notes/${id}`)
      .then((res) => {
        setNote(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (note) {
      expressAPI.get(`/colors/${note.color_id}`).then((res2) => {
        setColor(res2.data);
      });
    }
  }, [note]);

  return (
    <div className="max-w-[700px] md:m-auto ">
      {note && (
        <FormNote
          isEditMode
          note={note}
          color={color}
          category={{
            id: 1,
            category_title: "Tout",
          }}
        />
      )}
    </div>
  );
}

export default NoteEdit;
