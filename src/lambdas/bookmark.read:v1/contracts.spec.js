const { ResourceNotFoundError, BadRequestError } = require('../../modules/coreErrors');
const handler = require('.');

describe('lambdas/bookmark.read:v1', () => {
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

  describe('when there is no bookmark', () => {
    it('throws an error', async () => {
      await expect(handler({ filters: { id: 9999 } })).rejects.toThrow(ResourceNotFoundError);
    });
  });
});
