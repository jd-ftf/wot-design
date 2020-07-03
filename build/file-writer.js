const fs = require('fs')
const path = require('path')
const readYaml = require('read-yaml')
const routesConfig = readYaml.sync(path.resolve(__dirname, '../examples/docs/routes.yml'))
const {
  siteMapUrls,
  createSitemapXml
} = require('./sitemap')
const versions = require('../build/deploy/change-log')
const pkg = require('../package.json')

// 写入 version.json 文件
const versionWriter = () => {
  // 把 versions 对象转换为json格式字符串
  const content = JSON.stringify(versions)

  // 指定创建目录及文件名称，·1__dirname为执行当前js文件的目录
  const versionDir = path.resolve(__dirname, '../examples/docs/public')
  const file = path.resolve(__dirname, '../examples/docs/public/versions.json')

  if (!fs.existsSync(versionDir)) {
    fs.mkdirSync(versionDir, { recursive: true })
  }

  // 写入文件
  fs.writeFile(file, content, err => {
    if (err) {
      return console.error(err)
    }
  })
}

// 写入 sitemap.xml 文件
const sitemapWriter = () => {
  const originUrl = 'http://ftf.jd.com/wot-design/' + pkg.version + '/#'
  const sitemapUrl = siteMapUrls(routesConfig, originUrl)
  const sitemapXml = createSitemapXml(sitemapUrl)

  // 创建sitemap操作
  const sitemapDir = path.resolve(__dirname, '../examples/docs/')
  const sitemap = path.resolve(__dirname, '../examples/docs/sitemap.xml')

  if (!fs.existsSync(sitemapDir)) {
    fs.mkdirSync(sitemapDir, { recursive: true })
  }

  // 写入文件
  fs.writeFile(sitemap, sitemapXml, err => {
    if (err) {
      return console.error(err)
    }
  })
}

module.exports = {
  sitemapWriter,
  versionWriter
}
