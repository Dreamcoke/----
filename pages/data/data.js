Page({
  data: {
   
  },
  onLoad: function () {
    var that=this
    wx.request({
      url: 'https://localhost/data.php',
      headers: {
        'Content-Type': 'application/json'
      },
      success:function(e)
      {
        that.setData({
          list: e.data
        })
       // console.log(e.data)
      }
    })
  }

})
