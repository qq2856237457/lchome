import React, {Component} from "react";
import {connect} from "react-redux"
import {Button,} from "antd";

import {changeState} from "../../redux/actions";

import './index.less';


class Header extends Component {
  click = (username) => {
    changeState(username)
  };

  render() {
    const user = this.props.user;
    const zhiri = '徐燕';
    const {state, username} = user;
    // if (state === 1) {
    //   // 正在打卡，显示的应该是结束打卡
    //   const end = '结束打卡';
    // } else if (state === 0) {
    //   // 没有打卡，显示的应该是开始打卡
    //   const start = '开始打卡';
    // }
    return (
      <div className="site-layout-background">
        <p className={'search'}>今日值日：{zhiri}</p>
        {
          state == 1 ?
            <Button type={"primary"} danger className={'state-button'}
                    onClick={() => this.click(username)}>{'结束打卡'}
            </Button> :
            <Button type={"primary"} className={'state-button'}
                    onClick={() => this.click(username)}>{'开始打卡'}
            </Button>
        }
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {changeState}
)(Header)