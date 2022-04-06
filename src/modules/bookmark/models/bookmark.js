const Model = require('../../../drivers/knex');

class Bookmark extends Model {
  static get tableName() { return 'bookmarks'; }

  static get relationMappings() {
    return {
      status: {
        relation: this.BelongsToOneRelation,
        modelClass: `${__dirname}/type`,
        join: {
          from: 'bookmarks.type',
          to: 'types.id',
        },
      },
    };
  }
}

module.exports = Bookmark;
