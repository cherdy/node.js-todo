const todoActions = require('../actions/todo').todoAction,
    {userRequired} = require('../utils/user-required');

module.exports = (router) => {
    const routes = router();

    routes.use(userRequired);

    routes.post('/', todoActions.add);
    routes.delete('/', todoActions.delete);
    routes.put('/', todoActions.update);
    routes.get('/', todoActions.get);

    return routes;
};
