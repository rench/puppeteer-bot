const fs = require('fs')
const request = require('request')
const api = 'https://api.uomg.com/api/long2dwz?dwzapi=tcn&url='



let fn = url => {
    return new Promise((resolve, reject) => {
        console.log(url)
        request(api + encodeURIComponent(url), (err, response, body) => {
            let data = JSON.parse(body)
            console.log(data)
            if (data.ae_url) {
                resolve(data.ae_url)
            } else {
                resolve(null)
            }
        })
    })
}

(async () => {

    let buf = fs.readFileSync('./vv.txt')

    let string = buf.toString('utf8')

    let lines = string.split('\r\n')
    for (var i = 0; i < lines.length; i++) {
        let line = lines[i]

        let short = null
        while (short == null) {
            short = await fn('http://us.xuankejia.cn/frame.html?url=' + line.split('$')[1])
        }
        fs.writeFileSync('./video.short.txt', line.split('$')[0] + ', ' + short + '\r\n', { flag: 'a' })
    }
})()