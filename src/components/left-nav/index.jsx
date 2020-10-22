import React, {Component} from "react";
import {Avatar, Menu, Layout,Modal} from "antd";
import {Link} from "react-router-dom";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';

import './index.less';

const {SubMenu} = Menu;
const {Sider} = Layout;
const {confirm} = Modal;

export default class LeftNav extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({collapsed});
  };
  getPath = () => {
    console.log(this.props);
  };

  logout = () => {
    confirm({
      title: '你要退出吗?',
      onOk: () => {
        // 清除数据，
        console.log('退出');
      }
    });
  };

  componentWillMount() {
    this.getPath();
  }

  render() {
    const name = '文磊';
    const {collapsed} = this.state;

    return (
      <Sider
        collapsible
        onCollapse={this.onCollapse}
        collapsed={this.state.collapsed}
        style={{backgroundColor: '#FFF'}}
      >
        <div className={'head-logo'}>
          <Avatar
            style={{color: '#fde3cf', backgroundColor: '#f56a00'}}
            className={'avatar'}
            size={80}
            icon={<UserOutlined/>}
          />
          <div className={'signature'} style={{display: collapsed ? "none" : ''}}>
            {name}
          </div>
        </div>
        <Menu theme="light" defaultSelectedKeys={['/home']} mode="inline">
          <Menu.Item key='/home' icon={<DesktopOutlined/>}>
            <Link to={'/home'}>首页</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined/>} title="打卡详情">
            <Menu.Item key='/second' icon={<UserOutlined/>}>
              <Link to={'/second'}>2019级打卡详情</Link>
            </Menu.Item>
            <Menu.Item key='/first' icon={<TeamOutlined/>}>
              <Link to={'/first'}>2020级打卡详情</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='/chars' icon={<PieChartOutlined/>}>
            <Link to={'/chars'}>打卡周报</Link>
          </Menu.Item>
          <Menu.Item key='/info' icon={<FileOutlined/>}>
            <Link to={'/info'}>我的资料</Link>
          </Menu.Item>
          <Menu.Item key='/logout' icon={<LogoutOutlined />}>
            <Link onClick={this.logout}>退出登录</Link>
          </Menu.Item>
        </Menu>
      </Sider>

    )
  }

}