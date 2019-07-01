const jwt = require('koa-jwt');

module.exports = function authenticate(ctx) {
  if (ctx.request.body.password === 'password') {
    ctx.body = {
      token: jwt.sign({ role: 'admin' }, 'a3b69c9d3de4337d90b56684da9b22d5'),
      message: "LOGIN OK"
    };
    ctx.status = 200;
  } else {
    ctx.status = ctx.status = 401;
    ctx.body = {
      message: "ERROR LOGIN"
    };
  }
  return ctx;
}
