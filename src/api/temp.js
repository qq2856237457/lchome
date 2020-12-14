import ajax from "./ajax";

// const BASE='http://localhost:5000';
const BASE='';
// const  BASE='http://60.205.248.213:5000';



// 获得大一同学的列表
export const reqFirstTeam = (date) => ajax(BASE+"/manage/team1", date);

//获得大二同学列表
export const reqSecondTeam = (date) => ajax(BASE+'/manage/team2', date);

// 登录
export const reqLogin = (username, password) => ajax(BASE+'/manage/login', {
  "username": username,
  "password": password
}, "POST");

//注册
export const reqRegister = (username, password, name, group) => ajax(BASE+'/manage/register', {
  username,
  password,
  name,
  group
}, "POST");

// 获取个人信息
export const reqInfo = (username) => ajax(BASE+'/manage/person', {username});

//打卡？退卡
export const reqClockStatus = (username) => ajax(BASE+'/manage/update', {username}, "POST");

// 数据周记
export const reqWeek = (day, id, month, year) => ajax(BASE+'/manage/week', {day, id, month, year}, "POST");

// //值日生
export const reqClearStudent = () => ajax(BASE+'/manage/getweek');

// 打卡日志
export const reqLog = (id) => ajax(BASE+'/manage/log', {id});

// 获取评论列表
export const reqGetComment=()=>ajax(BASE+'/manage/getcomment');

// 添加评论
export const reqAddComment=(comment)=>ajax(BASE+'/manage/useraddcomment',comment,"POST");

// 获取头条文章
export const reqGetMsg=()=>ajax(BASE+'/manage/getmsg');

// 管理员push日志
export const reqPush = (day, month, year,con) => ajax(BASE+'admin/push_report', {day, month, year,con},"POST");

//管理员重置打卡时间
export const reqReset=()=>ajax(BASE+'admin/reset');

//管理员增加打卡时间
export const reqAdd=(name,time)=>ajax(BASE+'/admin/add',{name,time},"POST");

// 管理员添加头条文章
export const reqAddMsg=(title,context)=>ajax(BASE+'/admin/adminaddmsg',{title,context},"POST");


