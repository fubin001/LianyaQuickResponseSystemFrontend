<template>
  <div style="width: 100%; background-color: #f7f8fc">
    <el-row :gutter="12" style="width: 100%;min-width: 1000px;">
      <el-col :span="9">
        <el-row :gutter="12" size="mini">
          <el-col size="mini" :span="12">
            <el-card shadow="always" class="adaptive-text-card">
              <span class="small-text-card-name">货号:</span>
              <span class="small-text-card-value"> {{ this.skuProduct.skuId }}</span>
            </el-card>
          </el-col>
          <el-col size="mini" :span="12">
            <el-card shadow="always" class="adaptive-text-card">
              <span class="small-text-card-name">货号商品名:</span>
              <span class="small-text-card-value"> {{ this.skuProduct.fullName }}</span>
            </el-card>
          </el-col>
          <el-col size="mini" :span="12">
            <el-card shadow="always" class="adaptive-text-card">
              <span class="small-text-card-name">策略模型:</span>
              <span class="small-text-card-value"> {{ this.skuProduct.predictModel }}</span>
            </el-card>
          </el-col>
          <el-col size="mini" :span="12">
            <el-card shadow="always" class="adaptive-text-card">
              <span class="small-text-card-name">快反周期:</span>
              <span class="small-text-card-value"> {{ this.skuProduct.feedbackDay }}天</span>
            </el-card>
          </el-col>
          <el-col size="mini" :span="12">
            <el-card shadow="always" class="adaptive-text-card">
              <span class="small-text-card-name">上市时间:</span>
              <span class="small-text-card-value"> {{ this.skuProduct.listingDate }}</span>
            </el-card>
          </el-col>
          <el-col size="mini" :span="12">
            <el-card shadow="always" class="adaptive-text-card">
              <span class="small-text-card-name">款式:</span>
              <span class="small-text-card-value"> {{ this.skuProduct.styleId }}</span>
            </el-card>
          </el-col>
          <el-col size="mini" :span="12">
            <el-card shadow="always" class="adaptive-text-card">
              <span class="small-text-card-name">参考SKU:</span>
              <span class="small-text-card-value">{{ skuProduct.likeSku ? skuProduct.likeSku : "无" }}</span>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12" size="mini">
          <el-col v-for="item in metrics" :key="item.metricName" size="mini" :span="12">
            <el-card shadow="always" class="adaptive-text-card">
              <span class="small-text-card-name">{{ item.metricName+": " }}</span>
              <span class="small-text-card-value">{{ item.metricValue }}</span>
            </el-card>
          </el-col>
        </el-row>
        <el-divider><i class="el-icon-mobile-phone" /></el-divider>
        <el-tag type="success">数据面板</el-tag>
        <span style="float: right">
          <el-button size="mini" class="filter-item" type="primary" icon="el-icon-search" :loading="refreshLoading" style=" width: 100px;  margin: 5px 8px 5px 0;  background-color: #244496;" @click="refreshSkuRelatedData">
            刷新数据
          </el-button>
        </span>
        <el-table ref="dragTable" :key="key" v-loading="listLoading" :cell-style="{padding:'0px'}" :data="list" style="width:100%" height="250">
          <el-table-column align="left" label="月-周" prop="date" width="70">
            <template slot-scope="{ row }">
              {{ row.month + "-W" + row.week }}
            </template>
          </el-table-column>
          <el-table-column align="left" label="日期" prop="date" width="100" />
          <el-table-column align="left" label="实际销售" prop="actualData" width="80px">
            <template slot-scope="{ row }">
              <span>
                {{ row.quantity }}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="采购数量" prop="buyOrderQuantity" width="80px">
            <template slot-scope="{ row }">
              <span>
                {{ row.buyOrderQuantity }}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="预估销售" prop="predictQuantity" width="80px" />
          <el-table-column align="left" label="库存数量" prop="storageQuantity" width="80px" />
          <el-table-column align="left" label="周系数" prop="weekCoefficient" width="75px">
            <template slot-scope="{ row }">
              <el-input
                v-model="row.weekCoefficient"
                placeholder="周系数"
                @change="weekCoefficientChange(row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <Chart ref="functionProps" style="height: 43vh;" />
        <Chart ref="functionProps2" style="height: 43vh;" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getBrandEnum } from '@/api/enum'
