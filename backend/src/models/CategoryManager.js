const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
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

  update(note) {
    return this.database.query(
      `update ${this.table} set note_title = ?, content = ?, color_id= ? where id = ?`,
      [note.note_title, note.content, note.color_id, note.id]
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = CategoryManager;
