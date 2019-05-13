import {
  HTTP
} from "../utils/http-p.js"

class CommonModel extends HTTP {

  // 上传图片
  setUpload(filePath, path) {
    return this.upload({
      url: 'upload',
      data: {
        path
      },
      filePath
    })
  }


}

export {
  CommonModel
}