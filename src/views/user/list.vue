<template>
  <div class="user-list-container">
    <el-card>
      <div class="card-header">
        <span>管理员列表</span>
        <el-button type="primary" @click="handleAdd">新增管理员</el-button>
      </div>
      
      <!-- 搜索区域 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="姓名">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入姓名"
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
        <el-table-column prop="username" label="用户名" width="150" />
        <el-table-column prop="name" label="真实姓名" width="150" />
        <el-table-column prop="phone" label="联系电话" width="150" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
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
      width="500px"
      @close="handleDialogClose"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username" v-if="!isEdit">
          <el-input v-model.trim="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEdit">
          <el-input
            v-model.trim="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model.trim="form.phone" placeholder="请输入联系电话" maxlength="11" />
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
import { userApi } from '@/api'

export default {
  name: 'UserList',
  data() {
    return {
      loading: false,
      submitLoading: false,
      dialogVisible: false,
      isEdit: false,
      dialogTitle: '新增管理员',
      
      // 搜索表单
      searchForm: {
        name: ''
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
        id: undefined,
        username: '',
        password: '',
        name: '',
        phone: ''
      },
      
      // 表单验证规则（手机号自定义校验，自动去除空格、短横线、全角数字等）
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        phone: [
          { validator: this.validatePhone, trigger: 'blur' }
        ]
      }
    }
  },
  
  created() {
    this.fetchData()
  },
  
  methods: {
    // 将全角数字转半角，去除非数字
    normalizeDigits(value) {
      if (!value) return ''
      const toHalf = value.replace(/[\uFF10-\uFF19]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFF10 + 0x30))
      return toHalf.replace(/[^0-9]/g, '')
    },
    // 统一获取行主键，返回字符串，避免长整型精度丢失
    getRowId(row) {
      const raw = row?.id ?? row?.userId ?? row?.uid
      return raw === null || raw === undefined ? undefined : String(raw)
    },
    // 手机号校验：只允许以1开头的11位数字，自动净化输入再校验
    validatePhone(rule, value, callback) {
      const digits = this.normalizeDigits(value)
      if (!digits) return callback(new Error('请输入联系电话'))
      if (!/^\d{11}$/.test(digits)) return callback(new Error('请输入正确的手机号码'))
      // 将净化后的值回填，避免后续提交出现空格/符号
      this.form.phone = digits
      callback()
    },

    // 获取数据
    async fetchData() {
      this.loading = true
      try {
        const params = {
          pageNo: this.pagination.pageNo,
          pageSize: this.pagination.pageSize,
          name: this.searchForm.name || undefined
        }
        
        const response = await userApi.getList(params)
        if (Number(response.code) === 200) {
          const list = Array.isArray(response?.result?.list) ? response.result.list : []
          const normalizedList = list.map(item => ({
            ...item,
            id: String(item.id ?? item.userId ?? item.uid),
            username: item.username ?? item.userName
          }))
          this.tableData = normalizedList
          this.pagination.total = response?.result?.total ?? normalizedList.length
        } else {
          this.$message.error(response.message || '获取数据失败')
        }
      } catch (error) {
        console.error('获取用户列表失败:', error)
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
        name: ''
      }
      this.pagination.pageNo = 1
      this.fetchData()
    },
    
    // 新增
    handleAdd() {
      this.isEdit = false
      this.dialogTitle = '新增管理员'
      this.form = {
        id: undefined,
        username: '',
        password: '',
        name: '',
        phone: ''
      }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate()
      })
    },
    
    // 编辑
    handleEdit(row) {
      this.isEdit = true
      this.dialogTitle = '编辑管理员'
      this.form = {
        id: this.getRowId(row),
        username: row.username ?? row.userName ?? '',
        name: row.name,
        phone: row.phone
      }
      this.dialogVisible = true
    },
    
    // 删除
    async handleDelete(row) {
      const id = this.getRowId(row)
      if (!id) {
        this.$message.error('未找到用户ID，无法删除')
        return
      }
      this.$confirm(
        `确定要删除管理员 "${row.name}" 吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        try {
          const response = await userApi.delete(id)
          if (Number(response.code) === 200) {
            // 乐观更新：本地移除该行
            this.tableData = this.tableData.filter(item => this.getRowId(item) !== id)
            this.$message.success('删除成功')
            // 如果当前页被删空且不是第一页，自动回退一页并刷新
            if (this.tableData.length === 0 && this.pagination.pageNo > 1) {
              this.pagination.pageNo -= 1
              this.fetchData()
            }
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
            // 提交前净化手机号，确保全为数字
            if (this.form && this.form.phone) {
              this.form.phone = this.normalizeDigits(this.form.phone)
            }
            let response
            if (this.isEdit) {
              const payload = {
                id: String(this.form.id),
                name: this.form.name,
                phone: this.form.phone
              }
              response = await userApi.update(String(this.form.id), payload)
            } else {
              response = await userApi.add({
                ...this.form,
                id: undefined
              })
            }
            
            if (Number(response.code) === 200) {
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
.user-list-container {
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
