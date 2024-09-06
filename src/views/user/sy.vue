<template>
  <div ref="chart" class="customs" :style="{'width': '100%', height: '300px'}" />

</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineChart',
  props: {
    propData: {}
  },
  data() {
    return {
      chart: null,
      // 时间
      weatherTime: ['25日', '26日', '27日', '28日', '29日', '30日', '31日', '1ri'],
      // 温度
      temperatureMax: ['16.3', '16.2', '17.6', '14.2', '17.6', '15.7', '14.3', '14.3'],
      temperatureMin: ['13.4', '12.8', '13.5', '12.5', '12.4', '13.2', '13', '14.3'],
      // 天气
      weatherName: ['小雨', '小雨', '阴', '小雨', '多云', '小雨', '小雨', '小雨'],
      weatherNamez: ['小雨', '小雨', '阴', '小雨', '多云', '小雨', '小雨', '小雨'],
      // 图标展示
      weatherImpage: [],
      option: {},
      openweathermap: {}
    }
  },

  async created() {
    if (this.propData.data) {
      var data = this.propData.data
      this.weatherTime = []
      this.temperatureMax = []
      this.temperatureMin = []
      this.weatherName = []
      this.weatherImpage = []
      data.forEach(item => {
        // console.log(item.predictDate.substri/ng(6,10));
        this.weatherTime.push(item.predictDate.substring(6, 10))
        this.temperatureMax.push(item.tempDay)
        this.temperatureMin.push(item.tempNight)
        this.weatherName.push(item.conditionDay)
        this.weatherNamez.push(item.conditionNight)
        console.log(item.conditionDay.indexOf('晴'), item.conditionDay)
        if (item.conditionDay.indexOf('晴') > -1) { this.weatherImpage.push(1) } else if (item.conditionDay.indexOf('雨') > -1) { this.weatherImpage.push(5) } else if (item.conditionDay.indexOf('雷') > -1) { this.weatherImpage.push(3) } else if (item.conditionDay.indexOf('阴') > -1) { this.weatherImpage.push(4) } else if (item.conditionDay.indexOf('云') > -1) { this.weatherImpage.push(2) } else if (item.conditionDay.indexOf('雪') > -1) { this.weatherImpage.push(6) } else { this.weatherImpage.push(9) }
      })
      console.log(this.weatherImpage)
    }
  },
  mounted() {
    console.log(this.propData)
    this.initChart()
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  methods: {
    onoption() {
      var weatherTime = this.weatherTime
      var weatherName = this.weatherName
      console.log(weatherName)
      var temperatureMax = this.temperatureMax
      var temperatureMin = this.temperatureMin
      var weatherImpage = this.weatherImpage
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
              formatter: function(value, index) {
                // return '{' + index + '| }\n{b|' + value + '}'
                return '{' + value + '| }\n{b|' + weatherName[index] + '}'
              },
              rich: {
                0: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[0]] + '.png')
                    image: 'https://icons.qweather.com/assets/icons/102.svg'
                  },
                  height: 40,
                  width: 40
                },
                1: { // 晴天
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[1]] + '.png')
                    image: 'https://icons.qweather.com/assets/icons/100.svg'
                  },
                  height: 40,
                  width: 40
                },
                2: { // 多云
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[2]] + '.png')
                    image: 'https://icons.qweather.com/assets/icons/104.svg'
                  },
                  height: 40,
                  width: 40
                },
                3: { // 雷雨
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[3]] + '.png')
                    image: 'https://icons.qweather.com/assets/icons/302.svg'
                  },
                  height: 40,
                  width: 40
                },
                4: { // 阴天
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[4]] + '.png')
                    image: 'https://icons.qweather.com/assets/icons/501.svg'
                  },
                  height: 40,
                  width: 40
                },
                5: { // 雨天
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[5]] + '.png')
                    image: 'https://icons.qweather.com/assets/icons/306.svg'
                  },
                  height: 40,
                  width: 40
                },
                6: { // 雪天
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[6]] + '.png')
                    image: 'https://icons.qweather.com/assets/icons/403.svg'
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
            // data: ["小雨","小雨","阴","小雨","多云","小雨","小雨"]
            data: weatherImpage
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
              width: 1
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
              width: 1
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
      this.onoption()
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.option)
    }
  }
}
</script>

