import ajax from "./ajax";

// 获得大一同学的列表
export const reqFirstTeam = (date) => ajax("/manage/team1", date);

//获得大二同学列表
export const reqSecondTeam = (date) => ajax('/manage/team2', date);

// 登录

export const reqLogin = (username, password) => ajax('/manage/login', {
  "username": username,
  "password": password
}, "POST");

//注册
export const reqRegister = (username, password, name, group) => ajax('/manage/register', {
  username,
  password,
  name,
  group
}, "POST");

// 获取个人信息
export const reqInfo = (username) => ajax('/manage/person', {username});

//打卡？退卡
export const reqClockStatus = (username) => ajax('/manage/update', {username}, "POST");

// 数据周记
export const reqWeek = (day, id, month, year) => ajax('/manage/week', {day, id, month, year}, "POST");

// //值日生
export const reqClearStudent = () => ajax('/manage/getweek');

// 打卡日志
export const reqLog = (id) => ajax('/manage/log', {id});

// 管理员push日志
export const reqPush = (id) => ajax('manage/push', {id});