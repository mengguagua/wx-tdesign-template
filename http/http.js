import fetch from './fetch';

// 定义请求的ip端口
let urlIp = "https://192.168.84.70:8098"; // 测试环境外网
// let urlIp = "https://domain/";// 正式环境

// 登录获取验证码,random为了重复请求，刷新验证码
let getCaptcha = (data) => {
  return urlIp + '/kwe-template/auth/getCaptcha?tmp='+ Math.random() + '&variable=' + data;
};
// 登录
let toLogin = (data) => {
  return fetch(urlIp + '/kwe-template/etcSysUser/toLogin', data);
};
// 微信登录
let authLogin = (data) => {
  return fetch(urlIp + '/kwe-template/etcSysUser/auth/login', data);
};
// 登出
let logout = () => {
  return fetch(urlIp + '/kwe-template/etcSysUser/logout', {});
};
// 获取openId
let getOpenId = (data) => {
  return fetch(urlIp + '/kwe-template/auth/getToken/' + data, {}, 'GET');
};
// 接口备注
let searchProgress = (data) => {
  return fetch(urlIp + '/kwe-template/etcVehicleManage/biddingProgress', data);
};

export default {
  urlIp,
  getCaptcha,
  toLogin,
  getOpenId,
  searchProgress,
  logout,
  authLogin,
}