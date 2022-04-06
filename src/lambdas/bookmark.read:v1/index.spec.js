const handler = require('.');
const { BOOKMARK_FIXTURE } = require('./fixtures');
const BookMark = require('../../modules/models/bookmark');

async function populate() {
  await BookMark.query().insert(BOOKMARK_FIXTURE);
}

async function flush() {
  await BookMark.query().delete();
}

describe('lambdas/bookmark.read:v1', () => {
  let data;
  beforeEach(async () => {
    await populate();
    data = { filters: { id: BOOKMARK_FIXTURE.id } };
  });
  afterEach(flush);

  describe('when there is a bookmark', () => {
    it('retrieves the bookmark', async () => {
      const result = await handler(data);
      expect(result).toMatchObject({
        id: BOOKMARK_FIXTURE.id,
        title: BOOKMARK_FIXTURE.title,
        url: BOOKMARK_FIXTURE.url,
        type: BOOKMARK_FIXTURE.type,
      });
    });
  });
});
