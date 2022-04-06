const BookMark = require('../../modules/models/bookmark');

async function handler() {
  const bookmarks = await BookMark.query();
  return bookmarks;
}

module.exports = handler;
