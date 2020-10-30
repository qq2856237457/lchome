import React, {Component} from "react";
import ReactEcharts from 'echarts-for-react';
import {Card, DatePicker, message} from "antd";
import {connect} from "react-redux";
import locale from "antd/es/date-picker/locale/zh_CN";


import {reqWeek} from "../../api";
import {getToday} from "../../utils/dateUtils";


class Chars extends Component {

  state = {
    data: []
  };

  getData = async (date) => {
    let data = getToday(date);
    const result = await reqWeek(data);
    const res = result.data;
    if (res.status === 1) {
      this.setState({data: res.data.day});
    } else {
      message.error(res.message);
    }
  };

  onChange = (date, dateString) => {
    this.getData(date)
  };

  componentWillMount() {
    this.getData(Date.now());
  }

  render() {
    const {data} = this.state;
    let sum = 0;
    for (var i = 0; i < 7; i++) {
      sum += data[i];
    }
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '打卡数据',
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ],
            symbol: ['none', 'none'],
            position: "insideTopCenter",
            itemStyle: {
              normal: {
                lineStyle: {
                  type: 'dotted',
                  color: 'red'
                },
                label: {
                  show: true,
                  position: 'middle',
                  formatter: "数据平均 : " + (sum / 7).toFixed(2) + 'h',
                }
              }
            },
            large: true,
            effect: {
              show: false,
              loop: true,
              period: 0,
              scaleSize: 2,
              color: null,
              shadowColor: null,
              shadowBlur: null
            },
          },
          type: 'bar',
          barWidth: '60%',
          data: data
        }
      ]
    };
    const extra = (
      <DatePicker locale={locale} onChange={this.onChange} picker="week"/>
    );
    return (
      <div>
        <Card title={'个人打卡数据周报'} extra={extra}>
          <ReactEcharts option={option}/>
        </Card>
      </div>
    )
  }
};

export default connect(
  state => ({user: state.user})
)(Chars)


