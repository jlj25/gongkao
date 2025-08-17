<template>
  <div class="card-add-container">
    <el-card>
      <div class="card-header">
        <span>新增卡券</span>
        <el-button @click="goBack">返回列表</el-button>
      </div>
      
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="套餐名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入套餐名称" />
        </el-form-item>
        
        <el-form-item label="套餐类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择套餐类型">
            <el-option label="月卡" value="month" />
            <el-option label="季卡" value="quarter" />
            <el-option label="年卡" value="year" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="form.price" :min="0" :precision="2" />
          <span class="unit">元</span>
        </el-form-item>
        
        <el-form-item label="有效期" prop="validityDays">
          <el-input-number v-model="form.validityDays" :min="1" />
          <span class="unit">天</span>
        </el-form-item>
        
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description" placeholder="请输入套餐描述" />
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
  name: 'CardAdd',
  data() {
    return {
      form: {
        name: '',
        type: '',
        price: 0,
        validityDays: 30,
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入套餐名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择套餐类型', trigger: 'change' }],
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        validityDays: [{ required: true, message: '请输入有效期', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$message.success('新增卡券功能待实现')
    },
    handleCancel() {
      this.$router.go(-1)
    },
    goBack() {
      this.$router.push('/card/list')
    }
  }
}
</script>

<style scoped>
.card-add-container {
  padding: 20px;
}

.unit {
  margin-left: 10px;
  color: #909399;
}
</style>
