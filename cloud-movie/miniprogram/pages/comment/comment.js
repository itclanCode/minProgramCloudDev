// pages/comment/comment.js
// 数据库的初始化操作
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    content: '', // 评价 的内容
    score: 5,   // 当前评价的分数
    images: [],  // 上传的图片
    fileIds: [],
    movieId: -1 // 存储当前movieID的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      movieId: options.movieid
    })
    wx.cloud.callFunction({
      name: 'getDetail',
      data: {
        movieid: options.movieid
      }
    }).then(res => {
        console.log(res);
        this.setData({
          detail: JSON.parse(res.result)
        })
    })
    .catch(err => {
      console.error(err);
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

  onContentChange: function(event){
    this.setData({
      content: event.detail
    })
  },
  // 电影分数
  onScoreChange: function(event){
    this.setData({
      score: event.detail
    })
  },

  // 提交评价
  submit: function() {
    wx.showLoading({
      title: '评论中',
    })
    console.log(this.data.content, this.data.score);
    // 上传图片到云存储
    let promiseArr = [];
    for(let i =0;i< this.data.images.length; i++) {
      promiseArr.push(new Promise((resolve, reject) => {
        let item = this.data.images[i];
        let suffix = /\.\w+$/.exec(item)[0]; // 返回文件拓展名,正则表达式
        wx.cloud.uploadFile({
          cloudPath: `new Date().getTime()${suffix}`, // 上传至云端的路径
          filePath: item, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            this.setData({
              fileIds: this.data.fileIds.concat(res.fileID)
            })
            resolve();
          },
          fail: console.error
        })
      }))
    }
    // 利用Promise.all方法,参数可以传入一个PromiseArr数组,它会等到数组里面的每一个任务完成之后,在去执行then里面的方法
    Promise.all(promiseArr).then(res => {
        db.collection('comment').add({
          data: {
            content: this.data.content,
            score: this.data.score,
            movieid:this.data.movieid,
            fileIds: this.data.fileIds
          }
        }).then(res => {
          wx.hideLoading();
          wx.showToast({
            title: '评价成功',
          })
        }).catch(err => {
          wx.hideLoading();
          wx.showToast({
            title: '评价失败',
          })
        })
    })
  },

  // 上传图片
  uploadImg: function(){
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res =>  {
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        this.setData({
          images: this.data.images.concat(tempFilePaths)
        })
      }
    })
  }

})