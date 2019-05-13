import {
  HTTP
} from "../utils/http-p.js"

class UserModel extends HTTP {
  // 登陆接口
  login(data) {
    return this.request({
      url: 'login',
      method: 'POST',
      data
    })
  }

  // 注册接口
  registered(data) {
    return this.request({
      url: 'add_user',
      method: 'POST',
      data
    })
  }

  // 获取用户信息
  getInfo() {
    return this.request({
      url: 'user_info',
      method: 'GET'
    })
  }

  // 获取验证码
  getCode(receiver) {
    return this.request({
      url: 'code',
      method: 'POST',
      data:{
        receiver
      }
    })
  }
}
export {
  UserModel
}