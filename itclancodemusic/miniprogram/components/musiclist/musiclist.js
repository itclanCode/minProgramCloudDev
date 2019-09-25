// components/musiclist/musiclist.js
Component({
  /**
   * 组件的属性列表,properties里面的属性应该外部传递过来的
   */
  properties: {
    musiclist: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    playingId: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 表示当前这个是被选中的
    onSelect(event){
      console.log(event);
      console.log(event.currentTarget.dataset.musicid);
      const ds = event.currentTarget.dataset;
      const musicid = ds.musicid;
      console.log("被选中");
      this.setData({
        playingId: musicid
      })

      wx.navigateTo({
        url: `../../pages/player/player?musicId=${musicid}&index=${ds.index}`,
      })
    }
  }
})
