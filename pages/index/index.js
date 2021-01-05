//index.js
//获取应用实例
import{
  formatTime
}from "../../utils/util.js"

const app = getApp()
const QQMapWX = require('../../utils/qqmap-wx-jssdk')
var cityArray=require("../../utils/citys.js")
var today=formatTime(new Date())
var picUrl = {
  '紫外线指数': "https://t1.picb.cc/uploads/2018/02/03/sI6Bc.png",
  '中雨': 'https://t1.picb.cc/uploads/2018/02/03/sIf8j.png',
  '中雪': "https://t1.picb.cc/uploads/2018/02/03/sIwwy.png",
  '阵雨': 'https://t1.picb.cc/uploads/2018/02/28/YjCS0.png',
  '强阵雨': 'https://t1.picb.cc/uploads/2018/02/28/YjCS0.png',
  '运动指数': 'https://t1.picb.cc/uploads/2018/02/03/sIk7X.png',
  '雨夹雪': "https://t1.picb.cc/uploads/2018/02/03/sIgeg.png",
  '阴': 'https://t1.picb.cc/uploads/2018/02/03/sI2aR.png',
  '小雨': "https://t1.picb.cc/uploads/2018/02/03/sIy1w.png",
  '小雪': "https://t1.picb.cc/uploads/2018/02/03/s6o2W.png",
  "洗车指数": "https://t1.picb.cc/uploads/2018/02/03/s6YXL.png",
  "雾霾": "https://t1.picb.cc/uploads/2018/02/03/s6K8i.png",
  "雾": "https://t1.picb.cc/uploads/2018/02/03/s6EZv.png",
  "特大暴雨": "https://t1.picb.cc/uploads/2018/02/03/s6zTD.png",
  "舒适度指数": "https://t1.picb.cc/uploads/2018/02/03/s6s7u.png",
  "晴间多云": "https://t1.picb.cc/uploads/2018/02/03/s6Una.png",
  "雷阵雨": "https://t1.picb.cc/uploads/2018/02/03/s6xm0.png",
  "风": "https://t1.picb.cc/uploads/2018/02/03/s6B5F.png",
  "晴": "https://t1.picb.cc/uploads/2018/02/03/s69Dd.png",
  "多云": "https://t1.picb.cc/uploads/2018/02/03/s6XZt.png",
  "大雨": "https://t1.picb.cc/uploads/2018/02/03/s60TM.png",
  "大雪": "https://t1.picb.cc/uploads/2018/02/03/s6pqT.png",
  "大风": "https://t1.picb.cc/uploads/2018/02/03/s6jn6.png",
  "大暴雪": "https://t1.picb.cc/uploads/2018/02/03/s6aD7.png",
  "暴雪":"https://t1.picb.cc/uploads/2018/02/03/s6aD7.png",
  "暴雨": "https://t1.picb.cc/uploads/2018/02/03/s6Nme.png",
  "旅游指数": "https://t1.picb.cc/uploads/2018/02/03/s6Ta1.png",
  "空气污染扩散条件指数": "https://t1.picb.cc/uploads/2018/02/03/s6R2J.png",
  "感冒指数": "https://t1.picb.cc/uploads/2018/02/03/s6FXr.png",
  "穿衣指数": "https://t1.picb.cc/uploads/2018/02/03/s6QQs.png",
  "冻雨":"https://t1.picb.cc/uploads/2018/02/03/snJWX.png",
  "阵雪":"https://t1.picb.cc/uploads/2018/02/08/zkACa.png"  
}

Page({
  data: {
    'province': "",//当前省
    'city': "",//当前城市
    'district': "",//当前区
    "selectCityView":false,
    "picUrl": picUrl,
    'curWeather': null,//实时天气
    'weatherInfo': null,//7天的天气信息
    // picker
    "provinces":[],
    'cities':[],
    'districts':[],    
  },
  onLoad: function () {
    var that = this
    cityArray.init(that)
    var cityInfo=that.data.cityInfo
    const provinces=[]
    const cities=[]
    const districts=[]
    for(var i=0;i<cityInfo.length;i++){
      provinces.push(cityInfo[i].name)
    }
    for(var i=0;i<cityInfo[0].sub.length;i++){
      cities.push(cityInfo[0].sub[i].name)
    }
    for(var i=0;i<cityInfo[0].sub[0].sub.length;i++){
      districts.push(cityInfo[0].sub[0].sub[i].name)
    }
    that.setData({
      'provinces':provinces,
      'cities':cities,
      'districts':districts
    })
    
    wx.getLocation({
      type:'wgs84',
      success: function(res){
        console.log(res)
        var longitude=res.longitude
        var latitude=res.latitude
        that.getCityInfo(longitude, latitude)
      }
    })

  },
  getCityInfo: function(longitude, latitude){
    var that = this
    let qqmapsdk = new QQMapWX({
      key: 'MFLBZ-P7XW2-DAWUS-CDLB6-D6KB6-CDBQV'
    })
    console.log(qqmapsdk)
    // reverseGeocoder 为 QQMapWX 解析 经纬度的方法
    qqmapsdk.reverseGeocoder({
      location: {latitude,longitude},
      success(res) {
        console.log(res)
        var curProvince = res.result.ad_info.province 
        var curCity     = res.result.ad_info.city
        var curDistrict = res.result.ad_info.district
        that.setData({
          province: curProvince,
          city: curCity,
          district: curDistrict
        })
        that.getWeatherInfo(curCity, function(data){
          that.setData({
            weatherInfo:data.HeWeather6[0].daily_forecast
          })       
        })
        that.getCurWeatherInfo(curCity, function(data){
          that.setData({
            curWeather: data.HeWeather6[0].now
          })          
        })
      }
    })
  },
  addCity: function(){
    var show = this.data.selectCityView
    if(show===true){
      this.setData({
        selectCityView:false
      })
    }else{
      this.setData({
        selectCityView: true
      })
    }
  },
  cancel:function(){
    this.setData({
      selectCityView: false
    })
  },
  getWeatherInfo: function(city,callback){
    console.log(city)
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/forecast?location=city&key=5a27e7497fb849729ced5631fe9260cd',
      success:function(res){
        console.log(res)
        callback(res.data)
      },
      fail:function(){
        console.log("fail")
      }      
    })
  },
  getCurWeatherInfo: function(city, callback){
    wx.request({
      url: "https://free-api.heweather.com/s6/weather/now?location=" + city + "&key=5a27e7497fb849729ced5631fe9260cd",
      success: function (res) {
        console.log(res)
        callback(res.data)
      }      
    })
  }
})
