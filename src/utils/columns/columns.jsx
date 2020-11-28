import React from "react";
import {Progress} from "antd";

export const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '打卡日期',
    dataIndex: 'date',
    key: 'date'
  },
  {

    title: '状态',
    dataIndex: 'state',
    key: 'state',
    sorter: (a, b) => a.state - b.state,
    defaultSortOrder: "descend",
    render: state => {
      if (state == 1) {
        return <p style={{color: 'dodgerblue'}}>正在打卡</p>
      } else if (state == 0) {
        return <p>未打卡</p>
      }
    }
  },
  {
    title: '打卡时长(h)',
    dataIndex: 'time',
    key: 'time',
    sorter: (a, b) => a.time - b.time,
    defaultSortOrder: "descend",
    render: time => {
      time = time.toFixed(2);
      return time
    }
  },
  {
    title: '本周任务(h)',
    dataIndex: 'task',
    key: 'task',
    render: time => {
      time = time.toFixed(2);
      time = time + 'h';
      return time
    }
  },
  {
    title: '完成度',
    dataIndex: 'completeness',
    key: 'completeness',
    render: tag => {
      tag = tag.toFixed(2);
      if (tag >= 100) {
        return <Progress percent={tag} status="success"/>
      } else if (tag < 100) {
        return <Progress strokeColor={{'0%': '#108ee9', '100%': '#87d068',}}
                         status="active"
                         percent={tag}/>
      }
    }
  },
];