import {
  batchUpdateSaleData,
  weekCoefficientChange,
  querySkuProductSaleDate,
  syncCalculateBySalePlanById
} from '@/api/saleData'
import Chart from '@/views/product/component/chart.vue'
import { refreshRelatedData } from '@/api/skuProduct'
export default {
  name: '',
  components: { Chart },
  data() {
    return {
      currentShow: 4,
      timeUint: 0,
      fittingSalePlanId: null,
      dialogStatus: 'create',
      dialogFormVisible: false,
      page: 1,
      size: 10,
      list: null,
      total: null,
      listLoading: false,
      refreshLoading: false,
      listQuery: {
        page: 1,
        size: 10
      },
      metrics: {},
      key: 1,
      titleMap: {
        create: '新增销售计划',
        update: '编辑销售计划'
      },
      porpsValue1: '',
      porpsValue2: '',
      sortable: null,
      salePlan: null,
      temp: {},
      brands: [],
      editRowDate: null,
      salePlanForm: {},
      salePlanId: null,
      skuProduct: {}
    }
  },
  created() {
    this.editRowDate = null
    this.getBrands()
    // console.log(this.$route)
    this.salePlanId = this.$route.query.salePlanId
    if (this.$route.query.salePlanId) {
      this.listQuery.salePlanId = this.$route.query.salePlanId
      this.getList()
    }
  },
  mounted() {
    // console.log(this.$refs)
    // console.log(Object.keys(this.$refs))
  },
  methods: {
    minimize() {
      this.currentShow = 4
    },
    maximize(id) {
      this.currentShow = id
      console.log('当前id:' + this.currentShow)
    },
    async getList() {
      if (!this.listQuery.salePlanId) {
        this.$message.error('请填写销售计划')
      }
      this.listLoading = true
      const { data } = await querySkuProductSaleDate(this.listQuery.salePlanId)
      // console.log(data)
      this.list = data.saleDataList
      this.list2 = data.likeSkuSaleDataList
      this.skuProduct = data.skuProduct
      this.timeUint = this.skuProduct?.saleTimeUnit ?? 0
      this.metrics = data.metricValueList
      this.listLoading = false
      const xs = this.list.map((x) => x.date)
      // console.log(xs)

      const actualData = this.list.map((x) => x.quantity)
      const ytdData = this.list.map((x) => x.ytd)
      const predictData = this.list.map((x) => x.predictQuantity)
      const storageData = []
      const storageXs = []
      const fittingData = this.list.map((x) => x.fittingPredictQuantity)

      for (let i = 0; i < this.list.length; i++) {
        const item = this.list[i]
        if (item.storageQuantity != null) {
          storageData.push(item.storageQuantity)
          storageXs.push(item.date)
        }
      }
      const actualData2 = this.list2.map((x) => x.quantity)
      const ytdData2 = this.list2.map((x) => x.ytd)
      const predictData2 = this.list2.map((x) => x.predictQuantity)
      const storageData2 = []
      const storageXs2 = []
      const fittingData2 = this.list2.map((x) => x.fittingPredictQuantity)

      for (let i = 0; i < this.list2.length; i++) {
        const item = this.list2[i]
        if (item.storageQuantity != null) {
          storageData2.push(item.storageQuantity)
          storageXs2.push(item.date)
        }
      }
      console.log('208', initNames)
      console.log('209', initValues)

      // console.log('-*****2', xs)
      // console.log(
      //   actualDataSeriesConfig,
      //   ytdSeriesConfig,
      //   predictDataSeriesConfig,
      //   fittingPredictDataSeriesConfig,
      //   actualDataSeriesConfig2,
      //   ytdSeriesConfig2,
      //   predictDataSeriesConfig2,
      //   fittingPredictDataSeriesConfig2)
      // console.log(storageXs)
      // console.log(
      //   storageDataSeriesConfig,
      //   storageDataSeriesConfig2)

      var initNames = ['YTD', '销售数据', '预估销售', '三次拟合', '库存数据', '参考sku-YTD', '参考sku-销售数据', '参考sku-预估销售', '参考sku-三次拟合', '参考sku-库存数据']
      var initValues = [ytdData, actualData, predictData, fittingData, storageData, ytdData2, actualData2, predictData2, fittingData2, storageData2]

      var initNames2 = ['库存数据', '参考sku-库存数据']
      var initValues2 = [storageData, storageData2]
      this.$nextTick(() => {
        this.$refs.functionProps.initChart(initNames, xs, initValues, '')
        this.$refs.functionProps2.initChart(initNames2, storageXs, initValues2, '')
        // this.$refs.saleDataChart.initChart(xs, [
        //   actualDataSeriesConfig,
        //   ytdSeriesConfig,
        //   predictDataSeriesConfig,
        //   fittingPredictDataSeriesConfig,
        //   actualDataSeriesConfig2,
        //   ytdSeriesConfig2,
        //   predictDataSeriesConfig2,
        //   fittingPredictDataSeriesConfig2
        // ])
        // this.$refs.storageDataChart.initChart(storageXs, [
        //   storageDataSeriesConfig,
        //   storageDataSeriesConfig2
        // ])
      })
    },
    refreshSkuRelatedData() {
      this.refreshLoading = true
      refreshRelatedData(this.listQuery.salePlanId)
        .then((res) => {
          if (res.data) {
            this.$message.success('刷新成功')
            this.getList()
          }
          this.refreshLoading = false
        })
        .catch((res) => {
          this.$message.error('刷新失败')
          this.refreshLoading = false
        })
    },
    async getBrands() {
      const { data } = await getBrandEnum()
      this.brands = data
    },
    syncCalculate() {
      syncCalculateBySalePlanById(this.salePlanId).then((res) => {
        if (res.data) {
          this.$message.success('同步成功')
          this.getList()
        } else {
          this.$message.error('同步失败')
        }
      })
    },
    weekCoefficientChange(row) {
      debugger
      const param = {
        skuId: this.listQuery.salePlanId,
        weekCoefficient: row.weekCoefficient,
        date: row.date
      }
      weekCoefficientChange(param).then((res) => {
        if (res.data) {
          this.$message.success('周系数更改成功')
        } else {
          this.$message.error('更改失败')
        }
      })
    },
    submitModifySaleData() {
      const modifyDataList = []
      const typeList = [0, 1]
      for (let i = 0; i < this.list.length; i++) {
        const item = this.list[i]
        if (!item.modify) {
          continue
        }
        item.modify = false
        typeList.forEach((type) => {
          const saleData = JSON.parse(JSON.stringify(item))
          saleData.salePlanId = this.salePlan.id
          saleData.type = type
          if (type === 0) {
            saleData.quantity = item.quantity
          } else if (type === 1) {
            saleData.quantity = item.buyOrderQuantity
          }
          modifyDataList.push(saleData)
        })
      }
      batchUpdateSaleData(modifyDataList).then((res) => {
        this.editRowDate = null
        if (res.data) {
          this.$message.success('修改已提交')
          this.getList()
        }
      })
    },

    getChartSerialDataConfig(data, title, color, smooth) {
      return {
        name: title,
        type: 'line',
        smooth: smooth,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 2
          }
        },
        itemStyle: {
          normal: {
            color: color,
            borderWidth: 12
          }
        },
        data: data
      }
    }
  }
}
</script>

