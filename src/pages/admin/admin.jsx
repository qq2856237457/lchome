import React, {Component} from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import {
  Layout, message
} from 'antd';
import {connect} from "react-redux"
import 'moment/locale/zh-cn';

import {receiveUser} from "../../redux/actions";
import storageUtils from "../../utils/storageUtils";
import Header from "../../components/header";
import LeftNav from "../../components/left-nav";
import Chars from "../chars/chars";
import Second from "../secondTeam/second-team";
import First from "../firstTeam/first-team";
import NotFound from "../not-found/not-found";
import Home from "../home/home";
import Info from "../info/info";
import Article from "../comment";


import './admin.less';
import {reqInfo} from "../../api";

const {Content, Footer,} = Layout;

class Admin extends Component {

  getUser = async (username) => {
    if (!username) {
      return {}
    }
    const result = await reqInfo(username);
    const res = result.data;
    if (res.status === 1) {
      const user = res.data;
      receiveUser({user})
    } else {
      message.error(res.msg);
    }
  };

  componentWillMount() {
    const username = storageUtils.getUser().number;
    if (username) {
      this.getUser(username)
    }
  }

  render() {

    const user = this.props.user;
    if (!user || !user.id) {
      return <Redirect to="/login"/>
    } else {
      if (user.number === 1010) {
        return <Redirect to="/index"/>
      }
    }
    return (
      <Layout style={{minHeight: '100vh'}}>
        <LeftNav/>
        <Layout className="site-layout">
          <Header/>
          <Content style={{margin: '20px 16px', backgroundColor: "#fff", height: 350}}>
            <Switch>
              <Redirect exact from={'/'} to={'/home'}/>
              <Route path={'/home'} component={Home}/>
              <Route path={'/second'} component={Second}/>
              <Route path={'/first'} component={First}/>
              <Route path={'/chars'} component={Chars}/>
              <Route path={'/info'} component={Info}/>
              <Route path={'/article'} component={Article}/>
              <Route component={NotFound}/>
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            Copyright ©2010-2020 乐程软件工作室 &nbsp;&nbsp;
            {

              <a href="http://beian.miit.gov.cn" target={'_blank'}
                 style={{color: '#080909'}}
              >
                蜀ICP备2020032991号
              </a>
            }
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {receiveUser}
)(Admin)