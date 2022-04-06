const { assert, BadRequestError } = require('./coreErrors');

const METHODS = {
  post: 'create',
  put: 'update',
  get: 'list',
  delete: 'delete',
};

module.exports = function parseRoute(route, method) {
  const routeComponents = route.split('/');
  if (routeComponents[2].includes('?')) {
    routeComponents[2] = routeComponents[2].split('?')[0];
  }

  routeComponents.shift();

  const [version, resource, resourceId, action] = routeComponents;
  assert(!version, BadRequestError, 'A version must be specified e.g. /v1/resource');
  assert(!resource, BadRequestError, 'A resource must be specified');
  assert(!(method in METHODS), BadRequestError, `Verb ${method} is not supported`);

  let key = 'controllers/';
  let actionVerb = METHODS[method];

  if (action) {
    key += `${resource}.${action}`;
  } else if (resourceId) {
    key += resource;
    if (method === 'get') {
      actionVerb = 'read'; // replace list by read for a specific resource id
    }
  } else {
    key += resource;
  }

  return `${key}.${actionVerb}:${version}`;
};
