const { Model } = require('objection');
const Knex = require('knex');

const knex = Knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    typeCast: (field, next) => {
      if (field.type === 'TINY' && field.length === 1) {
        const value = field.string();
        return value ? (value === '1') : null;
      }

      return next();
    },
  },
});

Model.knex(knex);

module.exports = Model;
