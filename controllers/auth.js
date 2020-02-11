const {authAction} = require('../actions/auth');

module.exports = (router) => {
    const routes = router();

    routes.post('/', authAction.signUp);
    routes.get('/', authAction.signIn);

    return routes;
};
