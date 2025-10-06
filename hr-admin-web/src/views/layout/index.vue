<!-- src/views/layout/index.vue -->
<template>
  <div class="layout-container">
    <Aside />
    <div class="layout-main">
      <Header />
      <div class="main-content">
        <router-view />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Aside from '@/views/layout/aside/index.vue'
import Header from '@/views/layout/header/index.vue'
import Footer from '@/views/layout/footer/index.vue'
</script>

<style scoped lang="scss">
.layout-container {
  display: flex;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* 重要：防止flex项目溢出 */
  margin: 0;
  padding: 0;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f5f7fa;
  margin: 0;
}

// .layout-container {
//   border: 2px solid red; /* 查看布局容器边界 */
// }

// .layout-main {
//   border: 2px solid blue; /* 查看主内容区域边界 */
// }

// .main-content {
//   border: 2px solid green; /* 查看内容区域边界 */
// }
</style>
