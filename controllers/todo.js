const todoActions = require('../actions/todo').todoAction;

module.exports = (router) => {
    const routes = router();

    routes.post('/', todoActions.add);
    routes.delete('/', todoActions.delete);
    routes.put('/', todoActions.update);
    routes.get('/', todoActions.get);

    return routes;
};
