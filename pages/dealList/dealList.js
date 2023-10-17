const app = getApp()
Page({
  data: {
    dateVisible: false,
    tabValue: '',
    currentStatus: '',
    currentStatusDic: {
      2: "no-pass",
      1: "pass",
      0: "pass-ing",
    },
    vehicleCode: '',
    listData: [],
    // BLUE("蓝色", "0"),
    // YELLOW("黄色", "1"),
    // BLACK("黑色","2"),
    // WHITE("白色","3"),
    // GRADUAL_GREEN("渐变绿色", "4"),
    // YELLOW_GREEN("黄绿双拼色", "5"),
    // BLUE_WHITE("蓝白渐变色", "6"),
    // OHTHER("其他","-1");
    vehicleColorDic: {
      0: 'blue-card',
      1: 'yellow-card',
      2: 'black-card',
      3: 'white-card',
      4: 'green-card',
      5: 'yellow-green-card',
      6: 'white-blue-card',
    },
    startTimeRang: [],
    minDate: 0,
  },

  onLoad(options) {

  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        value: 'label_2'
      })
    }
    // 设置默认最近7天
    let sevevDayLong = 7 * 24 * 60 * 60 * 1000; 
    let today = new Date().getTime();
    let sevenDay = today - sevevDayLong;
    // 设置日历可选前一个月，后改成2年
    let monthDayLong = 24 * 31 * 24 * 60 * 60 * 1000;
    let minDate = today - monthDayLong;
    this.setData({startTimeRang: [sevenDay, today], minDate: minDate});
    this.searchData();
  },

  searchData() {
    let applyTimeBegin = new Date(this.data.startTimeRang[0]).Format('yyyy-MM-dd');
    let applyTimeEnd = new Date(this.data.startTimeRang[1]).Format('yyyy-MM-dd');
    let data = {
      applyTimeBegin: applyTimeBegin,
      applyTimeEnd: applyTimeEnd,
      makeCardState: this.data.tabValue,
      vehicleCode: this.data.vehicleCode,
    };
    app.http.searchProgress(data).then((resp) => {
      let listData = resp.data.data;
      if (resp && resp.data && listData.length) {
        listData.forEach((item) => {
          item.currentStatus = this.data.currentStatusDic[item.makeCardState]
        });
        this.setData({
          listData: listData,
        });
      }
    });
  },
  onTabsChange(event) {
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    this.setData({
      tabValue: event.detail.value,
    });
    this.searchData();
  },
  getVehicleCode(e) {
    this.setData({
      vehicleCode: e.detail.value
    });
  },
  onIconTap() {
    this.setData({dateVisible: true,});
  },
  handleConfirm(e) {
    if (e.detail.value[0] && e.detail.value[1]) {
      this.setData({startTimeRang: [e.detail.value[0], e.detail.value[1]]});
      this.searchData()
    } else {
      app.getShowToast('请选择开始结束日期');
    }
  },

})