// pages/work.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      workList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var work
    if(options.id) {
      work = wx.getStorageSync('workById')
    }else{
      work = wx.getStorageSync('work')
    }
    var list = work.paraGraphVOList
    console.log(list)
    var result =[]
    for(let i = 0; i<list.length; i++)
      result.push({
        imageUrl: 'data:image/jpeg;base64,'+list[i].pic,
        text: list[i].content
    });
    this.setData ({
      workList:result
    })
  }
})