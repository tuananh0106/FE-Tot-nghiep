import MainLayout from '@layout/MainLayout';
import { lazy } from 'react';

const UserRoutes = [
  {
    path: '/user/home',
    name: 'Đăng nhập',
    layout: MainLayout,
    component: lazy(() => import('./UserHome')),
    isPublic: true,
    exact: true,
  },
  {
    path: '/user/home/:mode/:id',
    name: 'Quản lý khách sạn - Tạo/Xem/Sửa',
    layout: MainLayout,
    component: lazy(() => import('./UserHomeView')),
    isPublic: true,
    exact: true,
  },
  {
    path: '/user/bookroom',
    name: 'Danh sách phòng đã đặt',
    layout: MainLayout,
    component: lazy(() => import('./BookHome')),
    isPublic: true,
    exact: true,
  },
  {
    path: '/user/bookroom/view/:id',
    name: 'Phòng đã đặt xem chi tiết',
    layout: MainLayout,
    component: lazy(() => import('./BookHomeView')),
    isPublic: true,
    exact: true,
  },
];
export default UserRoutes;
