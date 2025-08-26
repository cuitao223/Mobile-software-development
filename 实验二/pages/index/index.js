Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: ['北京市', '北京市', '东城区'],
    now: {
      cloud: 0,
      icon: 100,
      cond_txt: '晴',
      fl: 16,
      hum: 25,
      pcpn: 0.0,
      pressure: 1021,
      temp: 20,
      vis: 29,
      wind_deg: 270,
      windDir: '西风',
      windScale: 3,
      windSpeed: 16,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 引入工具类
    this.util = require('../../utils/util.js'); 
    this.getWeather();
  },

  getWeather: function() {
    var that = this;
    // 获取当前选择的地区名称（取城市级别）
    const locationName = this.data.region[1]; // 使用市名来获取ID
    // 调用util.js中的方法获取Location ID
    const locationId = this.util.getLocationID(locationName);
    
    wx.request({
      url: 'https://nj5u9vgy9e.re.qweatherapi.com/v7/weather/now?',
      data: {
        location: locationId, // 使用从util获取的ID
        key: '2e3fce29b5fd4cf3b43d09bb86ac0750'
      },
      success: function(res) {
        console.log('天气数据:', res)
        if (res.data.now) {
          that.setData({
            now: res.data.now
          })
        }
      },
      fail: function(err) {
        console.error('获取天气失败:', err)
      }
    })
  },

  /**
   * 地区选择变化事件
   */
  regionChange: function(e) {
    this.setData({
      region: e.detail.value
    });
    this.getWeather(); // 地区变化后重新获取天气
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getWeather();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
    