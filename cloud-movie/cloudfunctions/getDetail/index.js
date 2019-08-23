// 云函数入口文件
const cloud = require('wx-server-sdk')

var rp = require('request-promise');

cloud.init()

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

exports.main = async (event, context) => {
 

  return rp(`http://api.douban.com/v2/movie/subject/${event.movieid}?apikey=0df993c66c0c636e29ecbb5344252a4a`)
    .then(function (res) {
      // Process html...
      console.log(res);
    })
    .catch(function (err) {
      // Crawling failed...
    });