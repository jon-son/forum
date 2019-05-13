// components/community/com_dynamic/index.js
import
util
from '../../utils/util.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: Number,
    infoBool: Boolean,
    info: Object,
    ban: Boolean,
    management:Boolean
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      if (this.properties.info.create_time) {
        let date = util.formatTime(this.properties.info.create_time)
        this.setData({
          date
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    img: 'https://cat-nizgg-1257231345.cos.ap-guangzhou.myqcloud.com/ent/1.jpg',
    date: {}

  },

  /**
   * 组件的方法列表
   */
  methods: {
    moreZan() {
      if (this.properties.ban) {
        return
      }
      wx.navigateTo({
        url: `/pages/zanMore/zanMore?id=${this.properties.info.id}`
      })
    },
    like() {
      if (this.properties.ban) {
        return
      }
      this.triggerEvent('like', {}, {})
      let bool = this.properties.info.alreadyLike;
      let num = bool ? this.properties.info.likeAmount - 1 : this.properties.info.likeAmount + 1
      this.setData({
        ['info.alreadyLike']: !bool,
        ['info.likeAmount']: num
      })
    },
    comment() {
      if (this.properties.ban) {
        return
      }
      this.triggerEvent('comment', {}, {})
    },
    del() {
      this.triggerEvent('del', {}, {})

    },
    
    showImg(e) {
      if (this.properties.ban) {
        return
      }
      let src = e.currentTarget.dataset.src;
      let list = this.properties.info.photos.map(item => {
        return item.photo
      })
      wx.previewImage({
        current: src,
        urls: list
      })
    }
  }
})