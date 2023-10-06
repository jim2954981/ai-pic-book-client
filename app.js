const utils = require("./utils/util")

// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          wx.request({
            url: this.globalData.host + '/user/login?cCode='+ 
            res.code,
            success(res) {
              if(res.data.code === 0) {
                wx.setStorageSync('userId', res.data.data.userId)
                wx.setStorageSync('sessionKey', res.data.data.sessionKey)
              } else {
                wx.showToast({
                  title: '登录失败',
                  icon: 'error',
                  duration: 2000,
                  mask:true
                })
              }
            },
            fail() {
              wx.showToast({
                title: '登录失败',
                icon: 'error',
                duration: 2000,
                mask:true
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    host: "http://localhost:8080",
  }
})
