const { assert, ResourceNotFoundError, BadRequestError } = require('../../modules/coreErrors');
const BookMark = require('../../modules/models/bookmark');

async function handler(data) {
  assert(!data.filters || !data.filters.id, BadRequestError, 'Invalid filters provided');
  const { filters: { id } } = data;

  const bookmark = await BookMark.query().findOne({ id });
  assert(!bookmark, ResourceNotFoundError, 'Bookmark', id);

  const deleted = await bookmark.$query().delete();
  return { deleted };
}

module.exports = handler;
