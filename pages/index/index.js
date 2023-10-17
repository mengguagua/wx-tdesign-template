const app = getApp()
const swiperList = [
  `https://i.postimg.cc/yYXNyyBG/257741d06d22eec225bd0fd0dd6ab6a1.png`,
];

Page({
  data: {
    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000,
    swiperList,
    token: app.globalData.token || '',
    userInfo: {},
  },
  onLoad() {
    let _this = this;
    this.setGlobalDataToken();
    this.setGlobalDataUserInfo();
    wx.getStorage({
      key: 'openid',
      complete(res) {
        if (!res.data) {
          _this.getOpenId();
        }
      }
    })
  },
  onShow() {
    // 解决自定义tabBar要点击两次切换tab问题
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        value: 'label_1'
      })
    }
    let _this = this;
    wx.getStorage({
      key: 'userInfo',
      complete(res) {
        if (res.data) {
          _this.setData({
            userInfo: res.data,
          });
        }
      }
    })
  },
  onShareAppMessage() {
    return {
      title: '模板小程序',
      path: '/pages/index/index',
    }
  },

  getOpenId() {
    wx.login({
      success: res => {
        app.http.getOpenId(res.code).then((resp) => {
          wx.setStorage({
            key: "openid",
            data: resp.data.data
          })
        });
      }
    });
  },

  setGlobalDataToken() {
    // globalData是临时的,每次编译后会消失,若消失了则尝试从storage取
    if (app.globalData.token) {
      this.setData({
        token: app.globalData.token
      });
    } else {
      let _this = this;
      wx.getStorage({
        key: 'token',
        complete(res) {
          if (res.data) {
            app.globalData.token = res.data
            _this.setData({
              token: app.globalData.token
            });
          }
        }
      })
    }
  },

  setGlobalDataUserInfo() {
    // globalData是临时的,每次编译后会消失,若消失了则尝试从storage取
    if (!Object.keys(app.globalData.userInfo).length) {
      wx.getStorage({
        key: 'userInfo',
        complete(res) {
          if (res.data) {
            app.globalData.userInfo = res.data
          }
        }
      })
    }
  },

  goLogin() {
    wx.navigateTo({
      url: '/pages/toLogin/toLogin',
    })
  },
  goAddCarSearch() {
    // 跳转页面
  },
  goInviteEtc() {
    wx.getStorage({
      key: 'token',
      complete(res) {
        if (res.data) {
          // 跳转页面
        } else {
          app.loginModal();
        }
      }
    })
  },
  goDealList() {
    wx.getStorage({
      key: 'token',
      complete(res) {
        if (res.data) {
          wx.switchTab({
            url: '/pages/dealList/dealList',
          })
        } else {
          app.loginModal();
        }
      }
    })
  },
  goEtcApply() {
    wx.getStorage({
      key: 'token',
      complete(res) {
        if (res.data) {
          // 跳转页面
        } else {
          app.loginModal();
        }
      }
    })
  },
})
