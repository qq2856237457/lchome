import React, {Component} from "react";
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Form, Input, Button, Modal, Radio, message,} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import md5 from 'md5';

import {reqLogin, reqRegister,reqInfo} from "../../api";
import {loginControl, registerControl, login} from "../../redux/actions";
import './login.less'


class Login extends Component {

  showLoginModal = (e) => {

    if (e == 'login')
      this.props.loginControl(true);
    else if (e == 'register') {
      this.props.registerControl(true);
    }
  };


  handleLoginCancel = e => {
    if (e == 'login')
      this.props.loginControl(false);
    else if (e == 'register')
      this.props.registerControl(false);
  };


  loginFinish = (value) => {
    if (value) {
      let password = value.password;
      let username = value.username;
      password = md5(password);
      this.props.login(username, password)
    } else {
      console.log('登录校验失败')
    }
  };
  test = async () => {
    const username = "123456";
    const result=reqInfo(username);
    console.log(result)
  }
  registerFinish = async (value) => {
    this.props.registerControl(false);
    const {username, name, group} = value;
    let password = value.password;
    password = md5(password);
    const result = await reqRegister(username, password, name, group);
    const res = result.data;
    if (res.status === 1) {
      message.success("注册成功！");
    } else {
      message.error(res.message);
    }
  };

  render() {
    const loginFlag = this.props.loginFlag;
    const registerFlag = this.props.registerFlag;
    const user = this.props.user;
    if (user&&user.id) {
      return <Redirect to ='/home'/>
    }
    return (
      <div className="container">
        <Modal
          title={<h2 className='test'>用户登录</h2>}
          visible={loginFlag}
          onCancel={() => this.handleLoginCancel('login')}
          footer={null}
          closable={false}
          keyboard={true}
          destroyOnClose={true}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{remember: true}}
            onFinish={this.loginFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {required: true, whitespace: true, message: '请输入账号'},
                {min: 4, message: '账号至少要有4位'},
                {max: 12, message: '账号最多不超过12位'},
                {pattern: /^[0-9]+$/, message: '账号必须由数字组成'}
              ]}
            >
              <Input
                prefix={<UserOutlined
                  className="site-form-item-icon"/>}
                placeholder="账号"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {required: true, whitespace: true, message: '请输入密码'},
                {min: 4, message: '密码至少要有4位'},
                {max: 12, message: '密码最多不超过12位'},
                {pattern: /^[a-zA-Z0-9.]+$/, message: '密码必须是英文、数字或.组成'}
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon"/>}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit"
                      className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title={<h2 className='test'>用户注册</h2>}
          visible={registerFlag}
          onCancel={() => this.handleLoginCancel('register')}
          footer={null}
          closable={false}
          keyboard={true}
          destroyOnClose={true}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{remember: true}}
            onFinish={this.registerFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {required: true, whitespace: true, message: '请输入账号'},
                {min: 4, message: '账号至少要有4位'},
                {max: 12, message: '账号最多不超过12位'},
                {pattern: /^[0-9]+$/, message: '账号必须由数字组成'}
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="账号"/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {required: true, whitespace: true, message: '请输入密码'},
                {min: 4, message: '密码至少要有4位'},
                {max: 12, message: '密码最多不超过12位'},
                {pattern: /^[a-zA-Z0-9.]+$/, message: '密码必须是英文、数字或.组成'}
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon"/>}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[
                {required: true, whitespace: true, message: '请输入姓名'},
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="姓名"/>
            </Form.Item>
            <Form.Item
              name={'group'}
            >
              <Radio.Group>
                <Radio value={1} name={'group'}>2020级</Radio>
                <Radio value={2} name={'group'}>2019级</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="yaoqingma"
              rules={[
                {required: true, whitespace: true, message: '请输入邀请码'},
                {pattern: /^qwerty$/, message: '邀请码不正确'}
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="邀请码"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit"
                      className="login-form-button">
                注册
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <ul>
          <li className={'top-bar'}>Introduce</li>
          <li className={'top-bar'}>Contact</li>
          <li className={'top-bar'}>Activity</li>
          <li className={'top-right'} onClick={() => this.showLoginModal('register')}>Register</li>
          <li className={'top-right'} onClick={() => this.showLoginModal("login")}>Login</li>
        </ul>
        <div className='content'>
          <p>乐程软件工作室</p>
          <p>Lecheng software studio</p>
          <p>Login page of online clock in system of
            Lecheng software studio, School of computer science,
            Southwest Petroleum University.</p>
          <button className="black" onClick={this.test}>Join us</button>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    loginFlag: state.loginComponentControl,
    registerFlag: state.registerComponentControl,
    user: state.user
  }),
  {loginControl, registerControl, login}
)(withRouter(Login))