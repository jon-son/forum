// pages/release/release.js
import { ForumModel } from '../../models/forum.js'
import util from '../../utils/util.js'
const forumModel = new ForumModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:[],
    title:'',
    message:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  addImg() {
    let length = this.data.imgs.length;
    util.uploadFile({
      count: 9 - length,
    })
      .then(res => {
        console.log(res);
        this.setData({
          imgs: this.data.imgs.concat(res)
        })
      })
  },
  delImg(e) {
    let index = e.currentTarget.idl
    let arr = this.data.monmentImg;
    arr.splice(index, 1)
    this.setData({
      monmentImg: arr
    })
  },
  formSubmit(e){
    console.log(e)
    let data=e.detail.value;
    data.imgs=JSON.stringify(this.data.imgs)
    if (data.post_title == '') {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      })
      return
    }
    if(data.post_content==''){
      wx.showToast({
        title: '请输入内容',
        icon:'none'
      })
      return 
    }
    wx.showLoading({
      title: '加载中',
    })
    forumModel.addPost(data)
    .then(res=>{
      wx.hideLoading()
      if(res.code===0){
        wx.showModal({
          title: '提示',
          content: '发布成功',
          showCancel:false,
          success:re=>{
            this.setData({
              title:'',
              message:'',
              imgs:[]
            })
          }
        })
      }
      if(res.code==1004){
       wx.showModal({
         title: '提示',
         content: '请先登录',
         success:(re)=>{
           if(re.confirm){
             wx.switchTab({
               url: '/pages/us/us',
             })
           }
         }
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