<template>
  <div class="recruit-add-container">
    <el-card>
      <div class="card-header">
        <span>发布招聘</span>
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
          <el-input v-model="form.title" placeholder="请输入招聘标题" />
        </el-form-item>
        
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="12"
            placeholder="请输入招聘内容"
          />
        </el-form-item>
        
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="选择开始时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="选择结束时间"
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
import { recruitApi } from '@/api'

export default {
  name: 'RecruitAdd',
  data() {
    return {
      submitLoading: false,
      form: {
        title: '',
        content: '',
        startTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        endTime: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入招聘标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入招聘内容', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ]
      }
    }
  },
  
  methods: {
    async handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 验证时间逻辑
          if (this.form.startTime && this.form.endTime) {
            if (new Date(this.form.startTime) >= new Date(this.form.endTime)) {
              this.$message.error('开始时间必须早于结束时间')
              return
            }
          }
          
          this.submitLoading = true
          try {
            const response = await recruitApi.add(this.form)
            
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
      this.form.startTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    
    goBack() {
      this.$router.push('/recruit/list')
    }
  }
}
</script>

<style lang="scss" scoped>
.recruit-add-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
