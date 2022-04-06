const { assert, ResourceNotFoundError, BadRequestError } = require('../../modules/coreErrors');
const BookMark = require('../../modules/models/bookmark');

async function handler(data) {
  assert(!data.filters || !data.filters.id, BadRequestError, 'Invalid filters');
  const { filters: { id } } = data;

  const bookmark = await BookMark.query().findOne({ id });
  assert(!bookmark, ResourceNotFoundError, 'Bookmark', id);

  return bookmark;
}

module.exports = handler;
