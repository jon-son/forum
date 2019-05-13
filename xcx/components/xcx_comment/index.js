// components/xcx_comment/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    zan_off: 'images/icon-zan-off.png',
    zan_on: 'images/icon-zan-on.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setComment(e) {
      let info = e.currentTarget.dataset.info;
      this.triggerEvent('comment', {
        info
      }, {})
    },
    zanTap(e) {
      let index = e.currentTarget.id
      this.triggerEvent('zan', {
        index
      }, {})
    }
  }
})