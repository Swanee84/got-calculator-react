import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes, RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import 'antd/dist/antd.css';
import './container.css';
import { Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const buildMenus = (routes?: RouteConfig[]) => {
  const menus: JSX.Element[] = [];
  routes?.forEach((value, index) => {
    menus.push(
      <Menu.Item key={`${value.path}`} icon={value.icon}>
        {value.name}
        <Link to={`${value.path}`} />
      </Menu.Item>,
    );
  });
  return menus;
};

// class 컴포넌트로 만들 때
class Container extends React.Component<RouteConfigComponentProps> {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const defaultSelectedMenu = [this.props.location.pathname];
    const { route } = this.props;
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="side_logo">
            <span>K7: [KPOp] BLESS</span>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={defaultSelectedMenu}>
            {buildMenus(route?.routes)}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {this.state.collapsed ? (
              <MenuUnfoldOutlined className="trigger" onClick={this.toggle} />
            ) : (
              <MenuFoldOutlined className="trigger" onClick={this.toggle} />
            )}
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
  }
}

export default Container;
