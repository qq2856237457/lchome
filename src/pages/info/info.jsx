import React, {Component} from "react";
import {Card, Table} from "antd";
import {connect} from "react-redux";

import {reqLog} from "../../api";

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '开始时间',
    dataIndex: 'xstart',
    key: 'xstart',
  },
  {
    title: '结束时间',
    dataIndex: 'xend',
    key: 'xend',
  },
  {
    title: '当前周数',
    dataIndex: 'week',
    key: 'week'
  }
];


class Info extends Component {
  state = {
    data: []
  };

  getLog = async () => {
    const id = this.props.user.id;
    const result = await reqLog(id);
    const res = result.data;
    const data = res.data;
    if (res.status === 1) {
      for (var i = 0; i < data.length; i++) {
        data[i].name = this.props.user.name;
      }
      this.setState({
        data: data
      })
    }

  };

  componentWillMount() {
    this.getLog();
  }

  render() {
    const {data} = this.state;
    return (
      <Card title={'本周打卡日志'}>
        <Table
          bordered
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: 5,
            showQuickJumper: true,
            total: data.length
          }}
        />
      </Card>
    )
  }
}


export default connect(
  state => ({user: state.user})
)(Info)