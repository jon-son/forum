import {
  CommonModel
} from '../models/common.js'
const commonModel = new CommonModel();
const formatTime = time => {
  const date = new Date(time.replace(/\-/g, "/"))
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return {
    myTime: [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':'),
    month: formatNumber(month),
    year,
    day: formatNumber(day),
    hour: formatNumber(hour),
    minute: formatNumber(minute),
    hm: `${hour}:${formatNumber(minute)}`
  }
}

function uploadFile({
  count = 9,
  sourceType = ['album', 'camera'],
  sizeType = ['original', 'compressed'],
  path = ''
}) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count,
      sizeType,
      sourceType,
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFiles = res.tempFiles;
        let urlList = [];
        wx.showLoading({
          title: '正在上传第1张'
        })
        for (let i in tempFiles) {
          wx.showLoading({
            title: `正在上传第${i-0+1}张`
          })
          commonModel.setUpload(tempFiles[i].path, path)
            .then(re => {
              let info = JSON.parse(re);
              urlList.push(info.path);
              if (urlList.length == tempFiles.length) {
                resolve(urlList)
                wx.hideLoading()
              }
            })
            .catch(err => {
              resolve(urlList)
              wx.showToast({
                title: '上传失败请重试',
                icon: 'none'
              })
            })
        }
      }
    })
  })
}

const datetime = (time, char) => {
  const date = new Date(time.replace(/\-/g, "/"));
  const Y = date.getFullYear()
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  const D = date.getDate()
  const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return {
    YMD: Y + char + M + char + D,
    MD: M + '月' + D + '日',
    hm: h + ":" + m,
    all: M + '/' + D + " " + h + ":" + m
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getCurrentPageUrl = () => {
  var pages = getCurrentPages() //获取加载的页面 
  var currentPage = pages[pages.length - 1] //获取当前页面的对象 
  var url = currentPage.route //当前页面url 
  return url
}

const setUnit = (limit) => {
  var size = "";
  if (limit < 0.1 * 1024) { //小于0.1KB，则转化成B
    size = limit.toFixed(2) + "B"

  } else if (limit < 0.1 * 1024 * 1024) { //小于0.1MB，则转化成KB
    size = (limit / 1024).toFixed(2) + "K"

  } else if (limit < 0.1 * 1024 * 1024 * 1024) { //小于0.1GB，则转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + "M"

  } else { //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "G"

  }
  var sizeStr = size + ""; //转成字符串
  var index = sizeStr.indexOf("."); //获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2) //获取小数点后两位的值
  if (dou == "00") { //判断后两位是否为00，如果是则删除00                

    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)

  }
  return size;
}


// 计算剩余时间
const remaining = time => {
  let expireTime = new Date(time.replace(/\-/g, "/")).getTime(),
    myDate = new Date().getTime(),
    remainTime = expireTime - myDate,
    remainMin = remainTime / 1000 / 60,
    hour = parseInt(remainMin / 60),
    min = parseInt(remainMin % 60),
    seconds = parseInt((remainTime / 1000) % 60)
  return {
    date: `${hour}:${min>9?min:'0'+min}:${seconds>9?seconds:'0'+seconds}`,
    bool: remainMin < 60 ? true : false
  };
}
// 生成四位随机数
const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 下载图片
const savePhoto=(photos)=>{
  wx.authorize({
    scope: 'scope.writePhotosAlbum',
    success:(res)=> {
      let num=0;
      console.log(photos);
      wx.showLoading({
        title: `正在保存第1张`,
      })
      for(let i in photos){
        downFile(photos[i].smallImage)
        .then(re=>{
          wx.saveImageToPhotosAlbum({
            filePath:re,
            success:r=> {
              num+=1
              if (num == photos.length){
                wx.showToast({
                  title: '保存成功',
                  icon:'none'
                })
              }else{
                wx.showLoading({
                  title: `正在保存第${num+1}张`,
                })
              }
             }
          })
        })
      }
    },
    fail:(err)=>{
      console.log(err);
      wx.showToast({
        title: '未授权保存图片功能',
      })
    }
  })
}

// 下载文件
function downFile(url){
  return new Promise((resolve, reject)=>{
    wx.downloadFile({
      url, 
      success:res=> {
        console.log(res)
        if (res.statusCode==200){
          resolve(res.tempFilePath)
        }else{
          reject(res)
        }
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}

module.exports = {
  formatTime: formatTime,
  uploadFile: uploadFile,
  datetime: datetime,
  getCurrentPageUrl: getCurrentPageUrl,
  setUnit: setUnit,
  remaining: remaining,
  rand,
  savePhoto
}