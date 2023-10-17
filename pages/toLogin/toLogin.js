const app = getApp()
Page({

  data: {
    invitationCode: '',
  },

  onLoad(options) {
    console.log('options-scene', options)
    this.setData({
      invitationCode: options.scene
    });
  },

  onShow() {

  },

  goWx(e) {
    console.log('bindgetphonenumber', e.detail.code)
    if(!e.detail.code) {
      return false; // 点击取消
    }
    let invitationCode = this.data.invitationCode;
    console.log('invitationCode', invitationCode)
    app.http.authLogin({authPhone:  e.detail.code, invitationCode: invitationCode}).then((resp) => {
      wx.setStorage({
        key: "token",
        data: resp.data.data.token,
      })
      wx.setStorage({
        key: "userInfo",
        data: resp.data.data.userInfo,
      })
      app.globalData.token = resp.data.data.token;
      app.globalData.userInfo = resp.data.data.userInfo
      wx.reLaunch({
        url: "/pages/index/index"
      })
    });
  },

  gotoLogin() {
    wx.reLaunch({
      url: "/pages/login/login"
    })
  },
  
})