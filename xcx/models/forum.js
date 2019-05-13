import {
  HTTP
} from "../utils/http-p.js"

class ForumModel extends HTTP {
  // 获取全部帖子
  getAllPost(key='') {
    return this.request({
      url: `post_list?key=${key}`,
      method: 'GET'
    })
  }

  // 新增帖子
  addPost(data) {
    return this.request({
      url: 'add_post',
      method: 'POST',
      data
    })
  }

  // 获取帖子评论
  getComment(post_id) {
    return this.request({
      url: 'comment_list',
      method: 'GET',
      data:{
        post_id
      }
    })
  }
  // 获取帖子详情
  getInfo(post_id) {
    return this.request({
      url: 'post_info',
      method: 'GET',
      data: {
        post_id
      }
    })
  }
  // 获取我的帖子
  getMyPost() {
    return this.request({
      url: 'mypost_list',
      method: 'GET'
    })
  }

  // 发布帖子
  addPost(data) {
    return this.request({
      url: 'add_post',
      method: 'POST',
      data
    })
  }

  // 删除帖子
  delPost(post_id) {
    return this.request({
      url: 'del_post',
      method: 'POST',
      data:{
        post_id
      }
    })
  }

  // 回复评论
  setComment(data) {
    return this.request({
      url: 'add_comment',
      method: 'POST',
      data
    })
  }

  // 回复评论
  setComment(data) {
    return this.request({
      url: 'add_comment',
      method: 'POST',
      data
    })
  }

}
export {
  ForumModel
}