<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>

<style lang="scss" scoped>
/** 辉 */
.small-text-card-name{
  font-size: 12px; /* 调整文字大小 */
  font-weight: bold ;
  padding: 8px; /* 调整内边距，以适应缩小的文字 */
}
.small-text-card-value{
  font-size: 12px; /* 调整文字大小 */
  // font-weight: bold ;
  padding: 8px; /* 调整内边距，以适应缩小的文字 */
}
.adaptive-text-card {
  display: flex;
  align-items: center; /* 垂直居中 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  font-size: calc(11px + 0.1vw); /* 根据视口宽度动态调整字体大小 */
  height: 4vh;
  min-height: 35px;
}

// .sale-container {
//   height: 1000px;
//   width: 100%;
//   min-width: 1500px;
//   margin-top: 30px;
// }

// .metric-item2 {
//   margin: 5px 5px;
//   font-size: 12px;
//   height: 25px;
// }

// .metric-name2 {
//   color: #a9a9a9;
// }

// .metric-value2 {
//   color: #5b5b5b; /* 设置字体颜色为红色 */
// }

// .metric-item {
//   float: left;
//   width: 120px;
//   margin: 5px 5px;
//   font-size: 12px;
//   height: 25px;
// }

// .metric-name3 {
//   width: 70px;
//   font-weight: bold; /* 设置字体*/
//   float: left;
// }

