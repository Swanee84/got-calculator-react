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
const { auth, code } = store;

const allIcons: {
  [key: string]: any;
} = AntdIcons;

const CustomIcon = (type: string) => {
  const AntIcon = allIcons[type];
  return <AntIcon />;
};

const buildMenus = (routes?: RouteConfig[]) => {
  const menus: JSX.Element[] = [];
  const userRole = auth.role;
  routes?.forEach((value, index) => {
    // roles.indexOf(req.decodedUser.role)
    const menuRoles = value.roles;
    if (menuRoles.indexOf(RoleConst.ALL) > -1 || menuRoles.indexOf(userRole) > -1) {
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
  const [userTitle, setUserTitle] = useState<string>('Unsigned');
  const { route } = props;
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const tokenRefresh = async (token: string) => {
    console.log('useEffect() saved jwt >> ', token);
    const result = await auth.tokenRefresh(token);
    if (result) {
      message.success('자동 로그인 완료.');
      setUserTitle(auth.userTitle);
    } else {
      message.error('로그인해주세요.');
      props.history.push('/sign');
    }
  };

  useEffect(() => {
    if (!auth.isAuth) {
      console.log('토큰 리프레시가 필요합니다.');
      const token = localStorage.token;
      tokenRefresh(token).then();
      code.downloadCodeList().then();
    } else {
      message.success('자동 로그인 완료.');
    }
  }, []);

  return (
    <Layout>
      <Sider collapsed={collapsed}>
        <div className="side_logo">
          <span>{userTitle}</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={defaultSelectedMenu}>
          {buildMenus(route?.routes)}
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
