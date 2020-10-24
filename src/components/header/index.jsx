import React, {Component} from "react";
import {connect} from "react-redux"
import {Button,} from "antd";

import {changeState, getUser} from "../../redux/actions";
import {reqClearStudent} from "../../api";

import './index.less';


class Header extends Component {
  state = {
    clear: '罗青云'
  };
  click = (username) => {

    this.props.changeState(username)
  };

  getClear = async () => {
    const result = await reqClearStudent();
    const res = res.data;
    if (res.status === 1) {
      this.setState({clear:res.data})
    }
  };

  componentWillUnmount() {

    // this.props.getUser(this.props.user.number);
  }

  render() {
    const user = this.props.user;
    const {clear} = this.state;
    const {state, number} = user;
    return (
      <div className="site-layout-background">
        <p className={'clear'}>今日值日：{clear}</p>
        {
          state == 1 ?
            <Button type={"primary"} danger className={'state-button'}
                    onClick={() => this.click(number)}>{'结束打卡'}
            </Button> :
            <Button type={"primary"} className={'state-button'}
                    onClick={() => this.click(number)}>{'开始打卡'}
            </Button>
        }
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {changeState, getUser}
)(Header)