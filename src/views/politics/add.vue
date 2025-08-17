<template>
  <div class="politics-add-container">
    <el-card>
      <div class="card-header">
        <span>发布时政</span>
        <el-button @click="goBack">返回列表</el-button>
      </div>
      
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        style="max-width: 800px;"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入时政标题" />
        </el-form-item>
        
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="12"
            placeholder="请输入时政内容"
          />
        </el-form-item>
        
        <el-form-item label="发布时间" prop="publishTime">
          <el-date-picker
            v-model="form.publishTime"
            type="datetime"
            placeholder="选择发布时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="submitLoading">发布</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { politicsApi } from '@/api'

export default {
  name: 'PoliticsAdd',
  data() {
    return {
      submitLoading: false,
      form: {
        title: '',
        content: '',
        publishTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      rules: {
        title: [
          { required: true, message: '请输入时政标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入时政内容', trigger: 'blur' }
        ],
        publishTime: [
          { required: true, message: '请选择发布时间', trigger: 'change' }
        ]
      }
    }
  },
  
  methods: {
    async handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            const response = await politicsApi.add(this.form)
            
            if (response.code === '200') {
              this.$message.success('发布成功')
              this.goBack()
            } else {
              this.$message.error(response.message || '发布失败')
            }
          } catch (error) {
            console.error('发布失败:', error)
            this.$message.error('发布失败')
          } finally {
            this.submitLoading = false
          }
        }
      })
    },
    
    resetForm() {
      this.$refs.form.resetFields()
      this.form.publishTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    
    goBack() {
      this.$router.push('/politics/list')
    }
  }
}
</script>

<style lang="scss" scoped>
.politics-add-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
