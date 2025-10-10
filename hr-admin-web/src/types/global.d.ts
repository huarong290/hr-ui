// 🌍 全局类型声明文件
// 放置在 src/types/global.d.ts 中

// ✅ 支持 .vue 文件类型导入
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// ✅ 扩展 window 对象（例如注入全局方法或属性）
interface Window {
  $message?: (msg: string) => void
  $confirm?: (msg: string, title?: string) => Promise<boolean>
  $loading?: {
    show: () => void
    hide: () => void
  }
}

// ✅ 支持环境变量类型（如果使用 Vite）
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
  // 可继续添加其他环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// ✅ 支持自动导入的 Vue API（如果未启用类型自动注入）
declare global {
  const ref: (typeof import('vue'))['ref']
  const reactive: (typeof import('vue'))['reactive']
  const computed: (typeof import('vue'))['computed']
  const defineComponent: (typeof import('vue'))['defineComponent']
  const useRouter: (typeof import('vue-router'))['useRouter']
  const useRoute: (typeof import('vue-router'))['useRoute']
  const defineStore: (typeof import('pinia'))['defineStore']
  // 可根据需要继续添加
}
