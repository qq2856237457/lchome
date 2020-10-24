import ajax from "./ajax";

// 获得大一同学的列表
export const reqFirstTeam = () => ajax("/manage/team1");

//获得大二同学列表
export const reqSecondTeam = () => ajax('/manage/team2');

// 登录
export const reqLogin = (username, password) => ajax('/manage/login', {"username":username, "password":password}, "POST");

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