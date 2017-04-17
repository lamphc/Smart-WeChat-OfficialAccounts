let request = require('request-promise')

let util = require('../libs/util')

let wechat_api = {
    prefix: 'https://api.weixin.qq.com/cgi-bin/',
    url: {
        access_token: 'token?grant_type=client_credential'
    }
}

//获取微信接口调用票据
class WeChat {
    constructor(opt) {
        this.appID = opt.appID
        this.appSecret = opt.appSecret
        this.getAccessToken = opt.getAccessToken
        this.saveAccessToken = opt.saveAccessToken

        this.getAccessToken().then((data) => {
            let _data
            try {
                //console.log(data)
                //转换Buffer为json格式
                _data = JSON.parse(JSON.stringify(data))
            } catch (e) {
                return this.updateAccessToken()
            }

            if (this.isValidAccessToken(_data)) {
                Promise.resolve(_data)
            } else {
                return this.updateAccessToken()
            }
        }).then((data) => {
            this.access_token = data.access_token
            this.expires_in = data.expires_in

            this.saveAccessToken(data)
        })
    }

    isValidAccessToken(data) {
        if (!data || !data.access_token || !data.expires_in) {
            return false
        }
        let expires_in = data.expires_in
        let now = new Date().getTime()
        if (now < expires_in) {
            return true
        } else {
            return false
        }
    }

    updateAccessToken() {
        let url = `${wechat_api.prefix}${wechat_api.url.access_token}&appid=${this.appID}&secret=${this.appSecret}`
        return new Promise((resolve, reject) => {
            request({url: url, json: true}).then((res) => {
                console.log('Get access_token:', res)
                let _data = res
                let expires_in = (new Date().getTime()) + (_data.expires_in - 20) * 1000
                _data.expires_in = expires_in
                resolve(_data)
            })
        })
    }

    reply() {
        let content = this.body
        let message = this.wechatMessage
        let xml = util.tpl(content, message)
        this.status = 200
        this.type = 'application/xml'
        this.body = xml

    }


}

module.exports = WeChat