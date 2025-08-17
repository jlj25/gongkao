<template>
  <div class="studio-add-container">
    <el-card>
      <div class="card-header">
        <span>新增自习室</span>
        <el-button @click="goBack">返回列表</el-button>
      </div>
      
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="店名" prop="name">
          <el-input v-model="form.name" placeholder="请输入店名" />
        </el-form-item>
        
        <el-form-item label="城市" prop="city">
          <el-input v-model="form.city" placeholder="请输入城市" />
        </el-form-item>
        
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入详细地址" />
        </el-form-item>
        
        <el-form-item label="每小时价格" prop="hourPrice">
          <el-input-number v-model="form.hourPrice" :min="0" :precision="2" />
          <span class="unit">元</span>
        </el-form-item>
        
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话" />
        </el-form-item>
        
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description" placeholder="请输入描述信息" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'StudioAdd',
  data() {
    return {
      form: {
        name: '',
        city: '',
        address: '',
        hourPrice: 0,
        phone: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入店名', trigger: 'blur' }],
        city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        hourPrice: [{ required: true, message: '请输入每小时价格', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$message.success('新增自习室功能待实现')
    },
    handleCancel() {
      this.$router.go(-1)
    },
    goBack() {
      this.$router.push('/studio/list')
    }
  }
}
</script>

<style scoped>
.studio-add-container {
  padding: 20px;
}

.unit {
  margin-left: 10px;
  color: #909399;
}
</style>
