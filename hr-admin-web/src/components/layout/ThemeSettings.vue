<!-- 主题设置组件 -->
<template>
  <div class="theme-settings">
    <!-- 主题模式 -->
    <div class="setting-item">
      <div class="setting-label">主题模式</div>
      <div class="setting-content">
        <el-radio-group v-model="theme" @change="handleThemeChange">
          <el-radio label="light">浅色</el-radio>
          <el-radio label="dark">深色</el-radio>
        </el-radio-group>
      </div>
    </div>

    <!-- 主题色 -->
    <div class="setting-item">
      <div class="setting-label">主题色</div>
      <div class="setting-content">
        <el-color-picker
          v-model="primaryColor"
          @change="handleColorChange"
          :predefine="predefineColors"
        />
        <div class="color-presets">
          <div
            v-for="color in predefineColors"
            :key="color"
            class="color-item"
            :style="{ backgroundColor: color }"
            @click="
              primaryColor = color
              handleColorChange(color)
            "
          ></div>
        </div>
      </div>
    </div>

    <!-- 布局设置 -->
    <div class="setting-item">
      <div class="setting-label">布局设置</div>
      <div class="setting-content">
        <div class="layout-options">
          <div
            class="layout-option"
            :class="{ active: appStore.tagsView }"
            @click="appStore.setTagsView(!appStore.tagsView)"
          >
            <div class="layout-preview">
              <div class="preview-header"></div>
              <div class="preview-tags" v-if="appStore.tagsView"></div>
              <div class="preview-content"></div>
            </div>
            <span>标签页</span>
          </div>

          <div
            class="layout-option"
            :class="{ active: appStore.breadcrumb }"
            @click="appStore.setBreadcrumb(!appStore.breadcrumb)"
          >
            <div class="layout-preview">
              <div class="preview-header"></div>
              <div class="preview-breadcrumb" v-if="appStore.breadcrumb"></div>
              <div class="preview-content"></div>
            </div>
            <span>面包屑</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 侧边栏设置 -->
    <div class="setting-item">
      <div class="setting-label">侧边栏样式</div>
      <div class="setting-content">
        <el-color-picker v-model="sidebarBackground" @change="handleSidebarChange" size="small" />
        <span class="color-label">背景色</span>

        <el-color-picker v-model="sidebarTextColor" @change="handleSidebarChange" size="small" />
        <span class="color-label">文字色</span>

        <el-color-picker v-model="sidebarActiveColor" @change="handleSidebarChange" size="small" />
        <span class="color-label">激活色</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useThemeStore } from '@/store/theme'
import { useAppStore } from '@/store/app'

const themeStore = useThemeStore()
const appStore = useAppStore()

const theme = ref(themeStore.theme)
const primaryColor = ref(themeStore.primaryColor)
const sidebarBackground = ref(themeStore.sidebar.backgroundColor)
const sidebarTextColor = ref(themeStore.sidebar.textColor)
const sidebarActiveColor = ref(themeStore.sidebar.activeTextColor)

const predefineColors = ref([
  '#409EFF',
  '#67C23A',
  '#E6A23C',
  '#F56C6C',
  '#909399',
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
])

// 处理主题变化
const handleThemeChange = (value: 'light' | 'dark') => {
  themeStore.toggleTheme()
}

// 处理颜色变化
const handleColorChange = (color: string) => {
  themeStore.setPrimaryColor(color)
}

// 处理侧边栏样式变化
const handleSidebarChange = () => {
  themeStore.setSidebarStyle({
    backgroundColor: sidebarBackground.value,
    textColor: sidebarTextColor.value,
    activeTextColor: sidebarActiveColor.value,
  })
}

// 监听主题变化
watch(
  () => themeStore.theme,
  (newTheme) => {
    theme.value = newTheme
  },
)

// 监听主题色变化
watch(
  () => themeStore.primaryColor,
  (newColor) => {
    primaryColor.value = newColor
  },
)
</script>

<style scoped lang="scss">
.theme-settings {
  padding: 0 10px;
}

.setting-item {
  margin-bottom: 20px;
}

.setting-label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--el-text-color-primary);
}

.setting-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.color-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.color-item {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
}

.layout-options {
  display: flex;
  gap: 15px;
}

.layout-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &.active .layout-preview {
    border-color: var(--el-color-primary);
  }
}

.layout-preview {
  width: 60px;
  height: 50px;
  border: 2px solid var(--el-border-color);
  border-radius: 4px;
  overflow: hidden;

  .preview-header {
    height: 10px;
    background-color: var(--el-color-primary);
  }

  .preview-tags {
    height: 6px;
    background-color: var(--el-color-primary-light-5);
  }

  .preview-breadcrumb {
    height: 6px;
    background-color: var(--el-color-primary-light-7);
  }

  .preview-content {
    height: 28px;
    background-color: var(--el-color-primary-light-9);
  }
}

.color-label {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-left: 5px;
}
</style>
