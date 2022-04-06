const { v4: uuidv4 } = require('uuid');
const parseRoute = require('../helpers/parseRoute');

async function createContext(ctx, next) {
  ctx.context = {
    correlationId: uuidv4(),
    qualifier: parseRoute(ctx.request.url, ctx.method.toLowerCase()),
  };

  await next();
}

module.exports = createContext;
