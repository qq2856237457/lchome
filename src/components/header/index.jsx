import React, {Component} from "react";
import {connect} from "react-redux"
import {Button, message,} from "antd";



import { reqClockStatus, reqClearStudent} from "../../api";
import {receiveUser} from "../../redux/actions";
import {debounce} from "../../utils/debounce";



import './index.less';
import {clears} from '../../utils/clearers/clear'


class Header extends Component {
  state = {
    clear: '',
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
      receiveUser({user})
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
    this.getClear();
  }

  render() {
    const user = this.props.user;
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
  {receiveUser}
)(Header)