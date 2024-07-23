<template>
  <div ref="chart" :style="{ width: '100%', height: '300px', 'min-width': '700px' }"></div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';
export default {
  props:{
    propData:{},
  },
  name: 'LineChart',
  data() {
    return {
      chart: null,
      // 时间
      weatherTime: ["25日", "26日", "27日", "28日", "29日", "30日", "31日","1ri"],
      // 温度
      temperatureMax: ["16.3", "16.2", "17.6", "14.2", "17.6", "15.7", "14.3", "14.3"],
      temperatureMin: ["13.4", "12.8", "13.5", "12.5", "12.4", "13.2", "13", "14.3"],
      //天气
      weatherName: ["小雨", "小雨", "阴", "小雨", "多云", "小雨", "小雨", "小雨"],
      weatherNamez: ["小雨", "小雨", "阴", "小雨", "多云", "小雨", "小雨", "小雨"],
      option: {},
      openweathermap: {},
    };
  },


  async created() {
    if(this.propData.data){
      var data = this.propData.data
      this.weatherTime=[];
      this.temperatureMax=[];
      this.temperatureMin=[];
      this.weatherName=[];
      data.forEach(item => {
        // console.log(item.predictDate.substri/ng(6,10));
        this.weatherTime.push(item.predictDate.substring(6,10))
        this.temperatureMax.push(item.tempDay)
        this.temperatureMin.push(item.tempNight)
        this.weatherName.push(item.conditionDay)
        this.weatherNamez.push(item.conditionNight)
      });
    }
  },
  mounted() {
    console.log(this.propData);
    this.initChart();
  },
  methods: {
    onoption() {
      var weatherTime = this.weatherTime
      var weatherName = this.weatherName
      var temperatureMax = this.temperatureMax
      var temperatureMin = this.temperatureMin
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
            // xAxisIndex: [0, 1, 2],
            xAxisIndex: [0, 1],
            start: 0,
            end: 140,
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
            data: weatherTime
          },
          // 星期
          // {
          //   type: 'category',
          //   boundaryGap: false,
          //   position: 'top',
          //   offset: 110,
          //   zlevel: 100,
          //   axisLine: {
          //     show: false
          //   },
          //   axisTick: {
          //     show: false
          //   },
          //   axisLabel: {
          //     interval: 0,
          //     formatter: [
          //       '{a|{value}}'
          //     ].join('\n'),
          //     rich: {
          //       a: {
          //         // color: 'white',
          //         fontSize: 14
          //       }
          //     }
          //   },
          //   nameTextStyle: {
          //     fontWeight: 'bold',
          //     fontSize: 19
          //   },
          //   data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          // },
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
            data: [0, 1, 2, 3, 4, 5, 6, 7]
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
            data: temperatureMax,
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
            data: temperatureMin,
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