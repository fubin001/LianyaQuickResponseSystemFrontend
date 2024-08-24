<template>
  <div :class="containerClass">
    <div v-if="!expanded || expanded === 'top-left'" class="layout top-left">
      <el-button icon="el-icon-full-screen" size="mini" @click="toggleExpand('top-left')">放大/缩小</el-button>
      <el-row :gutter="12">
        <el-col size="mini" :span="24">
          <el-card shadow="always" class="adaptive-text-card">
            <el-tag>基础信息</el-tag>
          </el-card>
        </el-col>
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
    </div>
    <div v-if="!expanded || expanded === 'top-right'" class="layout top-right">
      <el-button icon="el-icon-full-screen" size="mini" @click="toggleExpand('top-right')">放大/缩小</el-button>
      <div class="top-sale-chart">
        <div class="chart-container">
          <SaleLineChart
            id="sale-data"
            ref="saleDataChart"
            title="销售曲线"
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </div>
    <div v-if="!expanded || expanded === 'bottom-left'" class="layout bottom-left">
      <el-button icon="el-icon-full-screen" size="mini" @click="toggleExpand('bottom-left')">放大/缩小</el-button>
      Bottom Left
    </div>
    <div v-if="!expanded || expanded === 'bottom-right'" class="layout bottom-right">
      <el-button icon="el-icon-full-screen" size="mini" @click="toggleExpand('bottom-right')">放大/缩小</el-button>
      <div class="bottom-metric-chart">
        <div class="chart-container">
          <SaleLineChart
            id="storage-data"
            ref="storageDataChart"
            title="剩余库存"
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBrandEnum } from '@/api/enum'
import {
  batchUpdateSaleData,
  queryCandidateSalePlan,
  weekCoefficientChange,
  querySaleDataBy,
  querySkuProductSaleDate,
  syncCalculateBySalePlanById
} from '@/api/saleData'
import { refreshRelatedData } from '@/api/skuProduct'
import SaleLineChart from '@/views/product/component/SaleLineChart.vue'
export default {
  name: '',
  components: { SaleLineChart },
  data() {
    return { currentShow: 4,
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
      dataModify: false,
      listQuery: {
        salePlanId: '',
        page: 1,
        size: 10
      },
      metrics: {},
      key: 1,
      titleMap: {
        create: '新增销售计划',
        update: '编辑销售计划'
      },
      sortable: null,
      salePlan: null,
      temp: {},
      brands: [],
      editRowDate: null,
      salePlanForm: {},
      salePlanId: null,
      candidateSalePlan: [],
      skuProduct: {},

      expanded: null // 当前放大的布局区域
    }
  },
  computed: {
    containerClass() {
      return {
        'container': true,
        'expanded': this.expanded
      }
    }
  },
  created() {
    this.editRowDate = null
    this.getBrands()
    // console.log(this.$route)
    // this.salePlanId = this.$route.query.salePlanId
    // if (this.$route.query.salePlanId) {
    //   this.listQuery.salePlanId = this.$route.query.salePlanId
    //   this.getList()
    // }
    this.salePlanId = '24424FRM621UGH0'
    console.log(this.listQuery)

    this.listQuery.salePlanId = '24424FRM621UGH0'

    this.getList()
  },
  mounted() {
    // console.log(this.$refs)
    // console.log(Object.keys(this.$refs))
  },
  methods: {
    /** 布局放大缩小按钮 */
    toggleExpand(layout) {
      if (this.expanded === layout) {
        this.expanded = null // 缩小
      } else {
        this.expanded = layout // 放大
      }
    },
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
      console.log(data)
      this.list = data.saleDataList
      this.list2 = data.likeSkuSaleDataList
      this.skuProduct = data.skuProduct
      this.timeUint = this.skuProduct?.saleTimeUnit ?? 0
      this.metrics = data.metricValueList
      this.listLoading = false
      const xs = this.list.map((x) => x.date)
      console.log(xs)

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

      const ytdSeriesConfig = this.getChartSerialDataConfig(
        ytdData,
        'YTD',
        'rgb(119,50,51)',
        false
      )
      const actualDataSeriesConfig = this.getChartSerialDataConfig(
        actualData,
        '销售数据',
        'rgb(219,50,51)',
        false
      )
      const predictDataSeriesConfig = this.getChartSerialDataConfig(
        predictData,
        '预估销售',
        'rgb(137, 189, 27)',
        false
      )
      const fittingPredictDataSeriesConfig = this.getChartSerialDataConfig(
        fittingData,
        '三次拟合',
        'rgb(0, 136, 212)',
        false
      )
      const storageDataSeriesConfig = this.getChartSerialDataConfig(
        storageData,
        '库存数据',
        'rgb(219,50,51)',
        false
      )

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

      const ytdSeriesConfig2 = this.getChartSerialDataConfig(
        ytdData2,
        '参考sku-YTD',
        'rgb(119,50,151)',
        false
      )
      const actualDataSeriesConfig2 = this.getChartSerialDataConfig(
        actualData2,
        '参考sku-销售数据',
        'rgb(219,50,151)',
        false
      )
      const predictDataSeriesConfig2 = this.getChartSerialDataConfig(
        predictData2,
        '参考sku-预估销售',
        'rgb(137, 189, 127)',
        false
      )
      const fittingPredictDataSeriesConfig2 = this.getChartSerialDataConfig(
        fittingData2,
        '参考sku-三次拟合',
        'rgb(100, 136, 212)',
        false
      )
      const storageDataSeriesConfig2 = this.getChartSerialDataConfig(
        storageData2,
        '参考sku-库存数据',
        'rgb(219,150,51)',
        false
      )

      this.$nextTick(() => {
        this.$refs.saleDataChart.initChart(xs, [
          actualDataSeriesConfig,
          ytdSeriesConfig,
          predictDataSeriesConfig,
          fittingPredictDataSeriesConfig,
          actualDataSeriesConfig2,
          ytdSeriesConfig2,
          predictDataSeriesConfig2,
          fittingPredictDataSeriesConfig2
        ])
        this.$refs.storageDataChart.initChart(storageXs, [
          storageDataSeriesConfig,
          storageDataSeriesConfig2
        ])
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

    async fitting() {
      this.listLoading = true
      const { data } = await querySaleDataBy(
        this.listQuery.salePlanId,
        this.listQuery.oldSalePlanId
      )
      this.list = data.saleDataList
      this.salePlan = data.salePlan
      this.timeUint = this.salePlan?.saleTimeUnit ?? 0
      this.metrics = data.metrics
      this.listLoading = false
      const xs = this.list.map((x) => x.date)
      console.log(xs)

      queryCandidateSalePlan(this.salePlan.oldSkuId).then((res) => {
        this.candidateSalePlan = res.data
      })
      const actualData = this.list.map((x) => x.quantity)
      const predictData = this.list.map((x) => x.predictQuantity)
      const storageData = this.list.map((x) => x.storageQuantity)
      const fittingData = this.list.map((x) => x.fittingPredictQuantity)

      const actualDataSeriesConfig = this.getChartSerialDataConfig(
        actualData,
        '销售数据',
        'rgb(219,50,51)',
        false
      )
      const predictDataSeriesConfig = this.getChartSerialDataConfig(
        predictData,
        '预估销售',
        'rgb(137, 189, 27)',
        false
      )
      const fittingPredictDataSeriesConfig = this.getChartSerialDataConfig(
        fittingData,
        '三次拟合',
        'rgb(0, 136, 212)',
        false
      )
      const storageDataSeriesConfig = this.getChartSerialDataConfig(
        storageData,
        '库存数据',
        'rgb(219,50,51)',
        false
      )
      this.$refs.saleDataChart.initChart(xs, [
        actualDataSeriesConfig,
        predictDataSeriesConfig,
        fittingPredictDataSeriesConfig
      ])
      this.$refs.storageDataChart.initChart(xs, [storageDataSeriesConfig])
    },

    async getBrands() {
      const { data } = await getBrandEnum()
      this.brands = data
    },

    handleRowClick(row, column, cell, event) {
      // if (column.property === 'actualData' || column.property === 'buyOrderQuantity') {
      //   if (this.editRowDate !== row.date) {
      //     this.editRowDate = row.date
      //     console.log(this.editRowDate)
      //     this.key = Math.random() * 100
      //   }
      // } else {
      //   this.editRowDate = null
      // }
    },
    handleInputChange(row) {
      // row.modify = true
      // this.dataModify = true
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
      this.dataModify = false
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

<style lang="scss"  scoped>

/** 辉 */
.small-text-card-name{
  font-size: 12px; /* 调整文字大小 */
  font-weight: bold ;
  padding: 8px; /* 调整内边距，以适应缩小的文字 */
}
.small-text-card-value{
  font-size: 12px; /* 调整文字大小 */
  //font-weight: bold ;
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
// element-plus滚动条
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.wrap {
  display: flex;
}
.container {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  height: 87vh;
}

.layout {
  // display: flex;
  gap: 10px; /* 选填：控制两个 el-row 之间的间距 */
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  overflow-y: auto; /* 允许垂直滚动 */
  overflow-x: hidden; /* 禁止水平滚动 */
  background: #f5f5f5;
  position: relative;
}

.layout .el-button {
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 10px;
}

// .layout .el-row{
//   margin-top: 30px;
// }

.expanded {
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
}

.top-left {
  grid-row: 1;
  grid-column: 1;
}

.top-right {
  grid-row: 1;
  grid-column: 2;
}

.bottom-left {
  grid-row: 2;
  grid-column: 1;
}

.bottom-right {
  grid-row: 2;
  grid-column: 2;
}

.expanded .top-left {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
}

.expanded .top-right {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
}

.expanded .bottom-left {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
}

.expanded .bottom-right {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
}
</style>
