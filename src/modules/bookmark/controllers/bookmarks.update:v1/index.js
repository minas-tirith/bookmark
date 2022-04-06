const invoke = require('../../lambdas/bookmark.update:v1');

async function handler(ctx) {
  const data = {
    payload: { ...ctx.request.body },
    filters: {
      id: ctx.params.id,
    },
  };

  ctx.body = await invoke(data);
}

const meta = {
  description: 'Update a bookmark',
  requestSchema: {
    type: 'object',
    required: ['params'],
    properties: {
      query: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' },
        },
      },
    },
  },
  responseSchema: {
    type: 'object',
    properties: {
      body: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            courseId: { type: 'string' },
            partId: { type: 'integer' },
            chapterId: { type: 'integer' },
            title: { type: 'string' },
            content: { type: 'string' },
            version: { type: 'string' },
            position: { type: 'integer' },
            updatedAt: { type: 'string' },
          },
        },
      },
    },
  },
};

module.exports = { handler, meta };
