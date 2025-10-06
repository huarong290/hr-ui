// src/router/routes.ts

import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Login from '@/views/login/index.vue'
import Dashboard from '@/views/dashboard/index.vue'
import Employee from '@/views/employee/index.vue'
import Attendance from '@/views/attendance/index.vue'
import Salary from '@/views/salary/index.vue'
import Recruitment from '@/views/recruitment/index.vue'
import ModuleLayout from '@/components/module/ModuleLayout.vue'
import UserList from '@/views/system/user/list.vue'
import UserDetail from '@/views/system/user/detail.vue'
import RoleList from '@/views/system/role/list.vue'
import RoleAssign from '@/views/system/role/assign.vue'

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
        component: ModuleLayout,
        props: { title: '系统设置' },
        meta: { title: '系统设置', icon: 'ep:setting' },
        children: [
          {
            path: 'user',
            component: ModuleLayout,
            props: { title: '用户管理' },
            meta: { title: '用户管理', icon: 'ep:user-filled' }, // ✅ 添加 meta
            children: [
              {
                path: 'list',
                name: 'UserList',
                component: UserList,
                meta: { title: '用户列表' },
              },
              {
                path: 'detail/:id',
                name: 'UserDetail',
                component: UserDetail,
                meta: { title: '用户详情', hidden: true },
              },
            ],
          },
          {
            path: 'role',
            component: ModuleLayout,
            props: { title: '角色管理' },
            meta: { title: '角色管理', icon: 'ep:avatar' }, // ✅ 添加 meta
            children: [
              {
                path: 'list',
                name: 'RoleList',
                component: RoleList,
                meta: { title: '角色列表' },
              },
              {
                path: 'assign',
                name: 'RoleAssign',
                component: RoleAssign,
                meta: { title: '权限分配' },
              },
            ],
          },
        ],
      },
    ],
  },
]

export default routes
