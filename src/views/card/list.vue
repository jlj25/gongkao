<template>
  <div class="card-list-container">
    <el-card>
      <div class="card-header">
        <span>卡券列表</span>
        <el-button type="primary" @click="handleAdd">新增卡券</el-button>
      </div>
      
      <el-table :data="cardList" style="width: 100%">
        <el-table-column prop="name" label="套餐名称" width="150" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="scope">
            {{ getTypeText(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="120">
          <template #default="scope">
            ¥{{ (scope.row.price / 100).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="validityDays" label="有效期(天)" width="120" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CardList',
  data() {
    return {
      cardList: [
        {
          id: 1,
          name: '月卡套餐',
          type: 'month',
          price: 19900,
          validityDays: 30,
          description: '30天内无限次使用所有自习室座位，含免费茶水'
        },
        {
          id: 2,
          name: '季卡套餐',
          type: 'quarter',
          price: 49900,
          validityDays: 90,
          description: '90天内无限次使用所有自习室座位，含免费茶水'
        }
      ]
    }
  },
  methods: {
    getTypeText(type) {
      const typeMap = {
        'month': '月卡',
        'quarter': '季卡',
        'year': '年卡'
      }
      return typeMap[type] || type
    },
    handleAdd() {
      this.$message.info('新增卡券功能待实现')
    },
    handleEdit(row) {
      this.$message.info(`编辑卡券：${row.name}`)
    },
    handleDelete(row) {
      this.$message.info(`删除卡券：${row.name}`)
    }
  }
}
</script>

<style scoped>
.card-list-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
