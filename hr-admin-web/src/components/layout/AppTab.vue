<template>
  <div class="app-tab">
    <el-tabs
      v-model="activeTab"
      type="card"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
      closable
    >
      <template #default>
        <draggable
          v-model="tabList"
          item-key="path"
          tag="div"
          :animation="200"
          :ghost-class="'drag-ghost'"
          :group="{ name: 'tabs' }"
        >
          <template #item="{ element }">
            <component
              :is="ElTabPane"
              :label="element.title"
              :name="element.path"
              :key="element.path"
              @contextmenu.prevent="openContextMenu($event, element.path)"
            />
          </template>
        </draggable>
      </template>
    </el-tabs>

    <!-- 右键菜单 -->
    <el-dropdown
      v-model:visible="contextMenuVisible"
      :style="{ position: 'fixed', left: contextMenuX + 'px', top: contextMenuY + 'px' }"
      @command="handleMenuCommand"
    >
      <span style="display: none">触发器</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="closeCurrent">关闭当前</el-dropdown-item>
          <el-dropdown-item command="closeOthers">关闭其他</el-dropdown-item>
          <el-dropdown-item command="closeAll">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useTabStore } from '@/stores/tab/tabStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import draggable from 'vuedraggable'
import { ElTabPane } from 'element-plus'

const router = useRouter()
const tabStore = useTabStore()
const { tabList, activeTab } = storeToRefs(tabStore)

function handleTabClick(pane: { paneName: string | number }) {
  router.push(String(pane.paneName))
}

function handleTabRemove(name: string | number) {
  tabStore.removeTab(String(name))
}

const contextMenuVisible = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const contextTabPath = ref('')

function openContextMenu(e: MouseEvent, path: string) {
  contextMenuX.value = e.clientX
  contextMenuY.value = e.clientY
  contextTabPath.value = path
  contextMenuVisible.value = true

  document.addEventListener(
    'click',
    () => {
      contextMenuVisible.value = false
    },
    { once: true },
  )
}

function handleMenuCommand(command: string) {
  if (!contextTabPath.value) return

  if (command === 'closeCurrent') {
    tabStore.removeTab(contextTabPath.value)
  } else if (command === 'closeOthers') {
    tabStore.closeOthers(contextTabPath.value)
  } else if (command === 'closeAll') {
    tabStore.closeAll()
    router.push('/dashboard')
  }
}
</script>

<style scoped lang="scss">
.app-tab {
  background-color: #fff;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
  .drag-ghost {
    opacity: 0.5;
    background-color: #e0e0e0;
    border: 1px dashed #ccc;
  }
}
</style>
