const axios = require('axios');
const { assert, BadRequestError } = require('../../../../helpers/coreErrors');
const BookMark = require('../../models/bookmark');

async function handler(data) {
  assert(!data.payload || !data.payload.url, BadRequestError, 'Invalid payload');

  const { url } = data.payload;
  const IS_A_PHOTO = url.includes('flickr.com');

  const bookMarkFound = await BookMark.query().findOne({ url });
  assert(bookMarkFound, BadRequestError, 'Bookmark already created');

  const API_URL = IS_A_PHOTO
    ? 'http://www.flickr.com/services/oembed/?format=json&url='
    : 'https://vimeo.com/api/oembed.json?url=';

  const {
    data: {
      width = null,
      height = null,
      title = null,
      author_name = null,
      duration = null,
      thumbnail_url = null,
      upload_date = null,
    },
  } = await axios.get(`${API_URL}${url}`);

  const bookmark = await BookMark.query().insert({
    title,
    author_name,
    thumbnail_url,
    url,
    duration,
    type: IS_A_PHOTO ? 1 : 2,
    width,
    height,
    upload_date,
    created_at: new Date(),
  });

  return bookmark;
}

module.exports = handler;
