import{
  formatTime
} from "../../utils/util.js"

// pages/Todo/Todo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "todoList": [],
    "todoinput": null,
    "uncompletedNum": 0,
    "inputContent": '',
  },
  //add todo Item
  btnClick: function() {
    if(this.data.todoinput !== null) {
      const newTodo={
        "id": new Date().getTime(),
        "todo": this.data.todoinput,
        "completed": false
      }
      //get input value
      this.data.todoList.push(newTodo) 
      this.setData({
        "todoinput": null,
        "todoList":this.data.todoList,
        "uncompletedNum":this.data.uncompletedNum+1,
        "inputContent":''
      })
      console.log(this.data)
      this.storageHistory() 
    }
  },
  storageHistory: function() {
    var today   = formatTime(new Date())
    var history = wx.getStorage({
      key: 'todoHistory',
      success: function(res) {} 
    })
    if(typeof history != "object"){
      history = []
    }
    if(history[0] === today){
      history[1] = this.data.todoList
    }else{
      history[1] = this.data.todoList
      history[0] = today
    }
    wx.setStorage({
      key: 'todoHistory',
      data: history,
    })    
  },
  input: function(event) {
    this.setData({
      todoinput:event.detail.value
    })
    console.log(this.data)
  },
  //get current event and do toggle when user tap
  toggleTodo: function(e) {
    console.log(e)
    const todoId = e.currentTarget.dataset.todoId
    for(var i = 0; i < this.data.todoList.length; i++) {
      if (this.data.todoList[i].id === todoId) {
        console.log('toggleTodo --E')
        if(this.data.todoList[i].completed === false) {
          console.log('completed false --E')
          this.data.todoList[i].completed = true
          this.data.uncompletedNum -= 1       
        } else {
          this.data.todoList[i].completed=false
          this.data.uncompletedNum += 1          
        }
      }
      this.setData({
        todoList:this.data.todoList,
        "uncompletedNum":this.data.uncompletedNum,
      })
    }
    console.log(this.data.uncompletedNum)
  },
  deleteTodo: function(e) {
    const todoId = e.currentTarget.dataset.todoId
    for(var i = 0; i< this.data.todoList.length;i++){
      if(todoId === this.data.todoList[i].id){
        if(this.data.todoList[i].completed === false) {
          this.data.uncompletedNum -= 1
        }
        this.data.todoList.splice(i, 1)
      }
    }
    this.setData({
      "uncompletedNum": this.data.uncompletedNum,
      "todoList": this.data.todoList
    })
  },
  storageHistory: function(){
    var today = formatTime(new Date())
    var history = wx.getStorageSync({
      key: 'todoHistory',
      success: function(res) {}
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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