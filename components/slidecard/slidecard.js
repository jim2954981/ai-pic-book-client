// components/slidecard.js
Component({
  properties: {
    imageList: {
      type: Array,
      value: []
    }
  },
  data:{
    currentIndex: 1
  },
  methods: {
    handlePrev: function() {
      let index = this.data.currentIndex - 1;
      if (index < 1) {
        this.showFirstPageAlert();
        index = 1
      }
      console.log(index)
      this.setData({
        currentIndex: index
      });
    },
    handleNext: function() {
      if (this.data.currentIndex === this.data.imageList.length) {
        this.showLastPageAlert();
        return;
      }
      let index = this.data.currentIndex + 1;
      if (index >= this.properties.imageList.length) {
        index = this.properties.imageList.length;
      }
      this.setData({
        currentIndex: index
      });
    },
    showLastPageAlert() {
      wx.showToast({
        title: '已经是最后一页啦',
        icon: 'none',
        duration: 2000
      });
    },
    showFirstPageAlert() {
      wx.showToast({
        title: '已经是第一页啦',
        icon: 'none',
        duration: 2000
      });
    }
  }
});