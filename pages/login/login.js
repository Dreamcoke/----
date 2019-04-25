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
        wx.redirectTo({ url: '/pages/insert/insert' }) 
        console.log(res.data);// 服务器回包信息

      }
    })
  },
 
})