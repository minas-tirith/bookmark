const Model = require('../../drivers/knex');

class Type extends Model {
  static get tableName() { return 'types'; }
}

module.exports = Type;
