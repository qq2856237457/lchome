import React, {Component} from "react";
import {Button, Card, Table} from "antd";

import {formateDate} from '../../utils/dateUtils'

export default class Team extends Component {
  state = {
    loading: false,
    currentTime: formateDate(Date.now())
  };

  handChange = () => {
    this.setState({
      loading: true
    });
    setTimeout(() => {
      this.setState({loading: false})
    }, 500)
  };
  // 启动定时器，更新当前时间
  getDate = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({currentTime});
    }, 1000)
  };

  componentDidMount() {
    this.getDate();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const {currentTime} = this.state;
    const extra = (
      <div>
        <span style={{marginRight: 40}}>{currentTime}</span>
        <Button type={"primary"}
                onClick={this.handChange}
                style={{marginRight: 20}}
        >
          刷新
        </Button>
      </div>
    );
    const {loading} = this.state;
    const {columns, data, title} = this.props;
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          loading={loading}
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