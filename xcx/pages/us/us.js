// pages/us/us.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   
  },
  registered(){
    wx.navigateTo({
      url: '/pages/registered/registered',
    })
  },
  login() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  //退出登陆
  exit(){
    wx.showModal({
      title: '提示',
      content: '是否确定退出登陆',
      success:(res)=>{
        if(res.confirm){
          wx.removeStorageSync('token')
          wx.removeStorageSync('userInfo')
          this.setData({
            userInfo:null
          })
        }
      }
    })
  },
  // 前往我的博客
  myblog(){
    if (!this.data.userInfo){
      wx.showToast({
        title: '请先登陆',
        icon:'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/myBlog/myBlog',
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
    let userInfo = wx.getStorageSync('userInfo') || null
    this.setData({
      userInfo
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