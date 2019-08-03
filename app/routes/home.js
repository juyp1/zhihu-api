const Router = require('koa-router')()
const {index,upload,lajifenlei} = require('../controllers/home.js')
Router.get('/', index)
Router.post('/upload', upload)
Router.get('/lajifenlei',lajifenlei)
 
module.exports = Router