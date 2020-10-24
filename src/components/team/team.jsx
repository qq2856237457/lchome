import React, {Component} from "react";
import {Button, Card, Table} from "antd";
import {connect} from "react-redux"

import {formateDate} from '../../utils/dateUtils'
import {getFirst, getSecond} from "../../redux/actions";

class Team extends Component {
  state = {
    loading: false,
    currentTime: formateDate(Date.now())
  };

  handChange = (title) => {
this.setState({loading:true});
    if (title == "大一打卡列表") {
      this.props.getFirst();
    } else {
      this.props.getSecond();
    }
    this.setState({loading:false});
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
    const {loading} = this.state;
    const {columns, data, title} = this.props;
    const {currentTime} = this.state;
    const extra = (
      <div>
        <span style={{marginRight: 40}}>{currentTime}</span>
        <Button type={"primary"}
                onClick={() => this.handChange(title)}
                style={{marginRight: 20}}
        >
          刷新
        </Button>
      </div>
    );
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

export default connect(
  state => ({}),
  {getFirst, getSecond}
)(Team)