import loadable from '@loadable/component';
import { RouteConfig } from 'react-router-config';
import SignIn from '../pages/signin';
import Container from '../layouts/Container';
import ContainerCls from '../layouts/ContainerCls';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const routesConfig: RouteConfig[] = [
  {
    path: '/sign',
    exact: true,
    component: SignIn,
  },
  {
    path: '/',
    component: ContainerCls,
    routes: [
      {
        path: '/',
        exact: true,
        name: '대시보드',
        component: loadable(() => import('../pages/dashboard')),
        icon: UploadOutlined,
      },
      {
        path: '/family',
        exact: true,
        name: '가문원 관리',
        component: loadable(() => import('../pages/family')),
        icon: UserOutlined,
      },
      {
        path: '/soldier',
        exact: true,
        name: '병종 정보 관리',
        component: loadable(() => import('../pages/soldier')),
        icon: VideoCameraOutlined,
      },
    ],
  },
];

export default routesConfig;
