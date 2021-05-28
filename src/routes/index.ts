import loadable from '@loadable/component';
import { RouteConfig } from 'react-router-config';
import SignIn from '@/pages/signin';
import Container from '@/layouts/container';
import { DashboardOutlined, IdcardOutlined, UserOutlined } from '@ant-design/icons';
import { RoleConst } from '@/common/constant';

const routesConfig: RouteConfig[] = [
  {
    path: '/sign',
    exact: true,
    component: SignIn,
  },
  {
    path: '/',
    component: Container,
    routes: [
      {
        path: '/',
        exact: true,
        name: '대시보드',
        component: loadable(() => import('@/pages/dashboard')),
        icon: DashboardOutlined,
        roles: RoleConst.userRoles,
      },
      {
        path: '/family',
        exact: true,
        name: '가문원 관리',
        component: loadable(() => import('@/pages/family')),
        icon: UserOutlined,
        roles: [RoleConst.DUKE],
      },
      {
        path: '/soldier',
        exact: true,
        name: '병종 정보 관리',
        component: loadable(() => import('@/pages/soldier')),
        icon: IdcardOutlined,
        roles: RoleConst.userRoles,
      },
      {
        path: '/admin',
        exact: true,
        name: '관리자',
        component: loadable(() => import('@/pages/admin')),
        icon: DashboardOutlined,
        roles: [RoleConst.ADMIN],
      },
      {
        path: '/code',
        exact: true,
        name: '코드관리',
        component: loadable(() => import('@/pages/code')),
        icon: DashboardOutlined,
        roles: [RoleConst.ADMIN],
      },
    ],
  },
];

export default routesConfig;
