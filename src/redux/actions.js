import {LOGIN_CONTROL, REGISTER_CONTROL} from "./action-types";

//控制login组件的action
export const loginControl = (loginControl) => ({type: LOGIN_CONTROL, flag: loginControl});
export const registerControl = (registerControl) => ({type: REGISTER_CONTROL, flag: registerControl});