<template>
  <div ref="chart" :style="{ width: '100%', height: '400px', 'min-width': '1000px' }" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'LineChart',
  props: {},
  data() {
    return {
      echartNames: [], // 项目名 ['namm', 'name1', 'name2']
      echartDataNames: [], // 项目底座数据 ['valueName', 'valueName1', 'valueName2']
      echartDataValues: [], // 项目底座数据的值 [ [1, 2, 3], [3, 3, 2],[6, 1, 9] ]
      totalText: '',
      mainText: '',
      totalnumber: 999
    }
  },

  async created() {
    console.log(this.props)
  },
  mounted() {
    this.initChart('', '')
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  methods: {
    onoption(initNames, initValueNames, initValues, initMainText) {
      const echartNames = initNames || this.echartNames
      const echartDataNames = initValueNames || this.echartDataNames
      const echartDataValues = initValues || this.echartDataValues
      const mainText = initMainText || this.mainText

      const colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
      // 动态设置，展示图
      const series = this.onseries(echartNames, echartDataValues, colorList)

      // 动态计算 dataZoom 的配置
      const dataZoomConfig = this.ondataZoomConfig(echartDataNames)
      this.option = {
        backgroundColor: '#fff',
        title: {
          text: mainText,
          textStyle: {
            fontSize: 20,
            fontWeight: 400
          },
          left: 'center',
          top: '5%'
        },
        legend: {
          icon: 'circle',
          top: '5%',
          right: '5%',
          itemWidth: 6,
          itemGap: 20,
          textStyle: {
            color: '#556677'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            label: {
              show: true,
              backgroundColor: '#fff',
              color: '#556677',
              borderColor: 'rgba(0,0,0,0)',
              shadowColor: 'rgba(0,0,0,0)',
              shadowOffsetY: 0
            },
            lineStyle: {
              width: 0
            }
          },
          backgroundColor: '#fff',
          textStyle: {
            color: '#5c6c7c'
          },
          padding: [10, 10],
          extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
        },
        grid: {
          top: '15%'
        },
        xAxis: [{
          type: 'category',
          data: echartDataNames,
          axisLine: {
            lineStyle: {
              color: '#DCE2E8'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#556677'
            },
            fontSize: 12,
            margin: 15
          },
          axisPointer: {
            label: {
              padding: [0, 0, 10, 0],
              margin: 15,
              fontSize: 12,
              backgroundColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#fff'
                }, {
                  offset: 0.86,
                  color: '#fff'
                }, {
                  offset: 0.86,
                  color: '#33c0cd'
                }, {
                  offset: 1,
                  color: '#33c0cd'
                }],
                global: false
              }
            }
          },
          boundaryGap: false
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#DCE2E8'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#556677'
            }
          },
          splitLine: {
            show: false
          }
        }, {
          type: 'value',
          position: 'right',
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#556677'
            },
            formatter: '{value}'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#DCE2E8'
            }
          },
          splitLine: {
            show: false
          }
        }],
        series,
        // 根据数据量决定是否启用 dataZoom
        dataZoom: dataZoomConfig
      }
    },
    onseries(echartNames, echartDataValues, colorList) {
      return echartNames.map((name, index) => ({
        name,
        type: 'line',
        data: echartDataValues[index],
        symbolSize: 1,
        symbol: 'circle',
        smooth: true,
        yAxisIndex: 0,
        showSymbol: false,
        lineStyle: {
          width: 5,
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            { offset: 0, color: '#9effff' },
            { offset: 1, color: colorList[index % colorList.length] }
          ]),
          shadowColor: 'rgba(158,135,255, 0.3)',
          shadowBlur: 10,
          shadowOffsetY: 20
        },
        itemStyle: {
          normal: {
            color: colorList[index % colorList.length],
            borderColor: colorList[index % colorList.length]
          }
        }
      }))
    },
    ondataZoomConfig(echartDataNames) {
      if (echartDataNames.length > 12) {
        return [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: 0,
            end: 100 * (9 / echartDataNames.length), // 根据数据长度动态设置展示范围为 9 条
            height: 10, // 滚动条的高度
            backgroundColor: '#F2F6FC', // 滚动条背景色
            dataBackground: { // 数据背景
              lineStyle: {
                color: '#dfe1e5'
              },
              areaStyle: {
                color: '#dfe1e5'
              }
            },
            fillerColor: 'rgba(90, 219, 255, 0.39)', // 被选中的区域背景色
            // borderColor: '#DCDFE6', // 滚动条边框颜色
            borderRadius: 8, // 设置边框圆角
            handleSize: '120%', // 手柄大小
            handleIcon: 'M512 0L1024 1024H0z', // 手柄图标的 SVG Path
            handleStyle: {
              color: 'rgba(71, 227, 255, 1)' // 手柄颜色
              // borderColor: '#aaa' // 手柄边框颜色
            },

            textStyle: {
              color: '#556677' // 滚动条上的文字颜色
            },
            bottom: 3 // 设置滚动条距离图表底部的距离（此值越大，滚动条越往下移动）
          },
          {
            type: 'inside',
            xAxisIndex: 0,
            start: 0,
            end: 100 * (9 / echartDataNames.length) // 根据数据长度动态设置展示范围为 9 条
          }
        ]
      } else {
        return []
      }
    },
    /**
     *
     * @param initNames 项目名[摸鱼, 划水, 一条龙]
     * @param initValueNames 项目时间[1.1, 1.2, 1.3]
     * @param initValues 项目时间的数量[999, 666, 111]
     * @param mainText 标题名
     */
    initChart(initNames, initValueNames, initValues, mainText) {
      this.onoption(initNames, initValueNames, initValues, mainText)
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.option)
    }
  }

}
</script>

<style scoped>
.aaa {
    min-width: none;
}

/* 添加样式以适应你的需求 */
</style>
