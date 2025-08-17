export default {
  methods: {
    // 通用文件上传方法
    handleFileUpload(file, uploadUrl) {
      const formData = new FormData()
      formData.append('file', file)
      
      return this.$http({
        url: uploadUrl,
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    
    // 处理文件选择
    handleFileSelect(event, callback) {
      const file = event.target.files[0]
      if (file) {
        callback(file)
      }
    }
  }
}