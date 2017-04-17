
let koa = require('koa')
let auth = require('./middleware/wechat-auth')
let wechat = require('./wechat/weixin')

let config = require('./config')

const app = new koa()

app.use(auth(config.wechat, wechat.reply))

app.listen(1234, () => {
    console.log('run-port:1234')
})