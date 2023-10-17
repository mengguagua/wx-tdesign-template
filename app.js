// app.js 全局js对象
import http from './http/http';
App({
  http,
  globalData: {
    appid: "wx946631e081cd5638",
    openid: '',
    token: '',
    userInfo: {},
  },
  getShowToast(msg = '网络拥堵 稍后再试') {
    wx.showToast({
      icon: 'none',
      title: msg,
      duration: 3000
    })
  },
  loginModal() {
    wx.showModal({
      content: '请先登录',
      success (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/toLogin/toLogin',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }
    })
  },
  // requireArray格式 [{length: '', msg: ''}]
  // 以后有其它表单校验可以拓展逻辑
  checkRequire(requireArray) {
    try {
      requireArray.forEach((ret) => {
        if (ret.length === 0) {
          throw new Error(ret.msg || '不能为空');
        }
      });
      return true;
    } catch (error) {
      this.getShowToast(error.message);
      return false;
    }
  },

  onLaunch: function () {
    // let _this = this
    // wx.getStorage({
    //   key: 'openid',
    //   complete(res) {
    //       if (res.data) {
    //           _this.globalData.openid = res.data
    //       }
    //   }
    // })
  },
})
// -------其它原型方法------
// 示例：bookingDate = new Date().Format('yyyy-MM-dd');
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
