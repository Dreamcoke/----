//logs.js
//const util = require('../../utils/util.js')
const app=getApp()
Page({
  data: {
    id:'',
    name:'',
  },
  onLoad: function (option) {
   // console.log(option)
   var that=this
    var json=JSON.parse(option.namelist)
     app.id=json[0].id
    //console.log(json)
   that.setData(
     {
       list:json
     }
   )
  },
  bindKeyInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  

  },
  formSubmit:function(e){
    //console.log(e.currentTarget.item.id)
    wx.request({
      url: 'https://localhost/insert_name.php',
      method: "GET",
      data:{
        id: app.id,
        name:e.detail.value.name
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //wx.redirectTo({ url: '/pages/insert/insert' })
        console.log(res);// 服务器回包信息
        
        wx.redirectTo({
          url: '/pages/insert/insert'
        }),
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  
  }
})
