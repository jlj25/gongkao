export default {
  methods: {
    // 通用表单验证方法
    validateForm(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}