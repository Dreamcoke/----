// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: { loading: false },
  formSubmit: function (e) {
    wx.request({
      url: 'https://localhost/test.php',
      method: 'GET',
      data:{
        username:e.detail.value.no,
        password:e.detail.value.pwd
      },
      
      header:{
          'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data=='有此用户')
          wx.redirectTo({ url: '/pages/insert/insert' }) 
        else{
          wx.showModal({
            title: '提示',
            content: '账号或密码错误',
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
 
})