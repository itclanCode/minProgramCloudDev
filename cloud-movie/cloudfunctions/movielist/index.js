// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 引入包
var rp = require('request-promise')

// 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }
/**
 * start:表示从第几条数据去取
 * 一次去取多少条数据
 * 
 */
exports.main = async (event, context) => {
  

  return rp(`http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`)
    .then(function (res) {
      return res

    })
    .catch(function (err) {
      // Crawling failed...
      console.error(err);
    });
}