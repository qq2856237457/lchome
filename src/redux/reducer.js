import {combineReducers} from "redux";
import {LOGIN_CONTROL, REGISTER_CONTROL} from "./action-types";


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

export default combineReducers({
  loginComponentControl,
  registerComponentControl
})