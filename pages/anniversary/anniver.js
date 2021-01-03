// pages/anniversary/anniver.js
import{
  formatTime
}from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "Anniversary":[],
    "newDate": '',
    'showTip': true
  },
  addAnniver: function(){
    wx.navigateTo({
      url: 'new/newAnniver'
    })
  },
  clickAnniver: function(e) {
    var anniver
    var anniverId = e.currentTarget.dataset.anniverId
    console.log(this.data.Anniversary)
    console.log(e)
    for(let i = 0; i < this.data.Anniversary.length;i++) {
      if(this.data.Anniversary[i].id === anniverId){
        anniver = this.data.Anniversary[i]
        break
      }
    }
    console.log(JSON.stringify(anniver))
    wx.navigateTo({
      url: 'detail/detail?detail=' + JSON.stringify(anniver)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Anniversary = wx.getStorageSync("Anniversary")
    if(typeof Anniversary!=='object'){
      Anniversary=[]
    }
    var curDate=formatTime(new Date())
    if (Anniversary.length !== 0){
      for(let i=0;i<Anniversary.length;i++){
        if(curDate!==Anniversary[i].saveDate){
          let cur = new Date()
          let oDate = new Date(Anniversary[i].date)
          let days = parseInt(Math.abs(cur - oDate) / (1000 * 60 * 60 * 24))
          Anniversary[i].time=days
          Anniversary[i].saveDate = curDate
        }
      }
    }
    this.setData({
      Anniversary: Anniversary,
      showTip:Anniversary.length===0?true:false
    })    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})