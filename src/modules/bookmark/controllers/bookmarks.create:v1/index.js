const invoke = require('../../lambdas/bookmark.create:v1');

async function handler(ctx) {
  const data = {
    payload: { ...ctx.request.body },
  };

  ctx.body = await invoke(data);
}

module.exports = { handler };
