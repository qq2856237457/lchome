import React, {Component} from "react";
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';


import './home.less'

export default class Home extends Component {
  render() {
    return (
      <div className={'home'}>
        <Timeline mode="alternate">
          <Timeline.Item>2010-10-09 乐程软件工作室正式成立</Timeline.Item>
          <Timeline.Item color="green">2017/2018蓝桥杯大赛国奖7名，省奖15名；全国软件专业人才设计与开发比赛国奖2名，省奖5名</Timeline.Item>
          <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
            2019夏队就职于Shopee,徐仙就职于阿里，郭仙夺得多个offer并保研至电子科大，蓝桥杯省一3人，省二5名，省三2名
          </Timeline.Item>
          <Timeline.Item color="red">2020杰队就职于阿里，前端天花板&offer收割机龚老师强势夺得多个Offer，刘思琪学姐保研，蓝桥杯省一7名，省二10名，省三2名</Timeline.Item>
          <Timeline.Item>2021的乐程，也必然是仙气缭绕的一年</Timeline.Item>
          <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
            乐程一年更比一年牛逼！！！
          </Timeline.Item>
        </Timeline>
      </div>
    )
  }
}