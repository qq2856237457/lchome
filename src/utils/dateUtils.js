/*
*
* 格式化日期
*
* */

import storageUtils from "./storageUtils";


export function formateDate(time) {
  if (!time) return '';
  let date = new Date(time);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    + ' ' + date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds()
}

export function getToday(time) {

  if (!time) return '';
  let date = new Date(time);
  const data = {
    "year": date.getFullYear(),
    "month": date.getMonth() + 1,
    "day": date.getDate(),
    "id": storageUtils.getUser().id
  };
  return data
}