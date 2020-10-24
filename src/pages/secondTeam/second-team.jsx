import React, {Component} from "react";
import {connect} from "react-redux"

import Team from "../../components/team/team";
import {columns} from "../../utils/columns/columns";
import {getSecond} from "../../redux/actions";

class Second extends Component {

  getData = () => {
    this.props.getSecond();
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const title = '大二打卡列表';
    const data = this.props.list;
    return (
      <Team columns={columns} data={data} title={title} ></Team>
    )
  }
}

export default connect(
  state=>({list:state.getList}),
  {getSecond}
)(Second)