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
