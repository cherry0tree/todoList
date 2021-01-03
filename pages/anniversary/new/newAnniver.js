// pages/anniversary/new/newAnniver.js
import {
  formatTime
} from "../../../utils/util.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    'inputTxt': '',
    'data': '',
  },
  inputEvent: function(e){
    console.log(e)
    this.setData({
      inputTxt: e.detail.value
    })
  },
  saveEvent: function(e){
    var pageArray = getCurrentPages()
    console.log(pageArray)
    var txt = this.data.inputTxt
    console.log(txt)
    var anniver = {"text": txt}
    wx.navigateBack({
      success: function(res){
       var anniversary = pageArray[pageArray.length - 2].data.Anniversary
       anniversary.splice(0,0,anniver)
       pageArray[pageArray.length-2].setData({
        Anniversary: anniversary
       })
       wx.setStorage({
         key: 'Anniversary',
         data: anniversary,
       })
       console.log(anniversary)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var today = formatTime(new Date())
    this.setData({
      date: today
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