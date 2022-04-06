const BookMark = require('../../models/bookmark');

async function handler() {
  const bookmarks = await BookMark.query();
  return bookmarks;
}

module.exports = handler;
