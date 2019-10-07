// pages/blog/blog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  // 发布功能
  onPublish(){
  // 如果它返回true，说明已经授权,希望获取到用户的头像和昵称,在发布博客的时候,需要记录用户的昵称
    // this.setData({
    //   modalShow: true
    // })
    // 判断用户是否授权
   wx.getSetting({
     success:(res) =>{
       console.log(res);
       if(res.authSetting['scope.userInfo']){ 
          wx.getUserInfo({
            success:(res)=>{
              console.log(res);
              this.onLoginSuccess({
                detail: res.userInfo
              })
            }
          })
       }else {
         this.setData({
           modalShow: true
         })
       }
     }
   })
  },

  onLoginSuccess(event){
    console.log(event);
    const detail = event.detail;
    wx.navigateTo({
      url: `../blog-edit/blog-edit?nickName=${detail.name}&avatarUrl=${detail.avatarUrl}`,
    })
  },

  onLoginFail(){
    wx.showModal({
      title: '授权的用户才能发布',
      content: '',
    })
  }
})