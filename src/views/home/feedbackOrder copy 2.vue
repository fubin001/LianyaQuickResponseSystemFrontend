<template>
    <div ref="chart" :style="{ width: '100%', height: '400px', 'min-width': '400px' }"></div>
</template>

<script>
import * as echarts from 'echarts';
// import axios from 'axios';
import { feedbackOrder } from '@/api/home'

export default {
    name: 'LineChart',
    data() {
        return {
            echartData:[
            {
                value: 3854,
                name: '完成的订单'
            },{
                value: 3515,
                name: '取消的订单'
            },{
                value: 2154,
                name: '正在生产的订单'
            }],
            totalText:"生产订单总数",
            totalnumber:999,
        };
    },


    async created() {
        feedbackOrder().then((res)=>{
            console.log(res);
            this.echartData=res.data
            
        }).finally(()=>{
            this.initChart()
        })
    },
    mounted() {
        this.initChart();
    },
    methods: {
        feedbackOrder,
        onoption() {
            var scale = 1;
            var echartData = this.echartData
            var totalText = this.totalText
            var rich = {
                yellow: {
                    // color: "#ffc72b", //每个饼块的数量，颜色
                    fontSize: 30 * scale,
                    padding: [5, 4],
                    align: 'center'
                },
                total: {
                    color: "#ffc72b", // 统计，字体的颜色
                    fontSize: 40 * scale,
                    align: 'center'
                },
                white: {
                    // color: "#fff", //每个饼块的名称，颜色
                    align: 'center',
                    fontSize: 14 * scale,
                    padding: [21, 0]
                },
                blue: {
                    // color: '#49dff0', //每个饼块的百分比，颜色
                    fontSize: 16 * scale,
                    align: 'center'
                },
                hr: {
                    // borderColor: '#0b5263', //每个饼块的连接条，颜色
                    width: '100%',
                    borderWidth: 1,
                    height: 0,
                }
            }
            this.option = {
                backgroundColor: '#031f2d',
                title: {
                    text: totalText,
                    left: 'center',
                    top: '53%',
                    padding: [24, 0],
                    textStyle: {
                        color: '#E6A23C',
                        fontSize: 18 * scale,
                        align: 'center'
                    }
                },
                legend: {
                    selectedMode: false,
                    formatter: function (name) {
                        var total = 0; //各科正确率总和
                        var averagePercent; //综合正确率
                        echartData.forEach(function (value, index, array) {
                            total += value.value;
                        });
                        return '{total|' + total + '}';
                    },
                    data: [echartData[0].name],
                    // data: ['高等教育学'],
                    // itemGap: 50,
                    left: 'center',
                    top: 'center',
                    icon: 'none',
                    align: 'center',
                    textStyle: {
                        color: "#fff",
                        fontSize: 16 * scale,
                        rich: rich
                    },
                },
                series: [{
                    name: '订单总量',
                    type: 'pie',
                    radius: ['40%', '50%'],
                    hoverAnimation: false,
                    color: ['#67C23A', '#909399', '#409EFF','#034079', '#6f81da', '#00ffb4'],
                    label: {
                        normal: {
                            formatter: function (params, ticket, callback) {
                                var total = 0; //考生总数量
                                var percent = 0; //考生占比
                                echartData.forEach(function (value, index, array) {
                                    total += value.value;
                                });
                                percent = ((params.value / total) * 100).toFixed(1);
                                return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
                            },
                            rich: rich
                        },
                    },
                    labelLine: {
                        normal: {
                            length: 55 * scale,
                            length2: 0,
                            lineStyle: {
                                color: '#0b5263'
                            }
                        }
                    },
                    data: echartData
                }]
            };
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