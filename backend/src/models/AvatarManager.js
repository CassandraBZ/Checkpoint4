const AbstractManager = require("./AbstractManager");

class AvatarManager extends AbstractManager {
  constructor() {
    super({ table: "avatar" });
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

module.exports = AvatarManager;
