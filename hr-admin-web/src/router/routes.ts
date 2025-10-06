// src/router/routes.ts

import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Login from '@/views/login/index.vue'
import Dashboard from '@/views/dashboard/index.vue'
import Employee from '@/views/employee/index.vue'
import Attendance from '@/views/attendance/index.vue'
import Salary from '@/views/salary/index.vue'
import Recruitment from '@/views/recruitment/index.vue'
import System from '@/views/system/index.vue'
// 所有静态路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: '仪表盘', icon: 'ep:house' },
      },
      {
        path: 'employee',
        name: 'Employee',
        component: Employee,
        meta: { title: '员工管理', icon: 'ep:user' },
      },
      {
        path: 'attendance',
        name: 'Attendance',
        component: Attendance,
        meta: { title: '考勤管理', icon: 'ep:clock' },
      },
      {
        path: 'salary',
        name: 'Salary',
        component: Salary,
        meta: { title: '薪资管理', icon: 'ep:money' },
      },
      {
        path: 'recruitment',
        name: 'Recruitment',
        component: Recruitment,
        meta: { title: '招聘管理', icon: 'ep:briefcase' },
      },
      {
        path: 'system',
        name: 'System',
        component: System,
        meta: { title: '系统设置', icon: 'ep:setting' },
      },
    ],
  },
]

export default routes
