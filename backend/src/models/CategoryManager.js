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

  findFromUser(id) {
    return this.database.query(
      `SELECT category.* FROM ${this.table}
    INNER JOIN category_has_note ON category_has_note.category_id = category.id
    INNER JOIN note ON note.id = category_has_note.note_id
    WHERE note.user_id = ?
    GROUP BY category.id
    ORDER BY category.id`,
      [id]
    );
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  insert(category) {
    return this.database.query(
      `insert into ${this.table} (category_title) values (?)`,
      [category.category_title]
    );
  }

  update(category) {
    return this.database.query(
      `update ${this.table} set category_title = ? where id = ?`,
      [category.category_title]
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = CategoryManager;
