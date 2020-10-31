import React, {Component} from "react";
import {connect} from "react-redux";


import Team from "../../components/team/team";
import {columns} from "../../utils/columns/columns";
import {getFirst} from "../../redux/actions";


class First extends Component {

  getData = () => {
    this.props.getFirst();
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const title = '大一打卡列表';
    const data = this.props.list;

    return (
      <Team columns={columns} data={data} title={title}></Team>
    )
  }
}

export default connect(
  state=>({list:state.getList}),
  {getFirst}
)(First)