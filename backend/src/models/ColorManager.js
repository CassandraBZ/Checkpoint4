const AbstractManager = require("./AbstractManager");

class ColorManager extends AbstractManager {
  constructor() {
    super({ table: "color" });
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }
}

module.exports = ColorManager;
