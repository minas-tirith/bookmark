const { assert, BadRequestError, ResourceNotFoundError } = require('../../modules/coreErrors');
const BookMark = require('../../modules/models/bookmark');

async function handler(data) {
  assert(!data.filters || !data.filters.id, BadRequestError, 'Invalid filters');
  assert(!data.payload, BadRequestError, 'Invalid payload');

  const {
    filters: { id }, payload: {
      title = null,
      author_name = null,
      thumbnail_url = null,
      duration = null,
      width = null,
      height = null,
      upload_date = null,
    },
  } = data;
  const bookmark = await BookMark.query().findOne({ id });
  assert(!bookmark, ResourceNotFoundError, 'Bookmark', id);

  const updated = await bookmark.$query().patch({
    title: title || bookmark.title,
    author_name: author_name || bookmark.author_name,
    thumbnail_url: thumbnail_url || bookmark.thumbnail_url,
    duration: duration || bookmark.duration,
    width: width || bookmark.width,
    height: height || bookmark.height,
    upload_date: upload_date || bookmark.upload_date,
  });

  return { updated };
}

module.exports = handler;
