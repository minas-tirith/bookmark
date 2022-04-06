const testedModule = require('.');

const exposedErrors = [
  'ApiError',
  'BadRequestError',
  'UnauthorizedError',
  'ForbiddenError',
  'ResourceNotFoundError',
  'ValidationError',
];

describe('should test core errors', () => {
  it('should expose various kind of errors', () => {
    exposedErrors.forEach((className) => {
      expect(testedModule[className]).toBeDefined();
    });
  });

  it('should expose the correct error', () => {
    const error = new testedModule.ForbiddenError();

    expect(error.type).toBe('ForbiddenError');
    expect(error.message).toBe('Forbidden');
    expect(error.status).toBe(403);
  });

  it('should be instanciable', () => {
    exposedErrors.forEach((className) => {
      const error = new testedModule[className]();

      expect(error instanceof Error);
      expect(error.type).toBeDefined();
      expect(error.message).toBeDefined();
      expect(error.status).toBeDefined();
    });
  });
});
