let fs = require('fs')
let xml2js = require('xml2js')

let rw = {
    readFileAsync(fpath, encoding) {
        return new Promise((resolve, reject) => {
            fs.readFile(fpath, encoding, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    },
    writeFileAsync(fpath, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(fpath, JSON.stringify(data), (err) => {
                if (err) reject(err)
                else resolve()
            })
        })
    },
    //xml format
    parseXMLAsync(xml) {
        return new Promise((resolve, reject) => {
            xml2js.parseString(xml, { trim: true }, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    },
    formatMessage(data) {
        let message = {}
        if(typeof data === 'object') {
            let keys = Object.keys(data)

            for(let i=0,j = keys.length;i<j;i++) {
                let item = data[keys[i]]
                let key = keys[i]
                if(!Array.isArray(item) || item.length === 0) {
                    continue
                }
                if(item.length === 1) {
                    let val = item[0]
                    if(typeof val === 'object') {
                        message[key] = rw.formatMessage(val)
                    }
                    else {
                        message[key] = (val || '').trim()
                    }
                }else {
                    message[key] = []
                    for(let m=0,k=item.length;m<k;m++) {
                        message[key].push(rw.formatMessage(item[m]))
                    }

                }

            }
        }
        return message
    }

}

module.exports = rw