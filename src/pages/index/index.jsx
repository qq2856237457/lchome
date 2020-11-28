import React, {Component} from "react";
import {Button, message, Form, Input, Modal, Card} from "antd"
import {connect} from "react-redux";
import {Redirect} from "react-router";

import {logout} from "../../redux/actions";
import {reqPush, reqAdd, reqReset, reqAddMsg} from "../../api";
import {getToday} from "../../utils/dateUtils";
import './index.less'


const {confirm} = Modal;
const {TextArea} = Input;

class Index extends Component {
  push = async (e) => {
    const date = getToday(Date.now());
    const {year, month, day} = date;
    if (e === 'thisWeek') {
      const result = await reqPush(day, month, year, 0);
      const res = result.data;
      if (res.status === 1) {
        message.success('更新成功！')
      } else {
        message.error(res.msg);
      }
    } else if (e === 'lastWeek') {
      const result = await reqPush(day, month, year, -1);
      const res = result.data;
      if (res.status === 1) {
        message.success('更新成功！')
      } else {
        message.error(res.msg);
      }
    } else {
      message.error('权限错误！')
    }
  };

  reset = async () => {
    const result = await reqReset();
    const res = result.data;
    if (res.status === 1) {
      message.success(res.msg);
    } else {
      message.error(res.msg)
    }

  };


  // 打卡时间管理
  finish = async (value) => {
    const {name, time} = value;
    const result = await reqAdd(name, time);
    const res = result.data;
    if (res.status === 1) {
      message.success('更新成功！')
    } else {
      message.error(res.msg);
    }
  };


  //添加头条
  msgFinish = async (value) => {
    const{title,context}=value;
    const result=await reqAddMsg(title,context);
    const res=result.data;
    if (res.status===1){
      message.success('添加成功')
    }else{
      message.error(res.msg);
    }
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
    if (!user || !user.id) {
      return <Redirect to='/'/>
    }
    const extra = (<Button type={'primary'} onClick={this.logout}>退出管理员登录</Button>);
    return (
      <Card className={'center'} title={'管理员界面'} extra={extra}>
        <div className={'top'}>
          <Card title={'push打卡数据'} className={'push'}>
          <Button className={'push-button'} onClick={() => this.push('thisWeek')}>push本周</Button>
          <Button className={'push-button'} onClick={() => this.push('lastWeek')}>push上周</Button>
          <Button className={'push-button'} onClick={() => this.reset()}>reset</Button>
        </Card>
          <Card title={'打卡时间管理'} className={'time'}>
            <Form onFinish={this.finish}>
              <Form.Item
                name="name"
                rules={[
                  {required: true, whitespace: true, message: '请输入当事人的名字'},
                ]}
              >
                <Input placeholder="名字"/>
              </Form.Item>
              <Form.Item
                name={'time'}
                rules={[
                  {required: true, whitespace: true, message: '请输入时间'},
                ]}
              >
                <Input type={"number"}></Input>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className={'form-button'}>确定</Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div className={'bottom'}>
          <Card title={'添加头条'} className={'addMag'}>
            <Form onFinish={this.msgFinish}>
              <Form.Item
                name={'title'}
              >
                <Input placeholder={'请输入文章标题'}></Input>
              </Form.Item>
              <Form.Item name={'context'}>
                <TextArea rows={4} placeholder={'请输入文章内容'}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className={'form-button'}>提交文章</Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Card>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {logout}
)(Index)

