// pages/login/login.js
import {UserModel} from '../../models/user.js'
const userModel = new UserModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    pass:'',
    bool:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 用户名输入
  userInput(e){
    this.setData({
      user: e.detail
    })
    this.checkInput()

  },
  passInput(e){
    this.setData({
      pass: e.detail
    })
    this.checkInput()
  },
  checkInput(){
    let bool = this.data.user!=''&&this.data.pass!='';
    this.setData({
      bool
    })
  },
  login(){
    const data={
      username:this.data.user,
      password:this.data.pass
    }
    userModel.login(data)
    .then(res=>{
      if(res.code===0){
        wx.setStorageSync('token', res.token)
        wx.setStorageSync('userInfo', res.user_info)
        wx.showModal({
          title: '提示',
          content: '登陆成功',
          success:()=>{
            wx.reLaunch({
              url: '/pages/index/index',
            })
          },
          showCancel:false
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
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