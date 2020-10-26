import React from "react";
import {Tag} from "antd";

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
    title: '完成度',
    dataIndex: 'completeness',
    key: 'completeness',
    render: tag => {
      tag = tag.toFixed(2);
      if (tag == 100) {
        let str = tag.toString();
        str = str + '%';
        return <Tag color={'green'}>{str}</Tag>
      } else if (tag < 100 && tag >= 70) {
        let str = tag.toString();
        str = str + '%';
        return <Tag color={'geekblue'}>{str}</Tag>
      } else if (tag < 70) {
        let str = tag.toString();
        str = str + '%';
        return <Tag color={'volcano'}>{str}</Tag>
      }
    }
  },
];