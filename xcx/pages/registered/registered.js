// pages/registered/registered.js
import { UserModel } from '../../models/user.js'
const userModel = new UserModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identity:'学生',
    type:0,
    timer:null,
    email:'',
    list:['学生','老师'],
    codeText:'发送验证码',
    name: '',
    username: '',
    password: '',
    code:'',
    student_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getCode(){
    let self=this
    let email = this.data.email
    if(email==''){
      wx.showToast({
        title: '请输入邮箱',
        icon:'none'
      })
      return
    }
    if (this.data.codeText !='发送验证码'){
      return 
    }
    userModel.getCode(email)
    .then(res=>{
      console.log(res);
      if(res.code==0){
        wx.showToast({
          title: '发送成功',
          icon:'none'
        })
        let time=60
         clearInterval(self.data.timer)
        let timer=setInterval(function(){
          if (self.data.codeText==0){
            clearInterval(self.data.timer)
            self.setData({
              codeText:'发送验证码'
            })
            return
          }
          
          self.setData({
            codeText:self.data.codeText-1
          })
        },1000)
        this.setData({
          timer,
          codeText: time,

        })
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  input(e){
    let name = e.currentTarget.id
    this.setData({
      [`${name}`]: e.detail
    })
  },
  selsectId(e){
    console.log(e);
    const index = e.detail.value;
    this.setData({
      type:index,
      identity: this.data.list[index]
    })
  },
  submit(e){
    console.log(e);
    if (e.detail.userInfo){
      let data={
        name: this.data.name,
        username: this.data.username,
        email:this.data.email,
        password:this.data.password,
        code:this.data.code,
        student_id: this.data.student_id,
        avatar: e.detail.userInfo.avatarUrl,
        type:parseInt(this.data.type)+1
      }
      if (data.username==''){
        wx.showToast({
          title: '请输入用户名',
          icon:'none'
        })
        return 
      }
      if (data.name == '') {
        wx.showToast({
          title: '请输入真实姓名',
          icon: 'none'
        })
        return
      }
      if (data.email == '') {
        wx.showToast({
          title: '请输入邮箱',
          icon: 'none'
        })
        return
      }
      if (data.code == '') {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none'
        })
        return
      }
      if (data.student_id == '') {
        wx.showToast({
          title: '请输入学号',
          icon: 'none'
        })
        return
      }
      if (data.password == '') {
        wx.showToast({
          title: '请输入密码',
          icon: 'none'
        })
        return
      }
      userModel.registered(data)
      .then(res=>{
        console.log(res);
        if(res.code===0){
         wx.showModal({
           title: '提示',
           content: '注册成功',
           showCancel:false,
           success:res=>{
             wx.navigateBack({})
           }
         })
        }else{
          wx.showToast({
            title: res.msg,
            icon:'none'
          })
        }
      })
    }else{
      console.log('未授权')
    }
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