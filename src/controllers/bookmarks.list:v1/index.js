const invoke = require('../../lambdas/bookmark.list:v1');

async function handler(ctx) {
  ctx.body = await invoke();
}

module.exports = { handler };
