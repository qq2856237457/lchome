import React, {Component} from "react";
import ReactEcharts from 'echarts-for-react';
import {Card, DatePicker, message} from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import {reqWeek} from "../../api";




export default class Chars extends Component {

  state = {
    data: []
  };

  getData = async (week) => {
    const result = await reqWeek(week);
    const res = result.data;
    if (res.status === 1) {
      this.setState({data: res.data});
    } else {
      message.error(res.message);
    }
  };

  onChange = async (date, dateString) => {
    const week = parseInt(dateString.substring(5, 7));
    this.getData(week);
  };

  componentWillUnmount() {
    this.getData(1);
  }

  render() {
    const {data} = this.state;
    let sum = 0;
    for (var i = 0; i < data.length; i++) {
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
                  formatter: "数据平均 : " + (sum / data.length).toFixed(2) + 'h',
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
        <Card title={'个人打卡数据周记'} extra={extra}>
          <ReactEcharts option={option}/>
        </Card>
      </div>
    )
  }
};


