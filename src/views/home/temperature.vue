<template>
  <div ref="chart" :style="{ width: '100%', height: '300px', 'min-width': '700px' }"></div>
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
      var weatherName = ["小雨", "小雨", "阴", "小雨", "多云", "小雨", "小雨"];
      this.option = {
        grid: {
          show: true,
          backgroundColor: 'transparent',
          opacity: 0.3,
          borderWidth: '0',
          top: '180',
          bottom: '0'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: false
        },
        dataZoom: [
          {
            type: 'inside',
            show: true,
            xAxisIndex: [0, 1, 2],
            start: 0,
            end: 60,
            filterMode: 'empty'
          }
        ],
        xAxis: [
          // 日期
          {
            type: 'category',
            boundaryGap: false,
            position: 'top',
            offset: 130,
            zlevel: 100,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              formatter: [
                '{a|{value}}'
              ].join('\n'),
              rich: {
                a: {
                  // color: 'white',
                  fontSize: 18
                }
              }
            },
            nameTextStyle: {

            },
            data: ["25日", "26日", "27日", "28日", "29日", "30日", "31日"]
          },
          // 星期
          {
            type: 'category',
            boundaryGap: false,
            position: 'top',
            offset: 110,
            zlevel: 100,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              formatter: [
                '{a|{value}}'
              ].join('\n'),
              rich: {
                a: {
                  // color: 'white',
                  fontSize: 14
                }
              }
            },
            nameTextStyle: {
              fontWeight: 'bold',
              fontSize: 19
            },
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          },
          // 天气图标
          {
            type: 'category',
            boundaryGap: false,
            position: 'top',
            offset: 20,
            zlevel: 100,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              formatter: function (value, index) {
                //return '{' + index + '| }\n{b|' + value + '}'
                return '{' + value + '| }\n{b|' + weatherName[value] + '}'
              },
              rich: {
                0: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[0]] + '.png')
                    image: 'https://d.scggqx.com/forecast/img/小雨.png'
                  },
                  height: 40,
                  width: 40
                },
                1: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[1]] + '.png')
                    image: 'https://d.scggqx.com/forecast/img/小雨.png'
                  },
                  height: 40,
                  width: 40
                },
                2: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[2]] + '.png')
                    image: 'https://d.scggqx.com/forecast/img/阴.png'
                  },
                  height: 40,
                  width: 40
                },
                3: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[3]] + '.png')
                    image: 'https://d.scggqx.com/forecast/img/小雨.png'
                  },
                  height: 40,
                  width: 40
                },
                4: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[4]] + '.png')
                    image: 'https://d.scggqx.com/forecast/img/多云.png'
                  },
                  height: 40,
                  width: 40
                },
                5: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[5]] + '.png')
                    image: 'https://d.scggqx.com/forecast/img/小雨.png'
                  },
                  height: 40,
                  width: 40
                },
                6: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[6]] + '.png')
                    image: 'https://d.scggqx.com/forecast/img/小雨.png'
                  },
                  height: 40,
                  width: 40
                },
                b: {
                  // color: 'white',
                  fontSize: 12,
                  lineHeight: 30,
                  height: 20
                }
              }
            },
            nameTextStyle: {
              fontWeight: 'bold',
              fontSize: 19
            },
            // data: this.weatherdata.weather
            //data: ["小雨","小雨","阴","小雨","多云","小雨","小雨"]
            data: [0, 1, 2, 3, 4, 5, 6]
          }
        ],
        yAxis: {
          type: 'value',
          show: false,
          axisLabel: {
            formatter: '{value} °C',
            color: 'white'
          }
        },
        series: [
          {
            name: '最高气温',
            type: 'line',
            data: ["16.3", "16.2", "17.6", "14.2", "17.6", "15.7", "14.3"],
            symbol: 'emptyCircle',
            symbolSize: 10,
            showSymbol: true,
            smooth: true,
            itemStyle: {
              normal: {
                color: '#C95843'
              }
            },
            label: {
              show: true,
              position: 'top',
              // color: 'white',
              formatter: '{c} °C'
            },
            lineStyle: {
              width: 1,
              // color: 'white'
            },
            areaStyle: {
              opacity: 1,
              color: 'transparent'
            }
          },
          {
            name: '最低气温',
            type: 'line',
            data: ["13.4", "12.8", "13.5", "12.5", "12.4", "13.2", "13"],
            symbol: 'emptyCircle',
            symbolSize: 10,
            showSymbol: true,
            smooth: true,
            itemStyle: {
              normal: {
                color: 'blue'
              }
            },
            label: {
              show: true,
              position: 'bottom',
              // color: 'white',
              formatter: '{c} °C'
            },
            lineStyle: {
              width: 1,
              // color: 'white'
            },
            areaStyle: {
              opacity: 1,
              color: 'transparent'
            }
          }
        ]
      }

      // this.option = {
      //   backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //     { offset: 0, color: '#c86589' },
      //     { offset: 1, color: '#06a7ff' }
      //   ], false),
      //   title: {
      //     text: "温度℃",
      //     left: "center",
      //     bottom: "5%",
      //     textStyle: {
      //       color: "#fff",
      //       fontSize: 16
      //     }
      //   },
      //   grid: {
      //     top: '20%',
      //     left: '10%',
      //     right: '10%',
      //     bottom: '15%',
      //     containLabel: true
      //   },
      //   xAxis: {
      //     type: 'category',
      //     boundaryGap: false,
      //     data: this.weatherTime,
      //     axisLabel: {
      //       margin: 30,
      //       color: '#ffffff63'
      //     },
      //     axisLine: { show: false },
      //     axisTick: {
      //       show: true,
      //       length: 25,
      //       lineStyle: { color: "#ffffff1f" }
      //     },
      //     splitLine: {
      //       show: true,
      //       lineStyle: { color: '#ffffff1f' }
      //     }
      //   },
      //   yAxis: [{
      //     type: 'value',
      //     position: 'right',
      //     axisLabel: {
      //       margin: 20,
      //       color: '#ffffff63'
      //     },
      //     axisTick: {
      //       show: true,
      //       length: 15,
      //       lineStyle: { color: "#ffffff1f" }
      //     },
      //     splitLine: {
      //       show: true,
      //       lineStyle: { color: '#ffffff1f' }
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: '#fff',
      //         width: 2
      //       }
      //     }
      //   }],
      //   series: [{
      //     name: '注册总量',
      //     type: 'line',
      //     smooth: true,
      //     showAllSymbol: true,
      //     symbol: 'circle',
      //     symbolSize: 6,
      //     lineStyle: {
      //       normal: { color: "#fff" }
      //     },
      //     label: {
      //       show: true,
      //       position: 'top',
      //       textStyle: { color: '#fff' }
      //     },
      //     itemStyle: {
      //       color: "red",
      //       borderColor: "#fff",
      //       borderWidth: 3
      //     },
      //     tooltip: { show: false },
      //     areaStyle: {
      //       normal: {
      //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //           { offset: 0, color: '#eb64fb' },
      //           { offset: 1, color: '#3fbbff0d' }
      //         ], false)
      //       }
      //     },
      //     data: this.temperature
      //   }]
      // }
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
.aaa {
  min-width: none;
}

/* 添加样式以适应你的需求 */
</style>