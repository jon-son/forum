import {
  config
} from '../config.js'
import {
  AuthorizationModel
}
  from '../models/authorization.js';
const authorizationModel = new AuthorizationModel();
class Token {
  verify() {
    var token = wx.getStorageSync('token');
    // console.log('开始检验token')
    // if (!token) {
    // 获取token方法
    this.getTokenFromServer()
    // console.log('没有token,正在获取token')
    // } else {
    // 校验令牌方法 
    // console.log('校验token中...')
    // }

  }

  getTokenFromServer(callBack) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: `${config.api_base_url}wx/user/${config.appid}/login`,
          method: 'GET',
          data: {
            code: res.code
          },
          success: res => {
            if (res.data.token) {
              wx.setStorageSync('token', res.data.token);
              wx.setStorageSync('userInfo', res.data.userInfo);
              callBack && callBack(res.data.token)
            }
          }
        })
      }
    })
  }

  // 检查是否授权方法
  checkPermissions(){
    let promise = new Promise((resolve,reject)=>{
      wx.getSetting({
        success: (res => {
          if (res.authSetting['scope.userInfo'] && wx.getStorageSync('token')) {
            resolve(true)
          }
          else {
            resolve(false)
          }
        })
      })
    })
    return promise
  }

  // 授权方法
  permissionsUser(data){
    // data接收点击授权或者getUserInfo返回的参数
    return new Promise((resolve,reject)=>{
      if (!data.rawData) {
        wx.showToast({
          title: '请授权',
          icon: 'none'
        })
        reject('未授权')
        return 
      }
      wx.login({
        success:res=>{
          if(res.code){
            authorizationModel.getLogin(res.code)
            .then(re=>{
              if(re['token']){
                wx.setStorageSync('token', re.token);
                wx.setStorageSync('userInfo', re.userInfo);
                resolve(re)
                return Promise.reject('已授权')
              }else{
               return authorizationModel.getInfo(re.sessionKey,data)
              }
            })
            .then(re=>{
              if(re.code===0){
                wx.setStorageSync('token', re.token);
                wx.setStorageSync('userInfo', re.userInfo);
                resolve(re)
              }else{
                reject(re)
              }
            })
            .catch(error=>{
            })
          }
        }
      })
    })
  }


}
export {
  Token
}