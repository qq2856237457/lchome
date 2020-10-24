import React, {Component} from "react";

import Team from "../../components/team/team";

import {columns} from "../../utils/columns/columns";
import {reqSecondTeam} from "../../api";

export default class Second extends Component {
  state = {
    data: [],
    loading: false,
  };
  getData = async () => {
    this.setState({
      loading: true
    });
    const result = await reqSecondTeam();
    this.setState({
      loading: false
    });
    const res = result.data;
    if (res.status === 1) {
      this.setState({data: res.data})
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const title = '大二打卡列表';
    const {data} = this.state;
    return (
      <Team columns={columns} data={data} title={title} ></Team>
    )
  }
}