const { assert, BadRequestError } = require('./coreErrors');

const ACTIONS = {
  create: 'post',
  update: 'put',
  read: 'get',
  list: 'get',
  delete: 'delete',
};

module.exports = function parseQualifier(qualifier) {
  const [name, version] = qualifier.split(':');
  const components = name.split('.');
  const action = components[components.length - 1];
  assert(!(action in ACTIONS), BadRequestError, `action ${action} is not supported`);

  let route = `/${version}/${components[0]}`;

  if (!['list', 'create'].includes(action)) {
    route += '/:id';
  }

  if (components.length === 3) {
    route += `/${components[1]}`;
  }

  return {
    route,
    method: ACTIONS[action],
  };
};
