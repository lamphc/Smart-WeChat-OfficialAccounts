/**
 * Created by lamph on 2017/4/17.
 */
exports.reply = function*(next) {
    let message = this.wechatMessage
    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log(`扫码关注：${message.EventKey}&${message.Ticket}`)
            }
            console.log('meng:', message)
            this.body = `>>欢迎杨佩老妹儿，关注...`
        } else if (message.Event === 'unsubscribe') {
            console.log('无情...')
            this.body = '无情取消关注...'
        } else if (message.Event === 'LOCATION') {
            this.body = `你的位置：${message.Latitude}/${message.Longitude}-${message.Precision}`

        } else if (message.Event === 'CLICK') {
            this.body = `你点了菜单:${message.EventKey}`
        } else if (message.Event === 'VIEW') {
            this.body = `你点击了菜单中的链接：${message.EventKey}`
        } else if (message.Event === 'SCAN') {
            console.log(`关注后扫二维码${message.EventKey}-${message.Ticket}`)
            this.body = '监测到你扫了二维码'
        }
    } else if (message.MsgType === 'text') {
        let content = message.Content
        let reply = `欢迎老妹儿，${content}，我没听懂...`
        //回复规则
        switch (content) {
            case '杨佩':
                reply = `i love you~`;
                break;
            case '王猛':
                reply = `i want you~`;
                break;
            case '1':
                reply = `无敌好寂寞~`;
                break;
            case '我要吃饭':
                reply = [
                    {
                        title: '技术改变我',
                        description: '技术改变我技术改变我技术改变我技术改变我技术改变我技术改变我技术改变我技术改变我技术改变我',
                        picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492622223819&di=1a6c556325fa1bfe1e08b3d3fba3da87&imgtype=0&src=http%3A%2F%2Fi.guancha.cn%2Fnews%2F2015%2F10%2F16%2F20151016135551745.jpg',
                        url:'https://github.com'
                    },
                    {
                        title:'技术改变你',
                        description: '技术改变我技术改变我技术改变我技术改变我技术改变我技术改变我技术改变我技术改变我技术改变我',
                        picUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493217192&di=c62efd9a86f9ed10f6387813156db927&imgtype=jpg&er=1&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Ff%2F57b158abb4cf5.jpg',
                        url:'https://nodejs.org'
                    }
                ];
                break;
        }
        this.body = reply


    }

    yield next

}