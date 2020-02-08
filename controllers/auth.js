const authActions = require('../actions/auth').authAction;

module.exports = (router) => {
    const routes = router();

    routes.post('/', authActions.signUp);
    routes.get('/', authActions.signIn);

    return routes;
};
