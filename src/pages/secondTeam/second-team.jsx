import React, {Component} from "react";

import Team from "../../components/team/team";

import {columns} from "../../utils/columns/columns";

const data = [
  {
    name: '张三',
    date: "2018-05-26",
    record: "21:05 -- 21:05",
    state: 1,
    time: 13.3,
    completeness: 98
  },
  {
    name: '李四',
    date: "2018-05-26",
    record: "21:05 -- 21:05",
    state: 0,
    time: 1,
    completeness: 100
  },
  {

    name: '张三',
    date: "2018-05-26",
    record: "21:05 -- 21:05",
    state: 1,
    time: 12.3,
    completeness: 60
  },
  {
    name: '李四',
    date: "2018-05-26",
    record: "21:05 -- 21:05",
    state: 0,
    time: 1,
    completeness: 100
  },
  {
    name: '李四',
    date: "2018-05-26",
    record: "21:05 -- 21:05",
    state: 0,
    time: 1,
    completeness: 100
  },
  {
    name: '李四',
    date: "2018-05-26",
    record: "21:05 -- 21:05",
    state: 0,
    time: 1,
    completeness: 100
  },
  {
    name: '李四',
    date: "2018-05-26",
    record: "21:05 -- 21:05",
    state: 0,
    time: 1,
    completeness: 100
  },
  {
    name: '李四',
    date: "2018-05-26",
    record: "21:05 -- 21:05",
    state: 0,
    time: 1,
    completeness: 100
  },
  {
    name: '李四',
    date: "2018-05-26",
    record: "21:05 -- 21:05",
    state: 0,
    time: 1,
    completeness: 100
  },
  {
    name: '李四',
    date: "2018-05-26",
    record: "21:05 -- 21:05",
    state: 0,
    time: 1,
    completeness: 100
  },


];

export default class Second extends Component {


  render() {
    const title = '大二打卡列表';
    return (
      <Team columns={columns} data={data} title={title}></Team>
    )
  }

}