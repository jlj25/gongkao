<template>
  <div class="simulation-add-container">
    <el-card>
      <div class="card-header">
        <span>新增模拟题</span>
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
          <el-input v-model="form.title" placeholder="请输入模拟题标题" />
        </el-form-item>
        
        <el-form-item label="科目" prop="subject">
          <el-select v-model="form.subject" placeholder="请选择科目">
            <el-option
              v-for="subject in subjectOptions"
              :key="subject"
              :label="subject"
              :value="subject"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="PDF文件" prop="pdfUrl">
          <el-input v-model="form.pdfUrl" placeholder="请输入PDF文件URL" />
        </el-form-item>
        
        <el-form-item label="图片" prop="images">
          <el-input v-model="form.images" placeholder="请输入图片URL，多个用逗号分隔" />
        </el-form-item>
        
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="6"
            placeholder="请输入模拟题描述"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="submitLoading">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { simulationApi } from '@/api'

export default {
  name: 'SimulationAdd',
  data() {
    return {
      submitLoading: false,
      subjectOptions: ['行测', '申论', '面试', '其他'],
      form: {
        title: '',
        subject: '',
        pdfUrl: '',
        images: '',
        description: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入模拟题标题', trigger: 'blur' }
        ],
        subject: [
          { required: true, message: '请选择科目', trigger: 'change' }
        ],
        pdfUrl: [
          { required: true, message: '请输入PDF文件URL', trigger: 'blur' }
        ],
        images: [
          { required: true, message: '请输入图片URL', trigger: 'blur' }
        ]
      }
    }
  },
  
  async created() {
    await this.fetchSubjects()
  },
  
  methods: {
    async fetchSubjects() {
      try {
        const response = await simulationApi.getSubjects()
        if (response.code === '200' && response.result) {
          this.subjectOptions = response.result
        }
      } catch (error) {
        console.error('获取科目列表失败:', error)
      }
    },
    
    async handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            const response = await simulationApi.add(this.form)
            
            if (response.code === '200') {
              this.$message.success('新增成功')
              this.goBack()
            } else {
              this.$message.error(response.message || '新增失败')
            }
          } catch (error) {
            console.error('新增失败:', error)
            this.$message.error('新增失败')
          } finally {
            this.submitLoading = false
          }
        }
      })
    },
    
    resetForm() {
      this.$refs.form.resetFields()
    },
    
    goBack() {
      this.$router.push('/simulation/list')
    }
  }
}
</script>

<style lang="scss" scoped>
.simulation-add-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