// .metric-value3 {
//   color: red; /* 设置字体颜色为红色 */
//   font-weight: bold; /* 设置字体*/
//   float: left;
// }

// .allShow {
//   height: 100%;
//   width: 90%;
//   margin: 0 auto;
// }

// .width30 {
//   width: 30%;
// }

// .width65 {
//   width: 65%;
// }

// .height30 {
//   height: 30%;
// }

// .left-panel {
//   background-color: #fff;
//   float: left;
//   margin-right: 30px;
//   height: 100%;
//   margin-left: 20px;
// }

// .right-panel {
//   max-width: 1100px;
//   background-color: #fff;
//   float: left;
//   min-width: 400px;
//   margin: auto auto;
//   height: 97%;
//   padding: 10px;
//   border: 1px solid #1f2d3d;
//   box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5); /* 设置阴影 */
// }

// .top-metric-panel {
//   max-width: 800px;
//   max-height: 400px;
//   font-size: 1rem;
//   overflow: scroll;
//   margin-bottom: 20px;
//   padding: 10px;
//   padding-top: 0;
//   border: 1px solid #1f2d3d;
//   box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5); /* 设置阴影 */
//   .top-metric-penel-list {
//     div {
//       span {
//         float: left;
//         width: 25%;
//         word-break: break-all;
//         white-space: normal;
//       }
//       span:nth-child(2n - 1) {
//         color: #b1a9a9;
//       }
//     }
//   }

//   .top-metric-penel-list2 {
//     div {
//       float: left;
//       width: 25%;
//       word-break: break-all;
//       white-space: normal;
//     }
//   }

//   .heightAll {
//     height: 40px;
//   }

//   .border-set {
//     div {
//       border: 1px solid #d5d5d5;
//       // border-left-style: none;
//       // border-top-style: none;
//       padding: 0.2rem;
//     }

//     div:nth-child(1) {
//       color: #a9a9a9;
//       border-right-style: none;
//     }
//   }

//   .border-all {
//     border: 1px solid #d5d5d5;
//     border-left-style: none;
//     border-top-style: none;
//     padding: 0.2rem;
//   }
//   .border-top {
//     border-top-style: solid;
//   }

//   .border-left {
//     border-left-style: solid;
//   }
// }

// .bottom-sale-data {
//   height: 65%;
//   overflow: scroll;
//   max-width: 800px;
//   padding: 10px;
//   border: 1px solid #1f2d3d;
//   box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5); /* 设置阴影 */
// }

// .top-sale-chart {
//   height: 45%;
//   // width: 100%;
//   margin-bottom: 40px;
// }

// .bottom-metric-chart {
//   height: 45%;
// }

// .chart-container {
//   width: 100%;
//   height: 100%;
// }

// /**scroll**/

// /*css主要部分的样式*/

// /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

// ::-webkit-scrollbar {
//   width: 6px; /*对垂直流动条有效*/

//   height: 6px; /*对水平流动条有效*/
// }

// /*定义滚动条的轨道颜色、内阴影及圆角*/

// ::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);

//   background: linear-gradient(to top, #fcf5ee, #faf7e6, #73d2f3, #eeeeee);

//   border-radius: 1px;

//   display: none;
// }

// /*定义滑块颜色、内阴影及圆角*/

// ::-webkit-scrollbar-thumb {
//   border-radius: 1px;

//   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);

//   background: linear-gradient(to top, #fcf5ee, #faf7e6, #73d2f3, #eeeeee);
// }

// /*定义两端按钮的样式*/

// ::-webkit-scrollbar-button {
//   background-color: #ffffff;
// }

// /*定义右下角汇合处的样式*/

// ::-webkit-scrollbar-corner {
//   background: #ffffff;
// }

// ::-webkit-scrollbar-track-piece {
//   background-color: #ffffff;
// }
</style>
