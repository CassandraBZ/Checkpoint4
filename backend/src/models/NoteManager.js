const AbstractManager = require("./AbstractManager");

class NoteManager extends AbstractManager {
  constructor() {
    super({ table: "note" });
  }

  findByUserId(userId) {
    return this.database.query(
      `select * from  ${this.table} where user_id = ?`,
      [userId]
    );
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findByCategory(userId, categoryId) {
    return this.database.query(
      `SELECT note.*, category_has_note.*
      FROM note
      INNER JOIN category_has_note on category_has_note.note_id = note.id
      WHERE user_id = ? AND category_id = ?`,
      [userId, categoryId]
    );
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  insert(note) {
    return this.database.query(
      `insert into ${this.table} (note_title, content, user_id, color_id) values (?, ?, ?, ?)`,
      [note.note_title, note.content, note.user_id, note.color_id]
    );
  }

  insertCategory(categoryId, noteId) {
    return this.database.query(
      `insert into category_has_note (category_id, note_id) values (?, ?)`,
      [categoryId, noteId]
    );
  }

  update(note) {
    return this.database.query(
      `update ${this.table} set note_title = ?, content = ?, color_id= ? where id = ?`,
      [note.note_title, note.content, note.color_id, note.id]
    );
  }

  updateCategory(categoryId, noteId) {
    return this.database.query(
      `UPDATE category_has_note SET category_id = ?  WHERE note_id = ? AND category_id <> 1`,
      [categoryId, noteId]
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  deleteCategory(id) {
    return this.database.query(
      `delete from category_has_note where note_id = ?`,
      [id]
    );
  }
}

module.exports = NoteManager;
