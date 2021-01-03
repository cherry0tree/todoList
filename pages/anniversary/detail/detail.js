// pages/anniversary/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'event': '',
    'date': ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var op=JSON.parse(options.detail)
    console.log(op.id)
    this.setData({
      event: op.text,
      date: op.date,
      detailId: op.id
    })
  },
  inputEvent: function(e){
    //传value
    this.setData({
      event: e.detail.value
    })
  },
  saveEvent: function() {
    var id = this.data.detailId
    var pages=getCurrentPages()
    var date=this.data.date
    var aDate = date.split("-")
    var oDate = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0])
    var curDate = new Date()
    var days = parseInt(Math.abs(curDate - oDate) / (1000 * 60 * 60 * 24)) 
    var anniver = { 'text': this.data.event, 'date': this.data.date, 'time': days, 'id': this.data.detailId}
    wx.navigateBack({
      success:function(res){
        var Anniver = pages[0].data.Anniversary
        for(var i = 0; i < Anniver.length; i++){
          if(Anniver[i].id === id){
            Anniver[i]=anniver
          }
        }
        pages[0].setData({
          Anniversary:Anniver
        })
        wx.setStorage({
          key: 'Anniversary',
          data: Anniver,
        })        
      }
    })
  },
  delEvent: function(){
    var id = this.data.detailId
    var pages = getCurrentPages()
    wx.navigateBack({
      success: function(res){
        var Anniver = pages[0].data.Anniversary
        for(var i = 0; i < Anniver.length; i++){
          if(Anniver[i].id === id){
            Anniver.splice(i, 1)
            break
          }
        }
        pages[0].setData({
          Anniversary: Anniver,
          shiwTip: Anniver.length === 0 ? true : false
        })
        wx.setStorage({
          key: 'Anniversary',
          data: Anniver,
        })        
      }
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