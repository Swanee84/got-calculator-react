import React from 'react';
import 'antd/dist/antd.css';
import './container.css';
import { Layout, Menu } from 'antd';
import { Route, Link } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;
import Dashboard from '../pages/dashboard';
import Solder from '../pages/soldier';
import Family from '../pages/family';

class Container extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <span>K7: [KPOp] BLESS</span>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              대시보드
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              가문원 관리
              <Link to="/family" />
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              병종 정보 관리
              <Link to="/soldier" />
            </Menu.Item>
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
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/family" component={Family} />
            <Route exact path="/soldier" component={Solder} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Container;
