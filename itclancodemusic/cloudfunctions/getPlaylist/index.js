/*
*
const MAX_LIMIT = 100;
// 云函数入口文件
const cloud = require('wx-server-sdk')
const playlistCollection = db.collection('playlist');
cloud.init()
const db = cloud.database();  // 云数据库的初始化,完成了当前数据库的一个初始化


// 引入request-promise
const rp = require('request-promise');

const URL = 'http://musicapi.xiecheng.live/personalized'

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取歌单集合playlist中所有的条目数据,存的就是歌单中已有的数据
  // const list = await playlistCollection.get()
  // 获取playlist集合的总条数
  const countResult = await playlistCollection.count();
  const total = countResult.total; // 返回的是一个对象,获取总条数据
  // 分批次去取的次数
  const batchTimes = Math.ceil(total / MAX_LIMIT);  
  const tasks = []; // 里面会放promise对象
  for(let i =0; i<batchTimes; i++){
    let promise =  playlistCollection.skip(i*MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise);
  }
  let list = {
    data: []
  }
  if(tasks.length >0) {
    list = (await Promise.all(tasks)).reduce((acc,cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    });
  }
  // 服务器端最新的歌单信息
  const playlist = await rp(URL).then((res)=> {
    return JSON.parse(res).result;
  })
  // 数组的去重操作
  const newData = [];
  for(let i = 0, len1 = playlist.length;i<len1;i++){
    let flag = true;
    for(let j =0,len2 = list.data.length;j<len2;j++){
      if(playlist[i].id === list.data[j].id){
        flag = false;
        break;
      }
    }
    if(flag){
      newData.push(playlist[i]);
    }
  }

  console.log(playlist);
  // 循环遍历数据,一条一套的插入数据库当中去
  /**
   * 将每个字段插入到数据库当中通过一个拓展运算符
   * createTime:当前插入的一个时间,因为当界面显示歌单的时候,想以一个时间逆序的方式,前面显示最新的歌单,后面显示比较早的歌单,想获取到的是我们服务器的时间
   * 
   */
  // 把去重的结果插入到数据库当中
//   for (let i = 0, len = newData.length;i<len; i++){
//     await playlistCollection.add({
//       data: {
//         ...newData[i],
//         createTime: db.serverDate()
//       }
//     }).then((res) => {
//       console.log('插入成功');
//     }).catch((err) => {
//       console.error('插入失败');
//     })
//   }

//   return newData.length;
// }

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const rp = require('request-promise')

const URL = 'http://musicapi.xiecheng.live/personalized'

const playlistCollection = db.collection('playlist')

const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  // const list = await playlistCollection.get()
  const countResult = await playlistCollection.count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  let list = {
    data: []
  }
  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }

  const playlist = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })

  const newData = []
  for (let i = 0, len1 = playlist.length; i < len1; i++) {
    let flag = true
    for (let j = 0, len2 = list.data.length; j < len2; j++) {
      if (playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if (flag) {
      newData.push(playlist[i])
    }
  }

  for (let i = 0, len = newData.length; i < len; i++) {
    await playlistCollection.add({
      data: {
        ...newData[i],
        createTime: db.serverDate(),
      }
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.error('插入失败')
    })
  }

  return newData.length
}