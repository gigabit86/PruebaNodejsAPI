const jwt = require('koa-jwt');
const customerService = require('../services/customerService');

module.exports = async function authenticateUser(ctx) {
 let userLogin = await customerService.getCustomerByEmail(ctx.request.body.email);

if(userLogin)
{
  let return_ctx= await userLogin.verifyPassword(ctx.request.body.password)
    .then(function (valid) {
      if (valid) {
        ctx.body = {
          token: jwt.sign({ role: 'user' }, 'd90b56684da9b22d5a3b69c9d3de4337'),
          nombresapellido: userLogin.nombre+" "+userLogin.apellidos,
          empresa: userLogin.empresa,
          email: userLogin.email,
          message: "LOGIN OK",
        };
        ctx.status = 200;
        return ctx;
      } else {
        ctx.status = ctx.status = 401;
        ctx.body = {
          message: "ERROR LOGIN"
        };
        return ctx;
      }
      
    })
    .catch(function (err) {
      ctx.status = ctx.status = 401;
      ctx.body = {
        message: "ERROR LOGIN"
      };
      return ctx;
    });
    return return_ctx;
}
else{
  ctx.status = ctx.status = 401;
  ctx.body = {
    message: "ERROR LOGIN"
  };
  return ctx;
}
}
