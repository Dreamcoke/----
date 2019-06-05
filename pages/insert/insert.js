//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    state: '关闭'
    
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://localhost/tem_hum.php',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (e) {
        that.setData({
          tem: e.data.temperature,
          hum:e.data.humidity
        })
        console.log(e.data)
        // console.log(e.data)
      }
    })
  },
  echarts:function(){
      wx.navigateTo({
        url: '/pages/line/index',
      })
  },
  check_history:function(){
    wx.navigateTo({
      url: '/pages/data/data',
    })
  },
  check_identity: function (e) {
    var that = this
     wx.request({
       url: 'https://localhost/check.php',
       method: 'GET',
       data: {
           
       },

       header: {
         'content-type': 'application/json'
       },
       success: function (res) {
         
          if(res.data)
          {
            //console.log(res.data),
            wx.navigateTo({ url: '/pages/logs/logs?namelist='+JSON.stringify(res.data)}) 
          }
          else
          {
            wx.showModal({
              title: '提示',
              content: '暂无身份信息可录入',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
       }
     })
  },
  close_lock:function(){
    wx.showModal({
      title: '提示',
      content: '确定要开锁吗',
      success(res) {
        if (res.confirm) {
          console.log('开锁')
          wx.request({
            url: 'https://localhost/close.php',
            method: 'GET',
            data: {
              flag: 'close'
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
             // console.log(res.data)
            }
          })
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
   
     
  },
  switchChange: function (e) {
    //console.log(e.detail.value)
    if (e.detail.value) {
      this.setData({ state: '打开' })
      console.log("开灯")
      wx.request({
        url: 'https://localhost/light.php?state1=open',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //console.log(res.data)
        }
      })
    }
    else
    {
      this.setData({ state: '关闭' })
      console.log("关灯")
      wx.request({
        url: 'https://localhost/light.php?state1=close',
        method: 'GET',
        data: {

        },

        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //console.log(res.data)
        }
      })
    }
     
    
  }

})
