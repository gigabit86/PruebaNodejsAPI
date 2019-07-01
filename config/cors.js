const cors = require('koa2-origin-cors')
const corsRegla = cors({allowAll: true})
//const corsOptoins = { blackList: ['test.dev.org', '123.22.11.33'], terminationCode: 404 }
module.exports = {
    corsRegla,
}