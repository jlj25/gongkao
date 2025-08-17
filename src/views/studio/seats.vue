<template>
  <div class="studio-seats-container">
    <el-card>
      <div class="card-header">
        <span>座位管理</span>
        <el-button type="primary" @click="handleAdd">新增座位</el-button>
      </div>
      
      <el-table :data="seatsList" style="width: 100%">
        <el-table-column prop="roomName" label="自习室名称" width="200" />
        <el-table-column prop="desc" label="座位描述" />
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
  name: 'StudioSeats',
  data() {
    return {
      seatsList: [
        {
          id: 1,
          roomName: '静心自习室',
          desc: '靠窗区域，光线充足'
        },
        {
          id: 2,
          roomName: '书和友自习室',
          desc: '安静区域，适合学习'
        }
      ]
    }
  },
  methods: {
    handleEdit(row) {
      this.$message.info(`编辑座位：${row.roomName}`)
    },
    handleDelete(row) {
      this.$message.info(`删除座位：${row.roomName}`)
    }
  }
}
</script>

<style scoped>
.studio-seats-container {
  padding: 20px;
}
</style>
