import React, {Component} from "react";
import {Button, Form, Input, Modal} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';

export default class LoginModal extends Component {
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const {visible} = this.props;
    return (
      <Modal
        title={<h2 className='test'>用户登录</h2>}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
        closable={false}
        keyboard={true}
        destroyOnClose={true}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{remember: true}}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {required: true, whitespace: true, message: '请输入用户名'},
              {min: 4, message: '用户名至少要有4位'},
              {max: 12, message: '用户名最多不超过12位'},
              {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
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
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )

  }
}
