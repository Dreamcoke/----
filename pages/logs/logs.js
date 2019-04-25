//logs.js
//const util = require('../../utils/util.js')

Page({
  data: {
    id:'',
    name:'',
  },
  onLoad: function (option) {
   this.setData(
     {
       id:option.id
     }
   )
  }
})
