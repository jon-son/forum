// pages/detail/detail.js
import { ForumModel } from '../../models/forum.js'
const forumModel = new ForumModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    focus:false,
    info:{},
    management:0,
    content:'',
    reback_user_id:-1,
    reback_name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options.id;
    this.setData({
      id,
      management: options.management||0
    })
    forumModel.getInfo(id)
    .then(res=>{
      if(res.code===0){
        this.setData({
          info: res.post_info
        })
        wx.setNavigationBarTitle({
          title: res.post_info.post_title
        })
      }
    })
    this.getComment(id)
  },
  comment(e){
    console.log(e);
    let info=e.detail.info;
    this.setData({
      reback_user_id: info.user_id,
      reback_name:info.name,
      focus:true
    })
  },
  del(){
    wx.showModal({
      title: '提示',
      content: '是否确认删除该帖子',
      success:res=>{
        if(res.confirm){
          wx.showLoading()
          forumModel.delPost(this.data.id)
          .then(res=>{
            wx.hideLoading()
            if(res.code===0){
              wx.showModal({
                title: '提示',
                content: '删除成功',
                showCancel:false,
                success:r=>{
                  wx.navigateBack()
                }
              })
            }
          })
        }
      }
    })
  },
  formSubmit(e){
    console.log(e);
    let data = e.detail.value;
    data.post_id = this.data.id
    data.reback_user_id = this.data.reback_user_id
    data.imgs=JSON.stringify([])
    wx.showLoading()
    forumModel.setComment(data)
    .then(res=>{
      wx.hideLoading()
      if(res.code===0){
        wx.showToast({
          title: '评论成功',
          icon:'none'
        })
        this.setData({
          content:''
        })
        this.getComment(this.data.id)
      }else{
        wx.showToast({
          title: '评论失败',
          icon: 'none'
        })
      }
    })
  },
  close(){
    this.setData({
      reback_user_id:-1
    })
  },
  getComment(id){
    forumModel.getComment(id)
    .then(res=>{
      if(res.code===0){
        this.setData({
          comments: res.comment_list
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