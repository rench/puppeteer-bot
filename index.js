const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

(async () => {
    const browser = await puppeteer.launch({ headless: true, defaultViewport: null, ignoreHTTPSErrors: true, devtools: false });
    //puppeteer.connect({ defaultViewport: null })
    let pages = await browser.pages()
    let page
    if (pages.length > 0) {
        page = pages[0]
    }

    await page.setRequestInterception(true);
    //page.setExtraHTTPHeaders({ "Referer": "https://www.8090g.cn/jiexi/?url=https://www.iqiyi.com/v_19rxko5gc4.html" })
    //https://api.sigujx.com/zy/?url=https://www.iqiyi.com/v_19rxketnok.html
    page.setExtraHTTPHeaders({ "Referer": "https://api.sigujx.com/;https://www.8090g.cn" })

    //await page.emulate(iPhone);
    let response //
    //response = await page.goto('https://www.baidu.com');
    //console.log('baidu ok')

    //page = await browser.newPage();
    let a = false
    page.on('request', async (request) => {
        // Referer: https://www.baidu.com/
        //console.log(request.headers(''))
        //console.log(request.url())
        if (request.url().indexOf('api.php') >= -1) {
            console.log('api request:', request.url())
        }
        if (request.url().indexOf('we111.top') > -1) {
            console.log('m3u8:', request.url())
            //console.log(request)
            //console.log(await response.text())
            //request.abort()
            console.log('request:', request.headers())
            if (!a) {
                request.abort()
                a = true
                if (request.url().indexOf("m3u8") == -1) {
                    await page.goto(request.url())
                } else {

                }
            } else {
                request.continue()
                a = false
            }

        } else {
            request.continue()
        }

    })

    page.on('response', async response => {
        //console.log(response.url() + ' response')
        if (response.url().indexOf('api.php') > -1) {
            console.log('api response:', await response.text())
            await browser.close();
            return
        }
        if (response.url().indexOf('m3u8') > -1) {
            console.log('m3u8:', response.url())
            try {
                await page.goto('about:blank')
                console.log('got blank')
                //page.close()
                await browser.close();
                return
            } catch (e) {

            }
            //console.log(await response.text())
        }

        if (response.url().indexOf('we111.top') > -1) {
            console.log('m3u8:', response.url())
            //console.log(request)
            console.log(await response.text())
            //request.abort()
            //request.continue()
        }
    })
    page.on('console', (msg) => {
        //console.log('xxxxx', msg)
    })
    page.evaluateOnNewDocument(() => {
        // hack
        //console.log = function (msg) { console.log(msg) }
        history.pushState = function () { }
    })
    //response = await page.goto('https://8090.ylybz.cn/jiexi/?url=https://www.iqiyi.com/v_19rxk1tcho.html');
    //response = await page.goto('https://8090.ylybz.cn/jiexi2019/?url=https://www.iqiyi.com/v_19rxk1tcho.html');
    response = await page.goto('https://www.8090g.cn/jiexi/?url=https://v.qq.com/x/cover/mzc00200gjmptww.html');

    //response = await page.goto('https://api.sigujx.com/jx/?url=https://v.qq.com/x/cover/mzc00200gjmptww.html');
    //response = await page.goto('https://www.iqiyi.com/v_19rxk1tcho.html');
    //response = await page.goto('https://www.8090g.cn/?url=https://www.iqiyi.com/v_19rxk1tcho.html');

    //console.log('response')
    //console.log(await response.text())
    // other actions...
    //await browser.close();
})();