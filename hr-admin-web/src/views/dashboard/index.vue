<!-- src/views/dashboard/index.vue-->
<template>
  <div class="dashboard-container">
    <el-card class="dashboard-card">
      <template #header>
        <div class="card-header">
          <span>控制台</span>
        </div>
      </template>

      <div class="dashboard-content">
        <h2>管理后台系统</h2>
        <p class="welcome-text">欢迎来到控制台dashboard</p>

        <!-- 可以添加统计卡片等 -->
        <div class="stats-cards">
          <el-card shadow="hover" class="stat-card">
            <div class="stat-content">
              <div class="stat-number">128</div>
              <div class="stat-label">员工总数</div>
            </div>
          </el-card>

          <el-card shadow="hover" class="stat-card">
            <div class="stat-content">
              <div class="stat-number">95%</div>
              <div class="stat-label">出勤率</div>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dashboard-container {
  height: 100%;

  .dashboard-card {
    height: 100%;
    min-height: 400px;

    :deep(.el-card__body) {
      height: calc(100% - 60px);
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dashboard-content {
    height: 100%;

    h2 {
      margin-bottom: 10px;
      color: #303133;
    }

    .welcome-text {
      margin-bottom: 30px;
      color: #606266;
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 30px;

      .stat-card {
        text-align: center;

        .stat-content {
          padding: 20px;

          .stat-number {
            font-size: 32px;
            font-weight: bold;
            color: #409eff;
            margin-bottom: 8px;
          }

          .stat-label {
            color: #909399;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
