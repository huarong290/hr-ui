src/
├── api/                 # API接口
│   ├── modules/        # 模块API
│   ├── index.ts        # API统一导出
│   └── request.ts      # Axios配置
├── components/         # 公共组件
│   ├── common/        # 通用组件
│   ├── layout/
│   │   ├── AppLayout.vue          # 主布局组件
│   │   ├── Sidebar.vue            # 侧边栏组件
│   │   ├── Header.vue             # 顶部导航组件
│   │   └── Breadcrumb.vue         # 面包屑导航
│   └── module/
│       └── ModuleLayout.vue       # 模块布局组件

├── composables/        # 组合式函数
├── views/
│   ├── layout/
│   │   └── index.vue              # 布局入口
│   ├── login/
│   │   └── index.vue              # 登录页面
│   ├── dashboard/
│   │   └── index.vue              # 仪表盘
│   ├── employee/
│   │   └── index.vue              # 员工管理
│   ├── attendance/
│   │   └── index.vue              # 考勤管理
│   ├── salary/
│   │   └── index.vue              # 薪资管理
│   ├── recruitment/
│   │   └── index.vue              # 招聘管理
│   └── system/
│       ├── user/
│       │   ├── list.vue           # 用户列表
│       │   └── detail.vue         # 用户详情
│       └── role/
│           ├── list.vue           # 角色列表
│           └── assign.vue         # 权限分配
├── router/
│   └── routes.ts                  # 路由配置
├── stores/             # 状态管理
├── types/              # TypeScript类型
├── utils/              # 工具函数
└── styles/             # 样式文件
└── main.ts                        # 应用入口