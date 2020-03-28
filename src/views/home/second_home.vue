<template>
  <!-- 二级路由的默认组件 -->
  <div class="second-home">
    <!-- 幻灯片 -->
    <el-carousel :interval="4000" type="card" height="250px">
      <el-carousel-item v-for="item in list" :key="item">
        <img :src="item" alt />
      </el-carousel-item>
    </el-carousel>
    <el-row type="flex" justify="space-around">
      <div ref="myChart" class="echarts"></div>
      <div ref="myChart2" class="echarts"></div>
    </el-row>
  </div>
</template>

<script>
// 引入图表样式
import Echarts from 'echarts'
export default {
  mounted () {
    // 进行echarts图表的实例化
    this.myChart = Echarts.init(this.$refs.myChart) // 得到一个图表的实例化对象
    this.myChart2 = Echarts.init(this.$refs.myChart2) // 得到一个图表的实例化对象

    // this.myChart就是图表对象
    this.myChart.setOption({
      title: {
        text: '南丁格尔玫瑰图',
        subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        top: 'bottom',
        data: [
          'rose1',
          'rose2',
          'rose3',
          'rose4',
          'rose5',
          'rose6',
          'rose7',
          'rose8'
        ]
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['pie', 'funnel']
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: '半径模式',
          type: 'pie',
          radius: [20, 110],
          center: ['25%', '50%'],
          roseType: 'radius',
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true
            }
          },
          data: [
            { value: 10, name: 'rose1' },
            { value: 5, name: 'rose2' },
            { value: 15, name: 'rose3' },
            { value: 25, name: 'rose4' },
            { value: 20, name: 'rose5' },
            { value: 35, name: 'rose6' },
            { value: 30, name: 'rose7' },
            { value: 40, name: 'rose8' }
          ]
        },
        {
          name: '面积模式',
          type: 'pie',
          radius: [30, 110],
          center: ['75%', '50%'],
          roseType: 'area',
          data: [
            { value: 10, name: 'rose1' },
            { value: 5, name: 'rose2' },
            { value: 15, name: 'rose3' },
            { value: 25, name: 'rose4' },
            { value: 20, name: 'rose5' },
            { value: 35, name: 'rose6' },
            { value: 30, name: 'rose7' },
            { value: 40, name: 'rose8' }
          ]
        }
      ]
    })
    this.myChart2.setOption({
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
      }]
    })
  },
  data () {
    return {
      list: [
        'http://img.netbian.com/file/2019/0220/52ea84369dd40268d595766c76fda7f3.jpg',
        'http://img.netbian.com/file/2020/0101/ed53728a0593fca90d434019c9b9be23.jpg',
        'http://img0.imgtn.bdimg.com/it/u=3638437088,2703654524&fm=26&gp=0.jpg',
        'http://img4.imgtn.bdimg.com/it/u=2096603689,1889806653&fm=26&gp=0.jpg',
        'http://img0.imgtn.bdimg.com/it/u=3956287167,4089297313&fm=26&gp=0.jpg',
        'http://img5.imgtn.bdimg.com/it/u=1617632401,88084066&fm=15&gp=0.jpg',
        'http://img3.imgtn.bdimg.com/it/u=2626933181,578186626&fm=26&gp=0.jpg'
      ]
    }
  }
}
</script>

<style lang="less">
.second-home {
  /* calc是计算的意思 可在css中计算数值  用法calc（四则运算） 变量之间和运算符之间一定要有空格*/
  height: calc(100vh - 60px);
  background-size: cover;
  background-image: url(https://pic.qqtn.com/up/2019-5/15579893934255491.jpg);
  img {
    width: 100%;
    height: 100%;
  }
  .echarts {
    width: 550px;
    height: 400px;
    background-image: linear-gradient(to  top, #95d6ff, #6e956e);
    // background: radial-gradient(#ffffff,#1c82d4);
    // background: repeating-linear-gradient(#1c82d4, #fff 30%, #1c82d4 35%);
    // background: repeating-radial-gradient(#1c82d4, #fff 30%, #1c82d4 35%);

    // background: -moz-linear-gradient(top, #66b7f9,#1c82d4);
    // /* Safari 4-5, Chrome 1-9 */
    // background: -webkit-gradient(linear,top,from(#66b7f9),to(#1c82d4));
    // /* Safari 5.1+, Chrome 10+ */
    // background: -webkit-linear-gradient(top, #66b7f9, #1c82d4);
    // /* Opera 11.10+ */
    // background: -o-linear-gradient(top, #66b7f9, #1c82d4);
    // /* default */
    // background: linear-gradient(top, #66b7f9, #1c82d4);
    // background-color: #1c82d4;
  }
}
</style>
