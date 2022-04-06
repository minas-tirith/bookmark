const invoke = require('../../lambdas/bookmark.delete:v1');

async function handler(ctx) {
  const data = {
    filters: {
      id: ctx.params.id,
    },
  };

  ctx.body = await invoke(data);
}

module.exports = { handler };
