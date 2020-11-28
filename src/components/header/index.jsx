import React, {Component} from "react";
import {connect} from "react-redux"
import {Button, message,} from "antd";



import {reqInfo, reqClockStatus, reqClearStudent} from "../../api";
import {debounce} from "../../utils/debounce";
import storageUtils from "../../utils/storageUtils";


import './index.less';
import {clears} from '../../utils/clearers/clear'


class Header extends Component {
  state = {
    clear: '',
    user: {},
  };



  changeState = async (username) => {

    if (!username) {
      return {}
    }
    const result = await reqClockStatus(username);
    const res = result.data;
    if (res.status === 1) {
      message.success('成功!');
      const user = res.data;
      this.setState({user})
    } else {
      this.getUser(this.props.user.number);
      message.error(res.msg);
    }
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


  click = () => {
    this.changeState(this.props.user.number);
  };

  getClear = async () => {
    const result = await reqClearStudent();
    const res = result.data;
    let str = res.data;
    this.setState({
      clear: clears[str]
    })
  };

  componentDidMount() {
    this.getUser(this.props.user.number);
    this.getClear();
  }

  render() {
    const user = this.state.user;
    const {clear} = this.state;
    const {state} = user;
    const debounceClick=debounce(this.click,500);
    return (
      <div className="site-layout-background">
        <p className={'clear'}>本周值日：{clear}</p>
        {
          state == 1 ?
            <Button type={"primary"} danger className={'state-button'}
                    onClick={debounceClick}>{'结束打卡'}
            </Button> :
            <Button type={"primary"} className={'state-button'}
                    onClick={debounceClick}>{'开始打卡'}
            </Button>
        }
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {}
)(Header)