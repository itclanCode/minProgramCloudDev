// pages/demotest/demotest.js
import regenatorRuntime from '../../pages/utils/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: ['wxss', 'wxml', 'js', 'json'],
    arrObj: [
      {
        id: 1,
        name: 'wxx'
      },
      {
        id: 2,
        name: 'wxml'
      },
      {
        id: 3,
        name: 'js'
      },
      {
        id: 3,
        name: 'json'
      }
    ]
  },

  sort(){
    console.log(111);
    const length = this.data.arr.length;
    for(let i = 0;i<length;i++) {
      const x = Math.floor(Math.random()*length)
      const y = Math.floor(Math.random()*length)
      const temp = this.data.arr[x];
      this.data.arr[x] = this.data.arr[y];
      this.data.arr[y] = temp;
    }
    this.setData({
      arr: this.data.arr
    })
  },

  sortObj(){
    const length = this.data.arrObj.length;
    for (let i = 0; i < length; i++) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.arrObj[x];
      this.data.arrObj[x] = this.data.arrObj[y];
      this.data.arrObj[y] = temp;
    }
    this.setData({
      arrObj: this.data.arrObj
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // setTimeout(()=> {
    //   console.log(1);
    // },1000)
    // console.log(2);
  //   setTimeout(()=> {
  //     console.log(1);
  //     setTimeout(()=>{
  //       console.log(2);
  //       setTimeout(()=> {
  //         console.log(3);
  //       },3000)
  //     },1000)
  //   },1000)
  // 承诺,许诺,一旦许下承诺,就不可改变
    /**
    * promise:承诺
    * 它有三种状态pending:初始状态,既不是成功的,也不是失败的
    * fulfilled:成功的状态
    * rejectd:当前是一个失败的状态
    * 
    */
      // let p = new Promise((resolve,reject) => {
      //   setTimeout(() => {
      //      console.log(1);
      //      resolve();
      //   },1000)
      // })
      // p.then((res) => {
      //   setTimeout(() => {
      //     console.log(2);
      //   },2000)
      // })
      // let p1 = new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     console.log('p1');
      //     resolve('p1');
      //   },2000)
      // })

      // let p2 = new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     console.log('p2');
      //     resolve('p2');
      //   },1000)
      // })
     
      // let p3 = new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     console.log('p3');
      //     resolve('p3');
      //   },3000)
      // })

      // Promise.all([p1, p2, p3]).then(res => {
      //   console.log('全部完成');
      //   console.log(res);
      // }).catch((err) => {
      //   console.log('失败');
      //   console.log(err);
      // })

    // Promise.race([p1, p2, p3]).then(res => {
    //   console.log('有的完成');
    //   console.log(res);
    // }).catch((err) => {
    //   console.log('失败');
    //   console.log(err);
    // })
    // console.log(this.foo());
    // this.timeout();
    this.foo();
   
  },

  async foo(){
     console.log('foo');
     let res = await this.timeout();
     console.log(res);
  },

  timeout(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(1);
        resolve('resolved');
      }, 1000)
    })
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 获取音乐的信息 
  getMusicInfo(){
      wx.cloud.callFunction({
        name: 'tcbRouter',
        data: {
          $url: 'music'
        }
      }).then((res) => {
        console.log(res);
      })
  },
// 获取电影信息
  getMovieInfo(){
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'movie'
      }
    }).then((res) => {
      console.log(res);
    })
  }


})