const Router = require('koa-router')
const customerService = require('../services/customerService');
const jwt = require('../middlewares/jwt');


const routerCustomer = new Router();
routerCustomer.prefix('/v1')

routerCustomer.get('/api/customers', jwt, async function () {
  this.body = await customerService.getCustomers();
});

routerCustomer.get('/api/customer/:id', jwt, async function () {
  let data = await customerService.getCustomer(this.params.id);
  console.log(data);
  this.status = 200;
  this.body = data;
});

routerCustomer.delete('/api/customer/:id', jwt, async function () {
  let data = await customerService.deleteCustomer(this.params.id);
  this.status = 200;
  this.body = data;
});

routerCustomer.post('/api/customer/add', jwt, async function () {
  this.body = await customerService.postCustomer(this.request.body, this.response);
});


routerCustomer.put('/api/customer/update', jwt, async function () {
  this.body = await customerService.updateCustomer(this.request.body, this.response);
});


module.exports = routerCustomer

