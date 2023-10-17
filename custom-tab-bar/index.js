Page({

  data: {
    value: 'label_1',
    list: [
      { value: 'label_1', label: '首页', icon: 'home' },
      { value: 'label_2', label: 'tab功能', icon: 'creditcard' },
      { value: 'label_3', label: '我的', icon: 'user' },
    ],
  },

  onLoad(options) {

  },

  onShow() {
    if (this.data.value) {
      console.log(this.data.value)
      this.setData({
        value: this.data.value,
      });
    }
  },

  onChange(e) {
    // console.log('tabbar',e)
    let dic = {
      'label_1': '/pages/index/index',
      'label_2': '/pages/dealList/dealList',
      'label_3': '/pages/mine/mine',
    };
    wx.switchTab({
      url: dic[e.detail.value],
    })
    this.setData({
      value: e.detail.value,
    });
  },
})