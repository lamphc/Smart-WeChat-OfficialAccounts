/**
 * Created by lamph on 2017/4/17.
 */
let path = require('path')
let util = require('./libs/util')
let accessToken_file = path.join(__dirname, './config/access_token.txt')

//内网穿透：$ lt -s mengxwechat -p 1234
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

module.exports = config
