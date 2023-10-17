//promise封装wx.request
export default async (url, data, method = 'POST')=>{
  // 获取token，若不存在且需要鉴权接口会返回400
  let tokenData = await getTokenStorage();
  console.log('token', tokenData.data)
  // 定义promise
  let promise = new Promise((resolve,reject)=>{
    wx.request({
        url:url,
        data:data,
        method:method,
        header: {
          'X-Access-Token': tokenData.data || '',
        },
        //成功时执行
        success(res){
          // console.log('请求的status', res.data.status)
          // 0成功，1失败，400未登录
          if (res.data && res.data.status == 1) {
            if (res.data.errCode == 208) {
              wx.showModal({
                title: '提示',
                showCancel: false,
                confirmText: '我知道了',
                content: res.data.message,
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: res.data.message || '网络拥堵 稍后再试',
                duration: 3000
              })
            }
            reject(res)
          } else if (res.data && res.data.status == 400){
            wx.showModal({
              content: '请先登录',
              success (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/toLogin/toLogin',
                  })
                } else if (res.cancel) {
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }
              }
            })
          }
          resolve(res)
        },
        //失败时执行
        fail(err){
          reject(err)
        },
    })
  })
  // 将promise推出去
  return promise;
}

let getTokenStorage = () => {
  let promise = new Promise((resolve,reject)=>{
    wx.getStorage({
      key: 'token',
      complete(res) {
        resolve(res)
      }
    })
  })
  return promise;
}