import {combineReducers} from "redux";

import storageUtils from "../utils/storageUtils";

import {
  CHANGE_STATE,
  GET_FIRST, GET_SECOND,
  LOGIN_CONTROL,
  RECEIVE_USER,
  REGISTER_CONTROL,
  RESET_USER,

} from "./action-types";


//用来管理登录页面的login组件和register组件的reducer函数
const initLoginFlag = false;
const initRegisterFlag = false;

function loginComponentControl(state = initLoginFlag, action) {
  switch (action.type) {
    case LOGIN_CONTROL:
      return action.flag;
    default:
      return state;
  }
}

function registerComponentControl(state = initRegisterFlag, action) {
  switch (action.type) {
    case REGISTER_CONTROL:
      return action.flag;
    default:
      return state;
  }
}

const initUser = storageUtils.getUser();

function user(state = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case RESET_USER:
      return {};
    case CHANGE_STATE:
      return action.user;
    default:
      return state
  }
}

const initList = [];
function getList(state = initList, action) {
  switch (action.type) {
    case GET_FIRST:
      return action.list;
    case GET_SECOND:
      return action.list;
    default:
      return state;
  }
}


export default combineReducers({
  loginComponentControl,
  registerComponentControl,
  user,
  getList
})