
## 动态生成 附件上传的input框

      uploadFile(file) {
      const blob = new Blob([file])
      const fileExt = file.name.split('.').pop()
      return uploadByUrl({ fileExt }).then(res => {
        const resFile = {
          fileUrl: res.result.fileUrl,
          file: file
        }
        return directUpload(blob).then(({ status }) => {
          if (status === 200) {
            return resFile
          } else {
            throw new Error('上传文件失败')
          }
        })
      })
    },


    directUpload = (url, blob, contentType) => {
  return axios({
    url,
        headers: {
      'Content-Type': contentType
    },
    method: 'post',
    timeout: 10000,
    data:blob
  })
}
   let file = document.createElement('input')
      file.type = 'file'
      file.accept = '.doc,.png,.jpg,.jpeg'
      file.onchange = function(e) {
        this.uploadFile(e.target.files[0])
          .then(file => {
          // this变量需要修改
            this.fileName = file.name
            this.fileUrl = file.url
          
          })
          .catch(err => {
        
          })
      }.bind(this)
      file.click()
