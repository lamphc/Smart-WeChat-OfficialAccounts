/**
 * Created by lamph on 2017/4/17.
 */
exports.reply = function*(next) {
    let message = this.wechatMessage
    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log(`扫码关注：${message.EventKey}&${message.ticket}`)
            }
            console.log('meng:',message)
            this.body = `>>欢迎杨佩老妹儿，关注...`
        } else if (message.Event === 'unsubscribe') {
            console.log('无情...')
            this.body = '无情取消关注...'
        }else if(message.Event === 'LOCATION') {
            this.body = `你的位置：${message.Latitude}/${message.Longitude}-${message.Precision}`

        }else if(message.Event === 'CLICK') {
            this.body = `你点了菜单:${message.EventKey}`
        }else if(message.Event === 'SCAN') {

        }
    } else {


    }

    yield next

}