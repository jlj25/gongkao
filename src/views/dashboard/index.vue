<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <!-- 统计卡片 -->
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon user-icon">
              <el-icon><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.userCount }}</div>
              <div class="stat-label">总用户数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon politics-icon">
              <el-icon><News /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.politicsCount }}</div>
              <div class="stat-label">时政资讯</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon simulation-icon">
              <el-icon><Document /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.simulationCount }}</div>
              <div class="stat-label">模拟题</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon recruit-icon">
              <el-icon><Bell /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.recruitCount }}</div>
              <div class="stat-label">招聘公告</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <!-- 系统状态 -->
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>系统状态</span>
          </template>
          <div class="status-list">
            <div class="status-item">
              <span class="status-label">用户管理</span>
              <el-tag type="success">正常</el-tag>
            </div>
            <div class="status-item">
              <span class="status-label">时政管理</span>
              <el-tag type="success">正常</el-tag>
            </div>
            <div class="status-item">
              <span class="status-label">模拟题管理</span>
              <el-tag type="success">正常</el-tag>
            </div>
            <div class="status-item">
              <span class="status-label">招聘公告</span>
              <el-tag type="success">正常</el-tag>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <!-- 快速操作 -->
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>快速操作</span>
          </template>
          <div class="quick-actions">
            <el-button type="primary" @click="navigateTo('/user/add')">
              <el-icon><User /></el-icon>
              新增管理员
            </el-button>
            <el-button type="success" @click="navigateTo('/politics/add')">
              <el-icon><News /></el-icon>
              发布时政
            </el-button>
            <el-button type="warning" @click="navigateTo('/simulation/add')">
              <el-icon><Document /></el-icon>
              新增模拟题
            </el-button>
            <el-button type="info" @click="navigateTo('/recruit/add')">
              <el-icon><Bell /></el-icon>
              发布招聘
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <!-- 最近活动 -->
      <el-col :span="24">
        <el-card>
          <template #header>
            <span>最近活动</span>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in recentActivities"
              :key="index"
              :timestamp="activity.time"
              :type="activity.type"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { User, News, Document, Bell } from '@element-plus/icons-vue'

export default {
  name: 'DashboardPage',
  components: {
    User,
    News,
    Document,
    Bell
  },
  data() {
    return {
      stats: {
        userCount: 156,
        politicsCount: 89,
        simulationCount: 234,
        recruitCount: 45
      },
      recentActivities: [
        {
          content: '新增模拟题：2025年行测模拟题（一）',
          time: '2025-01-15 14:30:00',
          type: 'primary'
        },
        {
          content: '发布时政：2025年公务员考试大纲发布',
          time: '2025-01-15 10:00:00',
          type: 'success'
        },
        {
          content: '新增管理员：张三',
          time: '2025-01-14 16:20:00',
          type: 'warning'
        },
        {
          content: '发布招聘：2025年事业单位公开招聘',
          time: '2025-01-14 09:15:00',
          type: 'info'
        }
      ]
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  
  .stat-card {
    .stat-content {
      display: flex;
      align-items: center;
      
      .stat-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
        font-size: 24px;
        color: white;
        
        &.user-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        &.politics-icon {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        &.simulation-icon {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        
        &.recruit-icon {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }
      }
      
      .stat-info {
        .stat-number {
          font-size: 28px;
          font-weight: bold;
          color: #303133;
          line-height: 1;
        }
        
        .stat-label {
          font-size: 14px;
          color: #909399;
          margin-top: 5px;
        }
      }
    }
  }
  
  .status-list {
    .status-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
      
      &:last-child {
        border-bottom: none;
      }
      
      .status-label {
        font-size: 14px;
        color: #606266;
      }
    }
  }
  
  .quick-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    .el-button {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}
</style>