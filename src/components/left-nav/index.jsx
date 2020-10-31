import React, {Component} from "react";
import {Avatar, Menu, Layout, Modal} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
  DesktopOutlined,
  BarChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';

import './index.less';
import {logout} from "../../redux/actions";
import img from  '../../static/head.jpg'

const {SubMenu} = Menu;
const {Sider} = Layout;
const {confirm} = Modal;

class LeftNav extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({collapsed});
  };


  logout = () => {
    confirm({
      title: '你要退出吗?',
      onOk: () => {
        // 清除数据，
        this.props.logout();
      }
    });
  };



  render() {
    const user = this.props.user;
    const {name} = user;
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
            src={img}
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
              <Link to={'/second'}>大二打卡详情</Link>
            </Menu.Item>
            <Menu.Item key='/first' icon={<TeamOutlined/>}>
              <Link to={'/first'}>大一打卡详情</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='/chars' icon={<BarChartOutlined />}>
            <Link to={'/chars'}>打卡周报</Link>
          </Menu.Item>
          <Menu.Item key='/info' icon={<FileOutlined/>}>
            <Link to={'/info'}>本周日志</Link>
          </Menu.Item>
          <Menu.Item key='/logout' icon={<LogoutOutlined/>}>
            <Link onClick={this.logout}>退出登录</Link>
          </Menu.Item>
        </Menu>
      </Sider>

    )
  }
}

export default connect(
  state => ({user: state.user}),
  {logout}
)(LeftNav)