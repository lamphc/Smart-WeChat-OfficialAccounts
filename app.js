
let koa = require('koa')
let auth = require('./middleware/wechat-auth')

let path = require('path')
let util = require('./libs/util')
let accessToken_file = path.join(__dirname, './config/access_token.txt')

let config = {
    //lamphc accounts info
    wechat: {
        appID: 'wxcbe4de051ad6e513',
        appSecret: 'dcc5d4895f88c7f4eeee443c0eb72306',
        token: 'lampcc',
        getAccessToken() {
            return util.readFileAsync(accessToken_file)
        },
        saveAccessToken(data) {
            return util.writeFileAsync(accessToken_file, data)
        }
    }

}

const app = new koa()

app.use(auth(config.wechat))

app.listen(1234, () => {
    console.log('run-port:1234')
})