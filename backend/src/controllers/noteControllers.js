const models = require("../models");

const browse = (req, res) => {
  models.note
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readFromUser = (req, res) => {
  models.note
    .findByUserId(req.params.userId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readFromCategory = (req, res) => {
  const { userId, categoryId } = req.params;

  models.note
    .findByCategory(userId, categoryId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.note
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = async (req, res) => {
  try {
    const note = req.body;

    note.id = parseInt(req.params.id, 10);

    await models.note.updateCategory(note.category_id, note.id);
    const [result] = await models.note.update(note);

    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  try {
    const note = req.body;

    const [noteResult] = await models.note.insert(note);
    if (note.category_id !== "1") {
      await models.note.insertCategory("1", noteResult.insertId);
    }
    await models.note.insertCategory(note.category_id, noteResult.insertId);

    res.location(`/notes/${noteResult.insertId}`).sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    const noteId = req.params.id;
    await models.note.deleteCategory(noteId);

    const [result] = await models.note.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  readFromUser,
  readFromCategory,
};
