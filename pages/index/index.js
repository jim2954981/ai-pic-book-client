// index.js
// 获取应用实例
import Toast, { hideToast } from 'tdesign-miniprogram/toast/index'
const app = getApp()
Page({
  data: {
    userInfo: {},
    characterOption:[{ label: '小女孩', value: '1' },
    { label: '小男孩', value: '2' }],
    characterText:'',
    characterValue:'',
    readTime:'',
    ageError: true,
    marks:{
      0:'0',
      34:'3',
      68:'5',
      100:'7'
    }
  },
  onLoad() {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo
        })
      }
    });
  },
  onAgeInput(e) {
    const { ageError } = this.data;
    const isNumber = /^\d+(\.\d+)?$/.test(e.detail.value);
    if (ageError === isNumber) {
      this.setData({
        ageError: !isNumber,
      });
    }
  },
  onCharacterPicker(){
    this.setData({ characterVisible: true });
  },
  onPickerChange(e) {
    const { key } = e.currentTarget.dataset;
    console.log('picker change:', e.detail);
    this.setData({
      [`${key}Value`]: e.detail.value,
      [`${key}Text`]: e.detail.label,
    });
  },
  onSliderChange(e){
    this.data.readTime=this.data.marks[e.detail.value]
  },
  onsubmit(e) {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '绘本创作中，请稍后',
      theme: 'loading',
      direction: 'column',
      duration:-1,
      preventScrollThrough:'true'
    })
    console.log(e.detail.value)
    wx.request({
      url: app.globalData.host+'/work/create',
      method:'POST',
      data: {
         "title":e.detail.value.title,
         "contentAbstract":e.detail.value.abstract,
         "childAge":e.detail.value.age,
         "readTime":this.data.readTime,
         "characterCode":this.data.characterValue[0],
         "userId":wx.getStorageSync('userId')
      },
      success: function (res) {
        console.log(res)
        if(res.data.code === 0){
          wx.setStorageSync('work', res.data.data)
          wx.navigateTo({
            url: '/pages/work/work'
          })
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: res.data.msg,
            theme: 'error',
            duration: 2000,
            direction: 'column',
          })
        }
      },
      fail: function (res) {
        wx.navigateTo({
          url: '/pages/work/work'
        })
        Toast({
          context: this,
          selector: '#t-toast',
          message: '网络异常',
          theme: 'error',
          duration: 2000,
          direction: 'column',
        })
      }
    })
  },
})
