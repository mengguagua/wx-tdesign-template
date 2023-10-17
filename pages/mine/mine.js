const app = getApp()
Page({

  data: {
    userInfo: {},
  },

  onLoad(options) {

  },

  onShow() {
    wx.getStorage({
      key: 'token',
      complete(res) {
        if (!res.data) {
          app.loginModal();
        }
      }
    })
    let _this = this;
    wx.getStorage({
      key: 'userInfo',
      complete(res) {
        _this.setData({
          userInfo: res.data,
        });
      }
    })

    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        value: 'label_3'
      })
    }
  },

  goPathManage() {
    wx.navigateTo({
      url: '/pages/mine/pathManage/pathManage',
    })
  },
  goInviteCode() {
    wx.navigateTo({
      url: '/pages/mine/inviteCode/inviteCode',
    })
  },
  goSeting() {
    wx.navigateTo({
      url: '/pages/mine/seting/seting',
    })
  },

})