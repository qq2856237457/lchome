import axios from "axios";
import {message} from "antd";
import storageUtils from "../../utils/storageUtils";

//第一步创建实例
const service = axios.create({
  // baseURL: process.env.REACT_APP_API,
  baseURL: "",
  timeout: 500
});

// 第二步请求拦截
service.interceptors.request.use(function (config) {
  // 在发送请求之前做什么 token,username

  config.headers["Auadsjklasdjla"] = "qwererewrrwerwe";


  console.log(config);
  return config;
}, function (error) {
  // 请求错误做些什么
  return Promise.reject(error)
});

// 第三部响应拦截
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // storageUtils.removeUser();
  return response;
}, function (error) {
  // 请求响应错误做些什么
  message.error("请求出错啦! " + error.message);
  return Promise.reject(error)
});

export default service;