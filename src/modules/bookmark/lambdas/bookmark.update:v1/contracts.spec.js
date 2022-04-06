const { ResourceNotFoundError, BadRequestError } = require('../../../../helpers/coreErrors');
const handler = require('.');
const BookMark = require('../../models/bookmark');

async function flush() {
  await BookMark.query().delete();
}

describe('lambdas/bookmark.update:v1', () => {
  afterEach(flush);

  describe('when there is no filters', () => {
    it('throws an error', async () => {
      await expect(handler({})).rejects.toThrow(BadRequestError);
    });
  });

  describe('when there is no filters id', () => {
    it('throws an error', async () => {
      await expect(handler({ filters: {} })).rejects.toThrow(BadRequestError);
    });
  });

  describe('when there is no payload', () => {
    it('throws an error', async () => {
      await expect(handler({
        filters: { id: 1 },
      })).rejects.toThrow(BadRequestError);
    });
  });

  describe('when there is no bookmark', () => {
    it('throws an error', async () => {
      await expect(handler({
        filters: { id: 9999 },
        payload: { title: 'new title' },
      })).rejects.toThrow(ResourceNotFoundError);
    });
  });
});
