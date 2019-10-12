// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '生成中..',
    })
    wx.cloud.callFunction({
      name:'getQrCode'
    }).then(res => {
      wx.hideLoading();
    })
  },

  // 生成小程序码
  onTapQrCode(){
    wx.showLoading({
      title: '生成中...',
    })
    wx.cloud.callFunction({
      name: 'getQrCode'
    }).then((res) => {
      console.log(res)
      const fileId = res.result
      wx.previewImage({
        urls: [fileId],
        current: fileId
      })
      wx.hideLoading()
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我的',
      path: '/pages/profile/profile'
    }
  },
  // 推荐分享
  onTuiJian(){
    console.log("推荐分享");
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  onDevelop(){
    wx.navigateTo({
      url: '/pages/developer-message/developer-message',
    })
  },
// 客服反馈
  onKefu(){
    this.handleContact();
  },
  
  handleContact(e){
    console.log(e)
  }
})