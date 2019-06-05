import * as echarts from '../../ec-canvas/echarts';
var barec = null
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
     // path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: function (canvas, width, height) {
        barec = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barec);
        return barec;
      }
    }
  },

  onReady() {
    setTimeout(this.getData, 500);
  },
  //getData方法里发送ajax
  getData() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://localhost/echarts.php',
      herder: {
        "content-type": "json"
      },
      success: function (res) {
        console.log(res);
        var data = res.data[0];
        console.log(data);
        barec.setOption({
          grid: {
            left: '3%',
            right: '7%',
            bottom: '40%',
            containLabel: true
          },
          tooltip: {
            // trigger: 'axis',
            //showDelay: 0,
          },
          legend: {
            data: ['温度', '湿度'],
            left: 'center'
          },
          xAxis: [
            {
              data: res.data[0],
              "axisLabel": {
                show: true,
                interval: 0,
                rotate: 60
              }

            }
          ],
          yAxis: [
            {

            }
          ],
          series: [{
            name: '温度',
            //  symbolSize: 20,
            data: res.data[1],
            type: 'line',
          },
          {
            name: '湿度',
            //  symbolSize: 20,
            data: res.data[2],
            type: 'line',
            color: '#61a0a8'
          }
          ]
        })
        wx.hideLoading();
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
});
