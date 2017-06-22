require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var http = require('http')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
// app.all('*', function (req, res, next) {
// res.header("Access-Control-Allow-Credentials", true)
// res.header("Access-Control-Allow-Origin", "*")
// res.header("Access-Control-Allow-Headers", "X-Requested-With")
// res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
// res.header("X-Powered-By", ' 3.2.1')
// res.header("Content-Type", "application/json;charset=utf-8")
// next()
// })

var compiler = webpack(webpackConfig)
// var showList = require('../show-list.json')
// var recommondList = require('../recommond-list.json')

var router = express.Router()

// router.get('/show-list', (req, res) => {
//   res.json({ showList: showList.showList})
// })

// router.get('/recommond-list', (req, res) => {
//   res.json({ recommondList: recommondList.recommondList})
// })

router.get('/banner', (req, res) => {
  function search() {
    return new Promise((resolve, reject) => {
          let banner = '';
          let url = 'http://api.bilibili.com/x/web-show/res/loc?jsonp=jsonp&pf=0&id=23&_=1482805801599'
          http.get(url, response => {
            response.on('data', data => {
              banner += data;
            });
            response.on('end', () => {
              resolve(banner)
            })
          })
    })   
  }
  search()
    .then(banner => {
      res.json(JSON.parse(banner))
    })
})

router.get('/show-list', (req, res) => {
  function search() {
    return new Promise((resolve, reject) => {
          let showList = '';
          let url = 'http://api.bilibili.com/x/web-show/res/loc?pf=0&id=34'
          http.get(url, response => {
            response.on('data', data => {
              showList += data;
            });
            response.on('end', () => {
              resolve(showList)
            })
          })
    })   
  }
  search()
    .then(showList => {
      res.json(JSON.parse(showList))
    })
})


router.get('/recommond-list', (req, res) => {
  function search() {
    return new Promise((resolve, reject) => {
          let recommond = '';
          let url = 'http://www.bilibili.com/index/recommend.json'
          http.get(url, response => {
            response.on('data', data => {
              recommond += data;
            });
            response.on('end', () => {
              resolve(recommond)
            })
          })
    })   
  }
  search()
    .then(recommond => {
      res.json(JSON.parse(recommond))
    })
})



router.get('/comments/:aid', (req, res) => {
  let aid = req.params.aid;
  function search(tab) {
    return new Promise((resolve, reject) => {
          let commentsResult = '';
          let url = 'http://api.bilibili.com/x/v2/reply?type=1&oid='+ aid
          http.get(url, response => {
            response.on('data', data => {
              commentsResult += data;
            });
            response.on('end', () => {
              resolve(commentsResult)
            })
          })
    })   
  }
  search(aid)
    .then(commentsResult => {
      res.json(JSON.parse(commentsResult))
    })
})


router.get('/search/:aid', (req, res) => {
  let aid = req.params.aid;
  function search(tab) {
    return new Promise((resolve, reject) => {
          let searchResult = '';
          let url = 'http://api.bilibili.com/x/tag/archive/tags?aid=' + aid + '&jsonp=jsonp&_=1482889080659'
          http.get(url, response => {
            response.on('data', data => {
              searchResult += data;
            });
            response.on('end', () => {
              resolve(searchResult)
            })
          })
    })   
  }
  search(aid)
    .then(searchResult => {
      res.json(JSON.parse(searchResult))
    })
})

app.use('/api', router);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
