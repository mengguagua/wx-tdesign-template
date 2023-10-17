const app = getApp()
Page({

  data: {
    userName: '',
    userId: '',
    authPhone: ''
  },

  onShow(options) {
    let _this = this;
    wx.getStorage({
      key: 'userInfo',
      complete(res) {
        if (res.data) {
          _this.setData({userName: res.data.userName, userId: res.data.userId, authPhone: res.data.authPhone ? res.data.authPhone : '未绑定'});
        }
      }
    })
  },

  toLogout() {
    app.http.logout().then(() => {
      console.log('登出logout');
      wx.removeStorage({
        key: 'token',
      })
      wx.removeStorage({
        key: 'userInfo',
      })
      app.globalData.token = '';
      app.globalData.userInfo = ''
      wx.reLaunch({
        url: "/pages/index/index"
      })
    });
  },

  goEdit() {
    wx.navigateTo({
      url: "/pages/mine/seting/edit/edit"
    })
  },

  goBindPhone() {
    if (this.data.authPhone === '未绑定') {
      wx.navigateTo({
        url: "/pages/mine/seting/bindPhone/bindPhone"
      })
    }
  },
  
})