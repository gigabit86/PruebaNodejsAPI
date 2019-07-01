const Router = require('koa-router')
const authenticate = require('../middlewares/authenticate.js');
const authenticateUser = require('../middlewares/authenticateUser');

const routerAuth = new Router();
routerAuth.prefix('/v1')

routerAuth.post('/login', function* () {
  return authenticate(this);
});

routerAuth.post('/loginUser', function () {
  
  return authenticateUser(this)
});


module.exports = routerAuth

