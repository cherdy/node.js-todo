const {todoAction} = require('../actions/todo'),
    {userRequired} = require('../utils/user-required');

module.exports = (router) => {
    const routes = router();

    routes.use(userRequired);

    routes.post('/', todoAction.add);
    routes.delete('/', todoAction.delete);
    routes.put('/', todoAction.update);
    routes.get('/', todoAction.get);

    return routes;
};
