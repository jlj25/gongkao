<template>
  <div class="studio-list-container">
    <el-card>
      <div class="card-header">
        <span>自习室列表</span>
        <el-button type="primary" @click="handleAdd">新增自习室</el-button>
      </div>
      
      <el-table :data="studioList" style="width: 100%">
        <el-table-column prop="name" label="店名" width="180" />
        <el-table-column prop="city" label="城市" width="120" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="hourPrice" label="每小时价格" width="120">
          <template #default="scope">
            ¥{{ (scope.row.hourPrice / 100).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="120" />
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
  name: 'StudioList',
  data() {
    return {
      studioList: [
        {
          id: 1,
          name: '静心自习室',
          city: '北京市',
          address: '朝阳区建国路88号',
          hourPrice: 1000,
          phone: '13800138000'
        },
        {
          id: 2,
          name: '书和友自习室',
          city: '北京市',
          address: '海淀区中关村大街1号',
          hourPrice: 800,
          phone: '13800138001'
        },
        {
          id: 3,
          name: '青松自习室',
          city: '鹰潭市',
          address: '月湖区胜利路123号',
          hourPrice: 600,
          phone: '13800138002'
        }
      ]
    }
  },
  methods: {
    handleAdd() {
      this.$message.info('新增自习室功能待实现')
    },
    handleEdit(row) {
      this.$message.info(`编辑自习室：${row.name}`)
    },
    handleDelete(row) {
      this.$message.info(`删除自习室：${row.name}`)
    }
  }
}
</script>

<style scoped>
.studio-list-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


</style>
