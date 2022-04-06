require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const parseQualifier = require('./modules/parseQualifier');
const createContext = require('./middlewares/createContext');

const app = new Koa();
const router = new Router();

const PORT = process.env.PORT || 8000;

require('fs').readdirSync(`${__dirname}/controllers`).forEach((qualifier) => {
  const { method, route } = parseQualifier(qualifier);
  router[method](route, require(`${__dirname}/controllers/${qualifier}`).handler);
});

// error middleware
app.use(function* (next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.body = {
      status: this.status,
      message: err.message,
    };
  }
});

app
  .use(cors())
  .use(bodyParser())
  .use(createContext)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, () => console.log(`listening on http://localhost:${PORT}...`));
