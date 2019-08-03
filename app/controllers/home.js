const path = require('path')
const axios = require('axios')
const qs = require('qs')
class HomeCtl {
  index(ctx) {
    ctx.body = '<h1>欢迎使用KO2</h1>'
  }
  upload(ctx) {
    const file = ctx.request.files.file
    const basename = path.basename(file.path)
    console.log(ctx.origin) // 获取当前url
    ctx.body = {
      path: ctx.origin + '/upload/' + basename
    }
  }
  lajifenlei(ctx) {
    //   console.log('aaa')
    //   request.post('https://www.toolnb.com/Tools/Api/lajifenlei.html').send({
    //     'input': '蔬菜'
    // }).then(res=>{
    //   console.log( res)
    //   ctx.body = res;
    // });
    let data = {
      input: '蔬菜'
    }
    axios
      .post('https://www.toolnb.com/Tools/Api/lajifenlei.html', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [
          function(data) {
            return qs.stringify(data)
          }
        ]
      })
      .then(res => {
        console.log(JSON.stringify(res.data))
       
      })
      ctx.body = {
        
      }
  }
}

module.exports = new HomeCtl()
