import {
  LOGIN_CONTROL,
  RESET_USER,
  SHOW_ERR_MSG,
  RECEIVE_USER,
  REGISTER_CONTROL,
  CHANGE_STATE,
  GET_FIRST, GET_SECOND
} from "./action-types";
import storageUtils from "../utils/storageUtils";
import {reqLogin, reqClockStatus, reqInfo, reqFirstTeam, reqSecondTeam} from "../api";

//控制login组件的action
export const loginControl = (loginControl) => ({type: LOGIN_CONTROL, flag: loginControl});
export const registerControl = (registerControl) => ({type: REGISTER_CONTROL, flag: registerControl});

// 接收用户的同步action
export const receiveUser = (user) => ({type: RECEIVE_USER, user});

// 显示错误信息的同步action
export const showErrMsg = (errorMsg) => ({type: SHOW_ERR_MSG, errorMsg});

// 修改状态的异步action
export const State = (username) => ({type: CHANGE_STATE, username});

//获取大一列表的action
export const first = (list) => ({type: GET_FIRST,list});

//获取大二列表的action
export const second = (list) => ({type: GET_SECOND,list});

// 退出登录的同步action
export const logout = () => {
  //清除local中的user
  storageUtils.removeUser();
  // 返回action对象
  return {type: RESET_USER}
};

export const login = (username, password) => {
  return async dispatch => {
    const result = await reqLogin(username, password);
    const res = result.data;
    if (res.status === 1) {
      const user = res.data;
      // 保存到local中
      storageUtils.saveUser(user);
      dispatch(receiveUser(user))
    } else {
      const msg = res.message;
      dispatch(showErrMsg(msg))
    }
  }
};

export const changeState = (username) => {
  return async dispatch => {
    const result = await reqClockStatus(username);
    const res = result.data;
    // console.log(res)
    if (res.status === 1) {
      const user = res.data;
      // 保存到local中
      storageUtils.saveUser(user);
      dispatch(receiveUser(user));
    } else {
      const msg = res.msg;
      dispatch(showErrMsg(msg))
    }
  }
};

export const getUser = (username) => {
  return async dispatch => {
    const result = await reqInfo(username);
    const res = result.data;
    // console.log(res)
    if (res.status === 1) {
      const user = res.data;
      // 保存到local中
      // storageUtils.saveUser(user);
      dispatch(receiveUser(user));
    } else {
      const msg = res.msg;
      dispatch(showErrMsg(msg))
    }
  }
};

export const getFirst=()=>{
  return async dispatch=>{
    const result=await reqFirstTeam();
    const res=result.data;
    if(res.status===1){
      dispatch(first(res.data))
    }else {
      const msg = res.msg;
      dispatch(showErrMsg(msg))
    }
  }
};

export const getSecond=()=>{
  return async dispatch=>{
    const result=await reqSecondTeam();
    const res=result.data;
    if(res.status===1){
      dispatch(second(res.data))
    }else {
      const msg = res.msg;
      dispatch(showErrMsg(msg))
    }
  }
};