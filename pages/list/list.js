// pages/list/list.js
import Toast from 'tdesign-miniprogram/toast/index'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    workList:[],
    emptyDes: '网络异常'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
      wx.request({
        url: app.globalData.host + '/work/getList?userId=' + wx.getStorageSync('userId'),
        success: (res) => {
          if(res.data.code === 0 && res.data.data.length > 0){
            var result=[]
              for(let i = 0;i<res.data.data.length;i++){
                result.push(
                  {
                    imageSrc:'data:image/jpeg;base64,'+res.data.data[i].firstPic,
                    title:res.data.data[i].title,
                    time:res.data.data[i].createTime,
                    id:res.data.data[i].id+''
                  }
                )
              }
              this.setData({
                workList:result
              })
          } else {
            this.setData({
                emptyDes:'暂无绘本作品哦，快去创作吧！'
            })
          }
        }
      })
  },
  onCardTap(event) {
     let id = event.detail.cardId
     wx.request({
        url: app.globalData.host+'/work/queryWorkById?id='+id,
        success:(res)=>{
          if(res.data.code === 0){
            wx.setStorageSync('workById', res.data.data)
            wx.navigateTo({
              url: '/pages/work/work?id='+id,
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
        fail(res){
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
  }
})