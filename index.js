const Koa = require('koa');
const koaBetterBody = require('koa-better-body');
const routerAuth = require('./routes/auth');
const initDB = require('./config/db');
const routerCustomer = require('./routes/customer');


const app = new Koa();

initDB();
app.use(koaBetterBody({fields: 'body'}));
app.use(routerAuth.routes())
app.use(routerCustomer.routes())
app.use(routerAuth.allowedMethods())
app.use(routerCustomer.allowedMethods())

app.listen(3000);
