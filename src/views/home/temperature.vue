<template>
      <div ref="chart" :style="{ width: '100%', height: '300px','min-width' :'500px' }"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import axios from 'axios';
  
  export default {
    name: 'LineChart',
    data() {
      return {
        chart: null,
        // 时间
        weatherTime: [],
        // 温度
        temperature: [],
        option: {},
        openweathermap: {},
      };
    },
  
  
    async created() {
      await axios('https://api.openweathermap.org/data/2.5/forecast?q=hefei&appid=29ce1c9da84c9e2bade5556ff6e63acb&lang=zh_cn').then((res) => {
        this.weatherTime = []
        this.temperature = []
        this.openweathermap = res.data.list
        for (const [index, item] of res.data.list.entries()) {
          this.weatherTime.push(item.dt_txt.substring(11, 13))
          this.temperature.push((item.main.temp - 273.15).toFixed(2))
          if (index > 7) {
            break; // 中断循环
          }
        }
        console.log(this.weatherTime);
  
  
      }).finally(() => {
        this.initChart()
      })
    },
    mounted() {
      this.initChart();
    },
    methods: {
      onoption() {
        this.option = {
          backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#c86589' },
            { offset: 1, color: '#06a7ff' }
          ], false),
          title: {
            text: "温度℃",
            left: "center",
            bottom: "5%",
            textStyle: {
              color: "#fff",
              fontSize: 16
            }
          },
          grid: {
            top: '20%',
            left: '10%',
            right: '10%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.weatherTime,
            axisLabel: {
              margin: 30,
              color: '#ffffff63'
            },
            axisLine: { show: false },
            axisTick: {
              show: true,
              length: 25,
              lineStyle: { color: "#ffffff1f" }
            },
            splitLine: {
              show: true,
              lineStyle: { color: '#ffffff1f' }
            }
          },
          yAxis: [{
            type: 'value',
            position: 'right',
            axisLabel: {
              margin: 20,
              color: '#ffffff63'
            },
            axisTick: {
              show: true,
              length: 15,
              lineStyle: { color: "#ffffff1f" }
            },
            splitLine: {
              show: true,
              lineStyle: { color: '#ffffff1f' }
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
                width: 2
              }
            }
          }],
          series: [{
            name: '注册总量',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: { color: "#fff" }
            },
            label: {
              show: true,
              position: 'top',
              textStyle: { color: '#fff' }
            },
            itemStyle: {
              color: "red",
              borderColor: "#fff",
              borderWidth: 3
            },
            tooltip: { show: false },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#eb64fb' },
                  { offset: 1, color: '#3fbbff0d' }
                ], false)
              }
            },
            data: this.temperature
          }]
        }
      },
      // 初始化图，用于展示
      initChart() {
        this.onoption();
        this.chart = echarts.init(this.$refs.chart);
        this.chart.setOption(this.option);
      }
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  };
  </script>
  
  <style scoped>
  .aaa{
    min-width: none;
  }
  /* 添加样式以适应你的需求 */
  </style>
  