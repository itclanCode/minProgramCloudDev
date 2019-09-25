// 云函数入口文件
const cloud = require('wx-server-sdk')
// 引入TcbRouter
const TcbRouter = require('tcb-router');

// 引入request-promise
const rp = require('request-promise');
const BASE_URL = 'http://musicapi.xiecheng.live';

cloud.init()
const db = cloud.database();  // 数据库的初始化
// 云函数入口函数
exports.main = async (event, context) => {
 const app = new TcbRouter({event})
 // 定义歌单设置相应的路由
 app.router('playlist', async(ctx,next) => {
   ctx.body = await db.collection('playlist')
     .skip(event.start)
     .limit(event.count)
     .orderBy('createTime', 'desc')
     .get()
     .then((res) => {
       return res;
     })

 });

 app.router('musiclist', async(ctx, next) => {
  ctx.body =  await rp(BASE_URL+'/playlist/detail?id='+parseInt(event.playlistId))
    .then((res) => {
      return JSON.parse(res)
    })  
 })

return app.serve();


  // 读取歌单数据,因为歌单数据比较多,分页处理
  // return  await db.collection('playlist')
  // .skip(event.start)
  // .limit(event.count)
  // .orderBy('createTime', 'desc')
  // .get()
  // .then((res) => {
  //   return res;
  // })



}