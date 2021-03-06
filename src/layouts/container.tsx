import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes, RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import 'antd/dist/antd.css';
import './container.css';
import * as AntdIcons from '@ant-design/icons';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, message } from 'antd';

const { Header, Sider, Content } = Layout;

import { RoleConst } from '@/common/constant';
import store from '@/store_mobx/index';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store_redux/reducer';
import { tokenRefresh } from '@/store_redux/auth/action';
import { getCodeList } from '@/store_redux/code/action';

const allIcons: {
  [key: string]: any;
} = AntdIcons;

const CustomIcon = (type: string) => {
  const AntIcon = allIcons[type];
  return <AntIcon />;
};

const buildMenus = (role: string, routes?: RouteConfig[]) => {
  const menus: JSX.Element[] = [];
  routes?.forEach((value, index) => {
    // roles.indexOf(req.decodedUser.role)
    const menuRoles = value.roles;
    if (menuRoles.indexOf(RoleConst.ALL) > -1 || menuRoles.indexOf(role) > -1) {
      menus.push(
        <Menu.Item key={`${value.path}`} icon={<value.icon />}>
          {value.name}
          <Link to={`${value.path}`} />
        </Menu.Item>,
      );
    }
  });
  return menus;
};

// 함수형 컴포넌트로 만들 때
const Container: React.FC<RouteConfigComponentProps> = (props: RouteConfigComponentProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const defaultSelectedMenu = [props.location.pathname]; // default 값이니 set 하는 경우가 없으므로 const 변수로 한다.
  const { route } = props;
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // dispatch를 사용하기 위한 준비
  const dispatch = useDispatch();

  // store에 접근하여 state 가져오기
  const nameForCode = useSelector((state: RootState) => state.code.nameForCode);
  const { isAuth, name, role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log('토큰 리프레시가 필요합니다.');
    dispatch(getCodeList());
    if (!isAuth) {
      const token = localStorage.token;
      if (token) {
        dispatch(tokenRefresh());
      } else {
        message.error('로그인해주세요.').then();
        props.history.push('/sign');
      }
    }
  }, []);

  useEffect(() => {
    console.log('useEffect [isAuth] : ', isAuth);
    if (isAuth) {
      // if (role === RoleConst.ADMIN) {
      //   props.history.push('/admin');
      // } else {
      //   props.history.push('/');
      // }
      message.success('자동 로그인 완료.');
    }
  }, [isAuth]);

  return (
    <Layout>
      <Sider collapsed={collapsed}>
        <div className="side_logo">
          <span>
            [{nameForCode[role]}] {name}
          </span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={defaultSelectedMenu}>
          {buildMenus(role, route?.routes)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {collapsed ? <MenuUnfoldOutlined className="trigger" onClick={toggle} /> : <MenuFoldOutlined className="trigger" onClick={toggle} />}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {renderRoutes(route?.routes)}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Container;
