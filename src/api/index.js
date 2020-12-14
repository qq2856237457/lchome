import service from "./utils/request";


// http://47.98.254.16/manage/person

const BASE = '';

// 获取大一同学列表
export const reqFirstTeam = (date) => {
  return service.request({
    url: BASE + '/manage/team1',
    method: 'get',
    // data,请求为post时
    // params:data请求为get时
    params: date
  })
};

//获得大二同学列表
export const reqSecondTeam = (date) => {
  return service.request({
    url: BASE + '/manage/team2',
    method: 'get',
    // data,请求为post时
    // params:data请求为get时
    params: date
  })
};

// 登录
export const reqLogin = (username, password) => {
  return service.request({
    url: BASE + '/manage/login',
    method: 'post',
    // data,请求为post时
    // params:data请求为get时
    data: {
      "username": username,
      "password": password
    }
  })
};

//注册
export const reqRegister = (username, password, name, group) => {
  return service.request({
    url: BASE + '/manage/register',
    method: 'post',
    // data,请求为post时
    // params:data请求为get时
    data: {username, password, name, group}
  })
};


// 获取个人信息
export const reqInfo = (username) => {
  return service.request({
    url: BASE + '/manage/person',
    method: 'get',
    // data,请求为post时
    // params:data请求为get时
    params: {username}
  })
};


//打卡？退卡
export const reqClockStatus = (username) => {
  return service.request({
    url: BASE + '/manage/update',
    method: 'post',
    // data,请求为post时
    // params:data请求为get时
    data: {username}
  })
};


// 数据周记
export const reqWeek = (day, id, month, year) => {
  return service.request({
    url: BASE + '/manage/week',
    method: 'post',
    // data,请求为post时
    // params:data请求为get时
    data: {day, id, month, year}
  })
};


// //值日生
export const reqClearStudent = () => {
  return service.request({
    url: BASE + '/manage/getweek',
    method: 'get',
    // data,请求为post时
    // params:data请求为get时
    params: {}
  })
};


// 打卡日志
export const reqLog = (id) => {
  return service.request({
    url: BASE + '/manage/log',
    method: 'get',
    // data,请求为post时
    // params:data请求为get时
    params: {id}
  })
};


// 获取评论列表
export const reqGetComment = () => {
  return service.request({
    url: BASE + '/manage/getcomment',
    method: 'get',
    // data,请求为post时
    // params:data请求为get时
    params: {}
  })
};


// 添加评论
export const reqAddComment = (comment) => {
  return service.request({
    url: BASE + '/manage/useraddcomment',
    method: 'post',
    // data,请求为post时
    // params:data请求为get时
    data: {comment}
  })
};


// 获取头条文章
export const reqGetMsg = () => {
  return service.request({
    url: BASE + '/manage/getmsg',
    method: 'get',
    // data,请求为post时
    // params:data请求为get时
    params: {}
  })
};


// 管理员push日志
export const reqPush = (day, month, year, con) => {
  return service.request({
    url: BASE + 'admin/push_report',
    method: 'post',
    // data,请求为post时
    // params:data请求为get时
    data: {day, month, year, con}
  })
};

//管理员重置打卡时间
export const reqReset = () => {
  return service.request({
    url: BASE + 'admin/reset',
    method: 'get',
    // data,请求为post时
    // params:data请求为get时
    params: {}
  })
};


//管理员增加打卡时间
export const reqAdd = (name, time) => {
  return service.request({
    url: BASE + '/admin/add',
    method: 'post',
    // data,请求为post时
    // params:data请求为get时
    data: {name, time}
  })
};


// 管理员添加头条文章
export const reqAddMsg = (title, context) => {
  return service.request({
    url: BASE + '/admin/adminaddmsg',
    method: 'post',
    // data,请求为post时
    // params:data请求为get时
    data: {title, context}
  })
};