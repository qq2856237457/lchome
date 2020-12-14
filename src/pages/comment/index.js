import React, {Component} from "react";
import {connect} from 'react-redux'
import {
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Card,
  Typography, message,
} from 'antd';


import {reqAddComment, reqGetComment, reqGetMsg, reqInfo} from "../../api";
import header from "../../static/head.jpg"


const {TextArea} = Input;
const {Title, Paragraph} = Typography;


const CommentList = ({comments}) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({onChange, onSubmit, submitting, value}) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        添加评论
      </Button>
    </Form.Item>
  </div>
);

class Article extends Component {
  state = {
    title: '',
    context: '',
    comments: [],
    value: '',
    user: {}
  };

  handleSubmit = async () => {
    if (!this.state.value) {
      return;
    }
    const comment = {
      id: this.state.user.id,
      author: this.state.user.name,
      content: this.state.value,
    };
    this.setState({
      value: ''
    });

    const result = await reqAddComment(comment);
    const res = result.data;
    if (res.status === 1) {
      this.getComment();
    } else {
      message.error(res.msg);
    }

  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };


  getComment = async () => {
    const result = await reqGetComment();
    const res = result.data;

    if (res.status === 1) {
      this.setState({
        comments: res.data
      })
    } else {
      message.error(res.msg);
    }
  };

  getMsg = async () => {
    const result = await reqGetMsg();
    const res = result.data;
    if (res.status === 1) {
      if (res.data != null) {
        this.setState({
          title: res.data.title,
          context: res.data.context
        })
      }
    } else {
      message.error(res.msg);
    }

  };

  getUser = async (username) => {
    if (!username) {
      return {}
    }
    const result = await reqInfo(username);
    const res = result.data;
    if (res.status === 1) {
      const user = res.data;
      this.setState({user})
    } else {
      message.error(res.msg);
    }
  };


  componentDidMount() {
    this.getUser(this.props.user.number);
    this.getComment();
    this.getMsg();
  }

  render() {
    const {comments, submitting, value, title, context, user} = this.state;
    const {name} = user;
    return (
      <Card title={<Title level={3}>今日公告</Title>}>
        <div>
          <Typography>
            <Paragraph>
              {title}
            </Paragraph>
            <Paragraph>
              <pre>{context}</pre>
            </Paragraph>
          </Typography>
        </div>
        <div>
          {comments.length > 0 && <CommentList comments={comments}/>}
          <Comment
            avatar={
              <Avatar
                src={header}
                alt={name}
              />
            }
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        </div>
      </Card>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {}
)(Article)


