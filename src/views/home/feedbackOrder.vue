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
            echartData: [
                {
                    value: 3854,
                    name: '完成的订单'
                }, {
                    value: 3515,
                    name: '取消的订单'
                }, {
                    value: 2154,
                    name: '正在生产的订单'
                }],
            totalText: "生产订单总数",
            totalnumber: 999,
        };
    },


    async created() {
        feedbackOrder().then((res) => {
            console.log(res);
            this.echartData = res.data

        }).finally(() => {
            this.initChart()
        })
    },
    mounted() {
        this.initChart();
    },
    methods: {
        feedbackOrder,
        onoption() {
            let bgColor = '#fff';
            let title = this.totalText;
            let color =['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'];
            var echartData = this.echartData
            let formatNumber = function (num) {
                let reg = /(?=(\B)(\d{3})+$)/g;
                return num.toString().replace(reg, ',');
            }
            let total = echartData.reduce((a, b) => {
                return a + b.value * 1
            }, 0);

            var scale = 1;
            var totalText = this.totalText

            this.option = {
                backgroundColor: bgColor,
                color: color,
                // tooltip: {
                //     trigger: 'item'
                // },
                title: [{
                    text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
                    top: 'center',
                    left: 'center',
                    textStyle: {
                        rich: {
                            name: {
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#666666',
                                padding: [10, 0]
                            },
                            val: {
                                fontSize: 32,
                                fontWeight: 'bold',
                                color: '#333333',
                            }
                        }
                    }
                }, {
                    text: '生产订单',
                    top: 20,
                    left: 20,
                    textStyle: {
                        fontSize: 30,
                        color: '#666666',
                        fontWeight: 400
                    }
                }],
                series: [{
                    type: 'pie',
                    radius: ['49%', '60%'],
                    center: ['50%', '50%'],
                    data: echartData,
                    hoverAnimation: false,
                    itemStyle: {
                        normal: {
                            borderColor: bgColor,
                            borderWidth: 2
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 20,
                            length2: 120,
                            lineStyle: {
                                color: '#e6e6e6'
                            }
                        }
                    },
                    label: {
                        normal: {
                            formatter: params => {
                                return (
                                    '{icon|●}{name|' + params.name + '}{value|' +
                                    formatNumber(params.value) + '}'
                                );
                            },
                            padding: [0, -100, 25, -100],
                            rich: {
                                icon: {
                                    fontSize: 16
                                },
                                name: {
                                    fontSize: 14,
                                    padding: [0, 10, 0, 4],
                                    color: '#666666'
                                },
                                value: {
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: '#333333'
                                }
                            }
                        }
                    },
                }]
            };
        },
        // 初始化图，用于展示
        initChart() {
            this.onoption();
            this.chart = echarts.init(this.$refs.chart);
            this.chart.setOption(this.option);
            
        // 监听点击事件
        this.chart.on('click', this.handleChartClick);
        },
        handleChartClick(params) {
            this.$router.push({ path: 'skuProduct/feedback' })
        // 这里处理点击事件
        // 比如跳转到另一个页面或者执行其他逻辑
        // if (params.name === '完成的订单') {
        //     this.$router.push({ path: 'skuProduct/feedback' })
        // } else if (params.name === '取消的订单') {
        //     this.$router.push({ path: 'skuProduct/feedback' })
        // } else if (params.name === '生产订单') {
        //     this.$router.push({ path: 'skuProduct/feedback' })
        // }
    },
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