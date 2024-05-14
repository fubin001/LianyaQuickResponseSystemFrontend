<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'

export default {
  name: 'SaleLineChart',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    },
    title: {
      type: String,
      default: '数量'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(xs, series) {
      const legendData = []
      for (let i = 0; i < series.length; i++) {
        legendData.push(series[i]['name'])
      }

      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        backgroundColor: 'white',
        title: {
          top: 20,
          text: this.$props.title,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: 'black'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: 'black'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: legendData,
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: 'black'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: xs
        }],
        yAxis: [{
          type: 'value',
          name: '',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: series
      })
    }
  }
}
</script>
