src/
├── api/                          # 🔗 API接口层
│   ├── modules/                  # 📦 模块化API（按业务拆分）
│   │   ├── system.ts            #   系统管理API
│   │   ├── employee.ts          #   员工管理API
│   │   └── attendance.ts        #   考勤管理API
│   ├── index.ts                 # 🔌 API统一导出入口
│   └── request.ts               # 🚀 Axios请求配置和拦截器
│
├── components/                   # 🧩 组件层
│   ├── common/                  # 🔧 基础通用组件
│   │   ├── Icon/               #    图标组件
│   │   ├── Button/             #    按钮组件
│   │   └── Loading/            #    加载状态组件
│   ├── layout/                  # 🏗️ 布局组件
│   │   ├── AppLayout.vue       #    应用主布局
│   │   ├── Sidebar.vue         #    侧边栏导航
│   │   ├── Header.vue          #    顶部导航栏
│   │   └── Breadcrumb.vue      #    面包屑导航
│   ├── business/                # 💼 业务组件（按模块划分）
│   │   ├── Employee/           #    员工管理相关组件
│   │   ├── Attendance/         #    考勤管理相关组件
│   │   └── System/             #    系统管理相关组件
│   └── Reusable/                # ♻️ 高度可复用组件
│       ├── Table/               #    📊 表格相关
│       │   ├── PureTable.vue   #      增强型表格组件
│       │   ├── TableSearch.vue #      表格搜索组件
│       │   └── TablePagination.vue # 表格分页组件
│       ├── Form/                #    📝 表单相关
│       │   ├── DynamicForm.vue #      动态表单组件
│       │   └── FormDialog.vue  #      表单弹窗组件
│       ├── Search/              #    🔍 搜索组件
│       ├── Chart/               #    📈 图表组件
│       └── Business/            #    🏢 业务通用
│           ├── UserAvatar.vue   #      用户头像组件
│           └── DepartmentSelect.vue # 部门选择器
│
├── composables/                  # ⚡ 组合式函数（Vue 3 Composition API）
│   ├── core/                    # 🎯 核心Hooks
│   │   ├── useTable.ts         #    表格数据管理Hook
│   │   ├── useForm.ts          #    表单管理Hook
│   │   └── usePagination.ts    #    分页逻辑Hook
│   ├── business/                # 💼 业务Hooks
│   │   ├── useEmployee.ts      #    员工管理业务逻辑
│   │   ├── useAttendance.ts    #    考勤管理业务逻辑
│   │   └── useSystem.ts        #    系统管理业务逻辑
│   └── index.ts                 # 🔌 Hooks统一导出
│
├── views/                        # 🖼️ 页面视图层
│   ├── login/                   # 🔐 登录页面
│   │   └── index.vue           #    登录页主文件
│   ├── dashboard/               # 📊 仪表盘页面
│   │   └── index.vue           #    数据概览和统计
│   ├── modules/                 # 📁 业务模块页面
│   │   ├── employee/           #    👥 员工管理模块
│   │   │   └── index.vue       #      员工列表和操作
│   │   ├── attendance/         #    ⏰ 考勤管理模块
│   │   │   └── index.vue       #      考勤记录和统计
│   │   ├── salary/             #    💰 薪资管理模块
│   │   │   └── index.vue       #      薪资计算和发放
│   │   └── recruitment/        #    📋 招聘管理模块
│   │       └── index.vue       #      招聘流程管理
│   └── system/                  # ⚙️ 系统管理模块
│       ├── user/               #    👤 用户管理
│       │   ├── list.vue        #      用户列表页面
│       │   └── detail.vue      #      用户详情页面
│       └── role/               #    🛡️ 角色权限管理
│           ├── list.vue        #      角色列表页面
│           └── assign.vue      #      权限分配页面
│
├── router/                       # 🧭 路由配置层
│   ├── index.ts                 # 🚪 路由入口文件
│   ├── modules/                 # 📦 模块化路由配置
│   │   ├── system.ts           #    系统管理路由
│   │   ├── dashboard.ts        #    仪表盘路由
│   │   ├── employee.ts         #    员工管理路由
│   │   ├── attendance.ts       #    考勤管理路由
│   │   ├── salary.ts           #    薪资管理路由
│   │   └── recruitment.ts      #    招聘管理路由
│   └── routes.ts                # 🗺️ 路由汇总配置
│
├── stores/                       # 🗃️ 状态管理层（Pinia）
│   ├── modules/                 # 📦 模块化Store
│   │   ├── user.ts             #    👤 用户状态管理
│   │   ├── app.ts              #    🖥️ 应用全局状态
│   │   └── tabs.ts             #    📑 标签页状态管理
│   └── index.ts                 # 🔌 Store统一导出
│
├── types/                        # 📐 TypeScript类型定义
│   ├── api/                     # 🌐 API接口类型
│   │   ├── system.ts           #    系统管理API类型
│   │   ├── employee.ts         #    员工管理API类型
│   │   └── common.ts           #    通用API类型
│   ├── store/                   # 🗃️ Store状态类型
│   │   ├── user.ts             #    用户状态类型
│   │   ├── app.ts              #    应用状态类型
│   │   └── tabs.ts             #    标签页状态类型
│   ├── components/              # 🧩 组件Props类型
│   └── global.d.ts              # 🌍 全局类型声明
│
├── utils/                        # 🛠️ 工具函数库
│   ├── auth.ts                  # 🔐 权限验证工具
│   ├── storage.ts               # 💾 本地存储工具
│   ├── request.ts               # 📡 请求工具函数
│   ├── validate.ts              # ✅ 表单验证工具
│   └── index.ts                 # 🔌 工具函数统一导出
│
├── styles/                       # 🎨 样式文件
│   ├── variables.scss           # 🎯 SCSS变量定义
│   ├── mixins.scss              # 🔧 SCSS混入函数
│   ├── common.scss              # 📝 通用样式
│   └── index.scss               # 🚀 样式主入口文件
│
└── main.ts                      # ⚡ 应用启动入口文件

# 🏗️ 架构说明：
# 
# 🔗 API层：统一管理所有接口请求，模块化分类
# 🧩 组件层：四级组件分层，从基础到业务，提高复用性
# ⚡ Composables：Vue 3组合式API，逻辑复用和业务分离
# 🖼️ 视图层：页面组件，按业务模块组织
# 🧭 路由层：模块化配置，支持权限控制和懒加载
# 🗃️ 状态层：Pinia状态管理，模块化store设计
# 📐 类型层：完整的TypeScript类型定义，提高代码质量
# 🛠️ 工具层：通用工具函数，支持各种业务场景
# 🎨 样式层：统一的样式规范和变量管理
# ⚡ 入口文件：应用启动和全局配置
#
# 📊 数据流：API → Store → Composables → Components → Views
# 🔐 权限控制：路由守卫 + 组件权限 + API拦截
# 🎯 开发规范：基于Pure Admin最佳实践，支持大型项目开发

核心特点：
模块化设计 - 每个业务域独立封装
类型安全 - 完整的TypeScript支持
组件复用 - 四级组件分层体系
状态管理 - Pinia模块化状态
工程化 - 符合Pure Admin最佳实践

新增页面：views → router → api → types
新增组件：components → types
业务逻辑：composables → stores