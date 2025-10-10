<!-- src/components/layout/AppTab.vue -->
<template>
  <div class="app-tab">
    <!-- 🧩 标签页容器 -->
    <el-tabs
      v-model="activeTab"
      type="card"
      class="draggable-tabs"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
      closable
    >
      <!-- 🆕 使用自定义导航实现拖拽排序 -->
      <template #nav>
        <draggable
          :model-value="tabList"
          tag="div"
          class="el-tabs__nav"
          :animation="200"
          :ghost-class="'drag-ghost'"
          :group="{ name: 'tabs' }"
          item-key="path"
          @end="onDragEnd"
        >
          <template #item="{ element }">
            <div
              class="el-tabs__item"
              :class="{ 'is-active': activeTab === element.path }"
              @click="handleTabClick({ paneName: element.path })"
              @contextmenu="handleContextMenu($event, element.path)"
            >
              <span class="el-tabs__item-label">{{ element.title }}</span>
              <!-- 🆕 关闭按钮（仅在多标签时显示） -->
              <el-icon
                v-if="tabList.length > 1"
                class="el-tabs__item-close"
                @click.stop="handleTabRemove(element.path)"
              >
                <Close />
              </el-icon>
            </div>
          </template>
        </draggable>
      </template>

      <!-- 🆕 空的 tab-pane，仅用于渲染标签，不显示内容 -->
      <el-tab-pane v-for="tab in tabList" :key="tab.path" :label="tab.title" :name="tab.path" />
    </el-tabs>

    <!-- 🆕 自定义右键菜单 -->
    <div
      v-if="contextMenuVisible"
      ref="contextMenuRef"
      class="custom-context-menu"
      :style="contextMenuStyle"
      @click.stop
    >
      <div class="context-menu-item" @click="handleMenuCommand('closeCurrent')">
        <el-icon><Close /></el-icon>
        <span>关闭当前</span>
      </div>
      <div class="context-menu-item" @click="handleMenuCommand('closeOthers')">
        <el-icon><CircleClose /></el-icon>
        <span>关闭其他</span>
      </div>
      <div class="context-menu-item" @click="handleMenuCommand('closeAll')">
        <el-icon><Delete /></el-icon>
        <span>关闭全部</span>
      </div>
      <div class="context-menu-divider"></div>
      <div class="context-menu-item" @click="handleMenuCommand('refresh')">
        <el-icon><Refresh /></el-icon>
        <span>刷新</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ✅ 核心依赖
import { computed, ref, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTabStore } from '@/stores/tab/tabStore'
import draggable from 'vuedraggable'
import { Close, CircleClose, Delete, Refresh } from '@element-plus/icons-vue'

// ✅ 路由实例
const router = useRouter()

// ✅ 标签页状态
const tabStore = useTabStore()
const { tabList, activeTab } = storeToRefs(tabStore)

// ✅ 右键菜单状态
const contextMenuVisible = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const contextTabPath = ref('')
const contextMenuRef = ref<HTMLElement>()

// ✅ 右键菜单定位样式（防止溢出）
const contextMenuStyle = computed(() => {
  let left = contextMenuX.value
  let top = contextMenuY.value

  if (contextMenuRef.value) {
    const menuWidth = contextMenuRef.value.offsetWidth
    const menuHeight = contextMenuRef.value.offsetHeight
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    if (left + menuWidth > windowWidth) left = windowWidth - menuWidth - 10
    if (top + menuHeight > windowHeight) top = windowHeight - menuHeight - 10
  }

  return {
    left: `${left}px`,
    top: `${top}px`,
    zIndex: '9999',
  }
})

// ✅ 打开右键菜单
function handleContextMenu(e: MouseEvent, path: string) {
  e.preventDefault()
  e.stopPropagation()
  contextMenuX.value = e.clientX
  contextMenuY.value = e.clientY
  contextTabPath.value = path
  contextMenuVisible.value = true

  nextTick(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('contextmenu', handleClickOutside)
  })
}

// ✅ 点击外部关闭菜单
function handleClickOutside(e: MouseEvent) {
  if (contextMenuRef.value && !contextMenuRef.value.contains(e.target as Node)) {
    closeContextMenu()
  }
}

