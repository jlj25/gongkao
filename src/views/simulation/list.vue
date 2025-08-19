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
        <el-table-column label="图片" width="100">
          <template #default="scope">
            <div v-if="scope.row.images" class="image-preview">
              <el-image
                :src="getFirstImage(scope.row.images)"
                :preview-src-list="getImageList(scope.row.images)"
                fit="cover"
                style="width: 60px; height: 40px; border-radius: 4px;"
                :preview-teleported="true"
              />
            </div>
            <span v-else class="no-image">无图片</span>
          </template>
        </el-table-column>
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
      :center="true"
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
          <div class="upload-section">
            <el-upload
              ref="pdfUpload"
              :auto-upload="false"
              :on-change="handlePdfChange"
              :before-upload="beforePdfUpload"
              accept=".pdf"
              :limit="1"
              :file-list="pdfFileList"
            >
              <el-button size="small" type="primary">选择PDF文件</el-button>
              <template #tip>
                <div class="el-upload__tip">只能上传PDF文件，且不超过50MB</div>
              </template>
            </el-upload>
            <div v-if="form.pdfUrl" class="current-file">
              <span>当前文件：</span>
              <el-button size="small" type="text" @click="handleViewPdf(form.pdfUrl)">查看PDF</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="图片" prop="images">
          <div class="upload-section">
            <el-upload
              ref="imageUpload"
              :auto-upload="false"
              :on-change="handleImageChange"
              :before-upload="beforeImageUpload"
              :on-remove="handleImageRemove"
              accept="image/*"
              multiple
              :limit="5"
              :file-list="imageFileList"
              list-type="picture-card"
            >
              <el-icon><Plus /></el-icon>
              <template #tip>
                <div class="el-upload__tip">只能上传图片文件，最多5张，每张不超过10MB</div>
              </template>
            </el-upload>
            <div v-if="form.images" class="current-images">
              <span>当前图片：</span>
              <div class="image-list">
                <el-image
                  v-for="(img, index) in getImageList(form.images)"
                  :key="index"
                  :src="img"
                  :preview-src-list="getImageList(form.images)"
                  fit="cover"
                  style="width: 60px; height: 60px; margin-right: 8px; border-radius: 4px;"
                />
              </div>
            </div>
          </div>
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
import { simulationApi, ossApi } from '@/api'
import { Plus } from '@element-plus/icons-vue'

export default {
  name: 'SimulationList',
  components: {
    Plus
  },
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
      
      // 文件上传相关
      pdfFileList: [],
      imageFileList: [],
      uploadedImages: [], // 存储已上传的图片URL
      
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
      // 清空文件列表
      this.pdfFileList = []
      this.imageFileList = []
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
      // 清空文件列表（编辑时不显示已有文件在上传组件中）
      this.pdfFileList = []
      this.imageFileList = []
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
            // 准备提交的数据
            const submitData = { ...this.form }
            
            // 如果有新的PDF文件，先上传
            if (this.pdfFileList.length > 0) {
              const pdfUrl = await this.uploadPdfFile()
              if (pdfUrl) {
                submitData.pdfUrl = pdfUrl
              }
            }
            
            // 如果有新的图片文件，先上传
            if (this.imageFileList.length > 0) {
              const imageUrls = await this.uploadImageFiles()
              if (imageUrls.length > 0) {
                // 合并新上传的图片和已有的图片
                const existingImages = this.form.images ? this.form.images.split(',').map(img => img.trim()).filter(img => img) : []
                const allImages = [...existingImages, ...imageUrls]
                submitData.images = allImages.join(',')
              }
            }
            
            let response
            if (this.isEdit) {
              response = await simulationApi.update(this.form.id, submitData)
            } else {
              response = await simulationApi.add(submitData)
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
      // 清空文件列表
      this.pdfFileList = []
      this.imageFileList = []
    },
    
    // 获取第一张图片用于缩略图显示
    getFirstImage(images) {
      if (!images) return ''
      const imageList = images.split(',').map(img => img.trim()).filter(img => img)
      return imageList.length > 0 ? imageList[0] : ''
    },
    
    // 获取图片列表用于预览
    getImageList(images) {
      if (!images) return []
      return images.split(',').map(img => img.trim()).filter(img => img)
    },
    
    // PDF文件选择处理
    handlePdfChange(file, fileList) {
      this.pdfFileList = fileList
    },
    
    // PDF文件上传前验证
    beforePdfUpload(file) {
      const isPDF = file.type === 'application/pdf'
      const isLt50M = file.size / 1024 / 1024 < 50
      
      if (!isPDF) {
        this.$message.error('只能上传PDF格式的文件!')
        return false
      }
      if (!isLt50M) {
        this.$message.error('上传文件大小不能超过50MB!')
        return false
      }
      return true
    },
    
    // 图片选择处理
    handleImageChange(file, fileList) {
      this.imageFileList = fileList
    },
    
    // 图片上传前验证
    beforeImageUpload(file) {
      const isImage = file.type.startsWith('image/')
      const isLt10M = file.size / 1024 / 1024 < 10
      
      if (!isImage) {
        this.$message.error('只能上传图片格式的文件!')
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过10MB!')
        return false
      }
      return true
    },
    
    // 图片移除处理
    handleImageRemove(file, fileList) {
      this.imageFileList = fileList
    },
    
    // 上传PDF文件
    async uploadPdfFile() {
      if (this.pdfFileList.length === 0) return null
      
      const file = this.pdfFileList[0].raw
      if (!file) return null
      
      try {
        const response = await ossApi.uploadPdf(file)
        if (response.code === '200') {
          return response.result.url
        } else {
          this.$message.error(response.message || 'PDF上传失败')
          return null
        }
      } catch (error) {
        console.error('PDF上传失败:', error)
        this.$message.error('PDF上传失败')
        return null
      }
    },
    
    // 上传图片文件
    async uploadImageFiles() {
      if (this.imageFileList.length === 0) return []
      
      const uploadPromises = this.imageFileList.map(async (fileItem) => {
        const file = fileItem.raw
        if (!file) return null
        
        try {
          const response = await ossApi.uploadImage(file)
          if (response.code === '200') {
            return response.result.url
          } else {
            this.$message.error(`图片上传失败: ${response.message}`)
            return null
          }
        } catch (error) {
          console.error('图片上传失败:', error)
          this.$message.error('图片上传失败')
          return null
        }
      })
      
      const results = await Promise.all(uploadPromises)
      return results.filter(url => url !== null)
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
  
  .image-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    
    .el-image {
      cursor: pointer;
      transition: transform 0.2s;
      
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  
  .no-image {
    color: #999;
    font-size: 12px;
  }
  
  .upload-section {
    .current-file, .current-images {
      margin-top: 10px;
      padding: 10px;
      background-color: #f5f7fa;
      border-radius: 4px;
      font-size: 12px;
      
      span {
        color: #606266;
        margin-right: 8px;
      }
    }
    
    .image-list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 8px;
    }
    
    :deep(.el-upload--picture-card) {
      width: 80px;
      height: 80px;
    }
    
    :deep(.el-upload-list--picture-card .el-upload-list__item) {
      width: 80px;
      height: 80px;
    }
  }
}

.dialog-footer {
  text-align: right;
}

// 确保模态框在屏幕正中央
:deep(.el-dialog) {
  margin: 0 auto !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}

:deep(.el-dialog__wrapper) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
</style>
