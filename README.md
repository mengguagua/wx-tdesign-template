## 模板小程序
### 尺寸换算
开发工具统一切换到iphone13 mini，UI设计稿1px = 2rpx换算
### 全局配置和方法
根目录下的app.js, app.json, app.wxss
js内是全局的公共方法和变量
json内是微信的系统配置，如菜单，页面头部尾部，组件全局引入
wxss是全局样式，可以用来覆盖tdesign样式
### css框架
腾讯官方推荐的tdesign
- 安装：npm i tdesign-miniprogram -S --production
- 安装完之后，需要在微信开发者工具中对 npm 进行构建：工具 - 构建 npm
> https://tdesign.tencent.com/miniprogram/getting-started
### 自定义tabBar
> https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html

tab点击两次才切换图标问题，参考官方示例项目解决方案
```js
  onShow() {
    if (this.data.value) {
      console.log(this.data.value)
      this.setData({
        value: this.data.value,
      });
    }
  },
```
### 接口请求
接口都放置在 http/http.js 文件内，统一定义接口，要求中文备注接口功能.
使用例子：
```js
//引入app
const app = getApp()
Page({
  data: {
    list:[]
  }
  onLoad: function () {
    app.http.searchVehicle(data).then((resp) => {
      console.log(resp)
    });
  }
})
```
### 注意点

1、e.currentTarget.dataset会把值的驼峰都改成全小写，所以用data-xxYy,取值是e.currentTarget.xxyy
2、tdesign的组件，偶尔新增后样式不生效，关闭编辑器重新打开即可

