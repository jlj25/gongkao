<template>
  <div class="politics-list-container">
    <el-card>
      <div class="card-header">
        <span>时政列表</span>
        <el-button type="primary" @click="handleAdd">发布时政</el-button>
      </div>
      
      <!-- 搜索区域 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="关键词">
          <el-input
            v-model="searchForm.keyword"
            placeholder="按照标题进行搜索"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      
      <!-- 表格区域 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="content" label="内容" min-width="300" show-overflow-tooltip />
        <el-table-column prop="publishTime" label="发布时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页区域 -->
      <div class="pagination-container">
        <el-pagination
          :current-page="pagination.pageNo"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="800px"
      @close="handleDialogClose"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入时政标题" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="8"
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
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitLoading">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { politicsApi } from '@/api'

export default {
  name: 'PoliticsList',
  data() {
    return {
      loading: false,
      submitLoading: false,
      dialogVisible: false,
      isEdit: false,
      dialogTitle: '发布时政',
      
      // 搜索表单
      searchForm: {
        keyword: ''
      },
      
      // 表格数据
      tableData: [],
      
      // 分页信息
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      
      // 表单数据
      form: {
        title: '',
        content: '',
        publishTime: ''
      },
      
      // 表单验证规则
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
  
  created() {
    this.fetchData()
  },
  
  methods: {
    // 获取数据
    async fetchData() {
      this.loading = true
      try {
        const params = {
          pageNo: this.pagination.pageNo,
          pageSize: this.pagination.pageSize,
          keyword: this.searchForm.keyword || undefined
        }
        
        const response = await politicsApi.getList(params)
        if (response.code === '200') {
          this.tableData = response.result.list
          this.pagination.total = response.result.total
        } else {
          this.$message.error(response.message || '获取数据失败')
        }
      } catch (error) {
        console.error('获取时政列表失败:', error)
        this.$message.error('获取数据失败')
      } finally {
        this.loading = false
      }
    },
    
    // 搜索
    handleSearch() {
      this.pagination.pageNo = 1
      this.fetchData()
    },
    
    // 重置搜索
    handleReset() {
      this.searchForm = {
        keyword: ''
      }
      this.pagination.pageNo = 1
      this.fetchData()
    },
    
    // 新增
    handleAdd() {
      this.isEdit = false
      this.dialogTitle = '发布时政'
      this.form = {
        title: '',
        content: '',
        publishTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate()
      })
    },
    
    // 编辑
    handleEdit(row) {
      this.isEdit = true
      this.dialogTitle = '编辑时政'
      this.form = {
        id: row.id,
        title: row.title,
        content: row.content,
        publishTime: row.publishTime
      }
      this.dialogVisible = true
    },
    
    // 删除
    handleDelete(row) {
      this.$confirm(
        `确定要删除时政 "${row.title}" 吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        try {
          const response = await politicsApi.delete(row.id)
          if (response.code === '200') {
            this.$message.success('删除成功')
            this.fetchData()
          } else {
            this.$message.error(response.message || '删除失败')
          }
        } catch (error) {
          console.error('删除失败:', error)
          this.$message.error('删除失败')
        }
      }).catch(() => {
        // 取消删除
      })
    },
    
    // 提交表单
    async handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            let response
            if (this.isEdit) {
              response = await politicsApi.update(this.form.id, this.form)
            } else {
              response = await politicsApi.add(this.form)
            }
            
            if (response.code === '200') {
              this.$message.success(this.isEdit ? '修改成功' : '发布成功')
              this.dialogVisible = false
              this.fetchData()
            } else {
              this.$message.error(response.message || '操作失败')
            }
          } catch (error) {
            console.error('操作失败:', error)
            this.$message.error('操作失败')
          } finally {
            this.submitLoading = false
          }
        }
      })
    },
    
    // 分页大小改变
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.pagination.pageNo = 1
      this.fetchData()
    },
    
    // 当前页改变
    handleCurrentChange(val) {
      this.pagination.pageNo = val
      this.fetchData()
    },
    
    // 对话框关闭
    handleDialogClose() {
      this.$refs.form && this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.politics-list-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .search-form {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #f5f7fa;
    border-radius: 4px;
  }
  
  .pagination-container {
    margin-top: 20px;
    text-align: right;
  }
}

.dialog-footer {
  text-align: right;
}
</style>
