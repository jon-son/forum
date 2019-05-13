import { ForumModel } from '../../models/forum.js'
const forumModel = new ForumModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  toDetail(e){
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  onSearch(e){
    let key = e.detail
    forumModel.getAllPost(key)
      .then(res => {
        if (res.code == 0) {
          this.setData({
            list: res.post_list
          })
        }

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
    forumModel.getAllPost()
      .then(res => {
        if (res.code == 0) {
          this.setData({
            list: res.post_list
          })
        }

      })
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
    
  }
})