const axios = require('axios');
const handler = require('.');
const { BOOKMARK_FIXTURE } = require('./fixtures');
const BookMark = require('../../modules/models/bookmark');

jest.mock('axios');

async function flush() {
  await BookMark.query().delete();
}

describe('bookmark.create:v1', () => {
  let data;
  beforeEach(async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        author_name: BOOKMARK_FIXTURE.author_name,
        created_at: new Date(),
      },
    });
    data = { payload: { ...BOOKMARK_FIXTURE } };
  });
  afterEach(flush);

  describe('when the url is not used', () => {
    it('creates a bookmark', async () => {
      const result = await handler(data);
      const bookmark = await BookMark.query().findOne({ url: data.payload.url });
      expect(result).toMatchObject({
        id: bookmark.id,
        url: bookmark.url,
        type: bookmark.type,
      });
    });
  });
});
