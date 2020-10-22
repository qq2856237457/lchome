import React, {Component} from "react";
import {reqFirstTeam,} from "../../api";

import Team from "../../components/team/team";
import {columns} from "../../utils/columns/columns";


export default class First extends Component {
  state = {
    data: []
  };
  getData = async () => {
    const result = await reqFirstTeam();
    console.log(result);
    const res = result.data;
    if (res.status === 1) {
      this.setState({data: res.data})
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const title = '大一打卡列表';
    const {data} = this.state;
    return (
      <Team columns={columns} data={data} title={title}></Team>
    )
  }
}