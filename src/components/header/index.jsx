import React, {Component} from "react";

import {Button,} from "antd";


import './index.less';


export default class Header extends Component {


  render() {
    const zhiri = '徐燕';
    const state = '点击打卡';
    return (
      <div className="site-layout-background">
        <p className={'search'}>今日值日：{zhiri}</p>
        <Button type={"primary"} className={'state-button'}>{state}</Button>
      </div>
    )
  }
}