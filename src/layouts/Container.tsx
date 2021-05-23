import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes, RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import 'antd/dist/antd.css';
import './container.css';
import { Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const buildMenus = (routes?: RouteConfig[]) => {
  const menus: JSX.Element[] = [];
  routes?.forEach((value, index) => {
    menus.push(
      <Menu.Item key={`${value.path}`} icon={<UserOutlined />}>
        {value.name}
        <Link to={`${value.path}`} />
      </Menu.Item>,
    );
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

  useEffect(() => {
    console.log('route >>', route);
    console.log('props.location >> ', props.location);
  });

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="side_logo">
          <span>K9: [KPOp] BLESS</span> {/* 사용자 정보에서 가져오도록 변경 */}
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
