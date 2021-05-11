import loadable from '@loadable/component';
import { RouteConfig } from 'react-router-config';
import SignIn from '../pages/signin';
import Container from '../layouts/Container';

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
        component: loadable(() => import('../pages/dashboard')),
      },
      {
        path: '/family',
        exact: true,
        component: loadable(() => import('../pages/family')),
      },
      {
        path: '/soldier',
        exact: true,
        component: loadable(() => import('../pages/soldier')),
      },
    ],
  },
];

export default routesConfig;
