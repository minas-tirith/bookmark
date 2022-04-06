const handler = require('.');
const { BOOKMARK_FIXTURE } = require('./fixtures');
const BookMark = require('../../modules/models/bookmark');

async function populate() {
  await BookMark.query().insert(BOOKMARK_FIXTURE);
}

async function flush() {
  await BookMark.query().delete();
}

describe('lambdas/bookmark.delete:v1', () => {
  let data;
  beforeEach(async () => {
    await populate();
    data = { filters: { id: BOOKMARK_FIXTURE.id } };
  });
  afterEach(flush);

  describe('when there is a bookmark', () => {
    it('deletes the bookmark', async () => {
      const result = await handler(data);
      const bookmark = await BookMark.query().findOne({ id: data.filters.id });

      expect(result).toMatchObject({ deleted: 1 });
      expect(bookmark).toBeUndefined();
    });
  });
});