// ✅ 关闭菜单
function closeContextMenu() {
  contextMenuVisible.value = false
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('contextmenu', handleClickOutside)
}

// ✅ 菜单命令处理
function handleMenuCommand(command: string) {
  if (!contextTabPath.value) return

  switch (command) {
    case 'closeCurrent':
      handleTabRemove(contextTabPath.value)
      break
    case 'closeOthers':
      tabStore.closeOthers(contextTabPath.value)
      if (activeTab.value !== contextTabPath.value) {
        router.push(contextTabPath.value)
      }
      break
    case 'closeAll':
      tabStore.closeAll()
      router.push('/dashboard')
      break
    case 'refresh':
      refreshTab(contextTabPath.value)
      break
  }

  closeContextMenu()
}

// ✅ 刷新当前标签页
function refreshTab(path: string) {
  const currentPath = router.currentRoute.value.path
  if (path === currentPath) {
    tabStore.refreshTab(path)
  }
}

// ✅ 点击标签页跳转
function handleTabClick(pane: { paneName: string | number }) {
  const path = String(pane.paneName)
  router.push(path)
}

// ✅ 关闭标签页
function handleTabRemove(path: string | number) {
  const targetPath = String(path)
  const newActiveTab = tabStore.removeTab(targetPath)

  if (activeTab.value === targetPath) {
    router.push(newActiveTab)
  }
}

// ✅ 拖拽排序结束
function onDragEnd() {
  tabStore.updateTabOrder(tabList.value)
}

// ✅ 清理事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('contextmenu', handleClickOutside)
})
</script>

<style scoped lang="scss">
.app-tab {
  background-color: var(--card-bg); // ✅ 替换 #fff
  border-bottom: 1px solid var(--hover-bg); // ✅ 替换 #e4e7ed
  position: relative;

  // 🆕 拖拽标签页样式
  .draggable-tabs {
    :deep(.el-tabs__header) {
      margin: 0;

      .el-tabs__nav {
        border: none;

        .el-tabs__item {
          position: relative;
          user-select: none;
          transition: all 0.2s ease;
          cursor: pointer;
          background-color: var(--card-bg); // ✅ 替换 #fff
          &:hover {
            background-color: var(--hover-bg); // ✅ 替换 #f5f7fa
          }

          &.is-active {
            background-color: var(--card-bg);
            border-bottom-color: var(--card-bg);
          }

          .el-tabs__item-label {
            margin-right: 8px;
          }

          .el-tabs__item-close {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            transition: all 0.2s ease;

            &:hover {
              background-color: #c0c4cc;
              color: #fff;
            }
          }
        }
      }
    }

    // 🆕 隐藏内容区域（只显示导航）
    :deep(.el-tabs__content) {
      display: none;
    }
  }

  // 🆕 拖拽幽灵样式
  .drag-ghost {
    opacity: 0.5;
    background-color: #e0e0e0;
    border: 1px dashed #ccc;
    transform: rotate(5deg);
  }

  // 🆕 自定义右键菜单样式（续）
  .custom-context-menu {
    position: fixed;
    background: var(--card-bg); // ✅ 替换 #fff
    border: 1px solid var(--hover-bg);
    color: var(--color-text);
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 4px 0;
    min-width: 140px;
    animation: menu-appear 0.15s ease-out;

    .context-menu-item {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      cursor: pointer;
      transition: background-color 0.2s;
      font-size: 14px;
      color: #606266;

      &:hover {
        background-color: var(--hover-bg);
        color: var(--color-primary);
      }

      .el-icon {
        margin-right: 8px;
        font-size: 14px;
        width: 14px;
        height: 14px;
      }

      span {
        white-space: nowrap;
      }
    }

    .context-menu-divider {
      height: 1px;
      background-color: #e4e7ed;
      margin: 4px 0;
    }
  }

  @keyframes menu-appear {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
}

// 🆕 全局样式，确保右键菜单在最上层
:global(.custom-context-menu) {
  z-index: 9999 !important;
}
</style>
