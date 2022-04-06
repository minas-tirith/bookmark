const { BadRequestError } = require('../../../../helpers/coreErrors');
const handler = require('.');
const { BOOKMARK_FIXTURE } = require('./fixtures');
const BookMark = require('../../models/bookmark');

async function populate() {
  await BookMark.query().insert(BOOKMARK_FIXTURE);
}

async function flush() {
  await BookMark.query().delete();
}

describe('lambdas/bookmark.create:v1', () => {
  afterEach(flush);

  describe('when there is no payload', () => {
    it('throws an error', async () => {
      await expect(handler({})).rejects.toThrow(BadRequestError);
    });
  });

  describe('when the url is already used', () => {
    let data;
    beforeEach(async () => {
      await populate();
      data = {
        payload: { url: BOOKMARK_FIXTURE.url },
      };
    });

    it('throws an error', async () => {
      await expect(handler(data)).rejects.toThrow(BadRequestError);
    });
  });
});
