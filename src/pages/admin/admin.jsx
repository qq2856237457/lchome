import React, {Component} from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import {
  Layout
} from 'antd';
import {connect} from "react-redux"
import 'moment/locale/zh-cn';


import Header from "../../components/header";
import LeftNav from "../../components/left-nav";
import Chars from "../chars/chars";
import Second from "../secondTeam/second-team";
import First from "../firstTeam/first-team";
import NotFound from "../not-found/not-found";
import Home from "../home/home";
import Info from "../info/info";


import './admin.less';

const {Content, Footer,} = Layout;

class Admin extends Component {

  render() {
    const user = this.props.user;
    if (!user || !user.id) {
      return <Redirect to="/login"/>
    }
    return (
      <Layout style={{minHeight: '100vh'}}>
        <LeftNav/>
        <Layout className="site-layout">
          <Header/>
          <Content style={{margin: '20px 16px', backgroundColor: "#fff",height: 350}} >
            <Switch>
              <Redirect exact from={'/'} to={'/home'}/>
              <Route path={'/home'} component={Home}/>
              <Route path={'/second'} component={Second}/>
              <Route path={'/first'} component={First}/>
              <Route path={'/chars'} component={Chars}/>
              <Route path={'/info'} component={Info}/>
              <Route component={NotFound}/>
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center'}}>Copyright ©2010-2020 乐程软件工作室</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {}
)(Admin)