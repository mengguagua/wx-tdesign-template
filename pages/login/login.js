const app = getApp()
Page({
  data: {
    codeImgSrc: '',
    userId: '',
    userPwd: '',
    checkCode: '',
    variable: '',
    showType: '1'
  },

  onLoad(options) {
    this.getCheckCode();
  },

  changeShow(e) {
    this.setData({showType: e.currentTarget.dataset.showtype});
  },

  // 生成指定范围的整数，包含两边
  selectFromRange(lowerValue, upperValue) {
    let choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue); // floor舍去小数； random生成 0～1，不包括1的数。
  },
  getCheckCode() {
    let data = this.selectFromRange(0, 100000000) * 1111
    console.log('getCheckCode的variable', data)
    this.setData({
      codeImgSrc: app.http.getCaptcha(data),
      variable: data,
    })
  },
  doLogin() {
    let dicArray = [
      {
        length: this.data.userId.length,
        msg: '账户不能为空',
      }, {
        length: this.data.userPwd.length,
        msg: '密码不能为空',
      }, {
        length: this.data.checkCode.length,
        msg: '验证码不能为空',
      },
    ];
    let result = app.checkRequire(dicArray);
    if(!result) return false;
    let data = {
      userId: this.data.userId,
      userPwd: this.data.userPwd,
      checkCode: this.data.checkCode,
      variable: this.data.variable,
    };
    console.log('toLoginData', data);
    app.http.toLogin(data).then((resp) => {
      console.log('toLoginResp', resp);
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
    }).catch((err) => {
      this.getCheckCode();
    });
  },
  getUserId(e) {
    this.setData({
      userId: e.detail.value
    });
  },
  getUserPwd(e) {
    this.setData({
      userPwd: e.detail.value || ''
    });
  },
  getCheckCodeValue(e) {
    this.setData({
      checkCode: e.detail.value
    });
  },
 
})