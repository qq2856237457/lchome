import React, {Component} from "react";
import {Avatar, Menu, Layout, Modal, message} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
  DesktopOutlined,
  BarChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  OrderedListOutlined
} from '@ant-design/icons';

import './index.less';
import {logout} from "../../redux/actions";
import img from '../../static/head.jpg'
import {reqInfo} from "../../api";

const {SubMenu} = Menu;
const {Sider} = Layout;
const {confirm} = Modal;

class LeftNav extends Component {
  state = {
    collapsed: false,
    user:{}
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

  getUser = async (username) => {
    if (!username) {
      return {}
    }
    const result = await reqInfo(username);
    const res = result.data;
    if (res.status === 1) {
      const user = res.data;
      this.setState({user})
    } else {
      message.error(res.msg);
    }
  };
componentDidMount() {
  this.getUser(this.props.user.number);
}

  render() {

    const {name} = this.state.user;
    const {collapsed} = this.state;
    let sum=parseFloat(this.state.user.sum);
    sum=sum.toFixed(2);

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
            <p>{name}</p>
            <p>本周：{sum}h</p>
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
          <Menu.Item key='/chars' icon={<BarChartOutlined/>}>
            <Link to={'/chars'}>打卡周报</Link>
          </Menu.Item>
          <Menu.Item key='/info' icon={<FileOutlined/>}>
            <Link to={'/info'}>本周日志</Link>
          </Menu.Item>
          <Menu.Item key='/article' icon={<OrderedListOutlined/>}>
            <Link to={'/article'}>乐程头条</Link>
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