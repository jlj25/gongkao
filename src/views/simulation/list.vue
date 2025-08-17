<template>
  <div class="simulation-list-container">
    <el-card>
      <div class="card-header">
        <span>模拟题列表</span>
        <el-button type="primary" @click="handleAdd">新增模拟题</el-button>
      </div>
      
      <!-- 搜索区域 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="科目">
          <el-select v-model="searchForm.subject" placeholder="请选择科目" clearable>
            <el-option
              v-for="subject in subjectOptions"
              :key="subject"
              :label="subject"
              :value="subject"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model="searchForm.keyword"
            placeholder="请输入标题关键词"
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
        <el-table-column prop="subject" label="科目" width="120" />
        <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
        <el-table-column label="PDF文件" width="120">
          <template #default="scope">
            <el-button 
              v-if="scope.row.pdfUrl" 
              size="small" 
              type="primary" 
              @click="handleViewPdf(scope.row.pdfUrl)"
            >
              查看PDF
            </el-button>
            <span v-else>无</span>
          </template>
        </el-table-column>
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
            :rows="4"
            placeholder="请输入模拟题描述"
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
import { simulationApi } from '@/api'

export default {
  name: 'SimulationList',
  data() {
    return {
      loading: false,
      submitLoading: false,
      dialogVisible: false,
      isEdit: false,
      dialogTitle: '新增模拟题',
      
      // 搜索表单
      searchForm: {
        subject: '',
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
      
      // 科目选项
      subjectOptions: ['行测', '申论', '面试', '其他'],
      
      // 表单数据
      form: {
        title: '',
        subject: '',
        pdfUrl: '',
        images: '',
        description: ''
      },
      
      // 表单验证规则
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
  
  created() {
    this.fetchData()
    this.fetchSubjects()
  },
  
  methods: {
    // 获取数据
    async fetchData() {
      this.loading = true
      try {
        const params = {
          pageNo: this.pagination.pageNo,
          pageSize: this.pagination.pageSize,
          subject: this.searchForm.subject || undefined,
          keyword: this.searchForm.keyword || undefined
        }
        
        const response = await simulationApi.getList(params)
        if (response.code === '200') {
          this.tableData = response.result.list
          this.pagination.total = response.result.total
        } else {
          this.$message.error(response.message || '获取数据失败')
        }
      } catch (error) {
        console.error('获取模拟题列表失败:', error)
        this.$message.error('获取数据失败')
      } finally {
        this.loading = false
      }
    },
    
    // 获取科目列表
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
    
    // 搜索
    handleSearch() {
      this.pagination.pageNo = 1
      this.fetchData()
    },
    
    // 重置搜索
    handleReset() {
      this.searchForm = {
        subject: '',
        keyword: ''
      }
      this.pagination.pageNo = 1
      this.fetchData()
    },
    
    // 新增
    handleAdd() {
      this.isEdit = false
      this.dialogTitle = '新增模拟题'
      this.form = {
        title: '',
        subject: '',
        pdfUrl: '',
        images: '',
        description: ''
      }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate()
      })
    },
    
    // 编辑
    handleEdit(row) {
      this.isEdit = true
      this.dialogTitle = '编辑模拟题'
      this.form = {
        id: row.id,
        title: row.title,
        subject: row.subject,
        pdfUrl: row.pdfUrl,
        images: row.images,
        description: row.description
      }
      this.dialogVisible = true
    },
    
    // 删除
    handleDelete(row) {
      this.$confirm(
        `确定要删除模拟题 "${row.title}" 吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        try {
          const response = await simulationApi.delete(row.id)
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
    
    // 查看PDF
    handleViewPdf(url) {
      if (url) {
        window.open(url, '_blank')
      }
    },
    
    // 提交表单
    async handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            let response
            if (this.isEdit) {
              response = await simulationApi.update(this.form.id, this.form)
            } else {
              response = await simulationApi.add(this.form)
            }
            
            if (response.code === '200') {
              this.$message.success(this.isEdit ? '修改成功' : '新增成功')
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
.simulation-list-container {
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
