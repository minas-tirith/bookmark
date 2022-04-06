const handler = require('.');
const { BOOKMARK_FIXTURE } = require('./fixtures');
const BookMark = require('../../models/bookmark');

async function populate() {
  await BookMark.query().insert(BOOKMARK_FIXTURE);
}

async function flush() {
  await BookMark.query().delete();
}

describe('lambdas/bookmark.update:v1', () => {
  let data;
  beforeEach(async () => {
    await populate();
    data = {
      filters: { id: BOOKMARK_FIXTURE.id },
    };
  });
  afterEach(flush);

  describe('when there is a bookmark', () => {
    beforeEach(() => {
      data.payload = { title: 'new first part title' };
    });

    it('updates the title', async () => {
      await handler(data);

      const bookmark = await BookMark.query().findOne({ id: data.filters.id });
      expect(bookmark.title).toBe(data.payload.title);
    });
  });
});
