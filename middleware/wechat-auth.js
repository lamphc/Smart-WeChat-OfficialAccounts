let sha1 = require('sha1')
let rawBody = require('raw-body')
let util = require('../libs/util')
let WeChat = require('../wechat/wapi')

module.exports = function (opt, handler) {
    let wechat = new WeChat(opt)

    return function* (next) {
        let query = this.query
        //服务器配置，获取微信GET请求参数（1、字典排序 2、sha1加密字典 3、匹配签名）
        let dict = [opt.token, query.timestamp, query.nonce].sort().join('')
        let sha = sha1(dict)

        if (this.method === 'GET') {
            if (sha === query.signature) {
                this.body = `${query.echostr}`
                console.log('match success from wechat server...')
            } else {
                this.body = 'warn: communication error'
            }
        } else if (this.method === 'POST') {
            if (sha !== query.signature) {
                this.body = 'warn: communication error'
                return false
            }
            let data = yield rawBody(this.req, {
                length: this.length,
                limit: '2mb',
                encoding: this.charset
            })

            let data_fwx = yield util.parseXMLAsync(data)
            console.log(data_fwx, 'user msg:', data_fwx.xml, typeof data_fwx)

            let message = util.formatMessage(data_fwx.xml)
            console.log(message)
            this.wechatMessage = message
            yield handler.call(this, next)
            wechat.reply.call(this)
            //微信返回数据业务操作
            // let now = new Date().getTime()
            // let res = '直播：http://v.youku.com/v_show/id_XMjY5NTE4MjgwNA==.html?spm=a2hww.20023042.m_223837.5~5!2~5~5!3~5~1!2~3~A&from=y1.3-idx-beta-1519-23042.223837.3-2'
            // if (message.MsgType === 'event') {
            //     if (message.Event === 'subscribe') {
            //         this.status = 200
            //         this.type = 'application/xml'
            //         this.body = `<xml>
            //                     <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
            //                     <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
            //                     <CreateTime>${now}</CreateTime>
            //                     <MsgType><![CDATA[text]]></MsgType>
            //                     <Content><![CDATA[${res}]]></Content>
            //                     </xml>`
            //         return
            //     }
            // } else if (message.MsgType === 'text') {
            //     this.status = 200
            //     this.type = 'application/xml'
            //     this.body = `<xml>
            //                     <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
            //                     <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
            //                     <CreateTime>${now}</CreateTime>
            //                     <MsgType><![CDATA[text]]></MsgType>
            //                     <Content><![CDATA[${res}]]></Content>
            //                     </xml>`
            //     return
            // }


        }


    }
}