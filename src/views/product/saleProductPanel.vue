<template>
  <div style="width: 100%; background-color: #f7f8fc">
    <div class="sale-container" style="width: 100%; height: 1000px">
      <div
        class="left-panel"
        :class="{
          allShow: currentShow == 1 || currentShow == 2,
          width30: currentShow == 4,
        }"
      >
        <div
          v-show="currentShow == 1 || currentShow == 4"
          class="top-metric-panel"
          :class="{ allShow: currentShow == 1, height30: currentShow == 4 }"
        >
          <div
            style="
              height: 2rem;
              line-height: 2rem;
              padding: 0 0.2rem;
              margin-top: 0.2rem;
            "
          >
            <span style="float: left">基础信息</span>
            <span style="float: right">
              <span class="iconfont icon-zuixiaohua" @click="minimize" />
              <span class="iconfont icon-zuidahua" @click="maximize(1)" />
            </span>
          </div>
          <div style="margin-bottom: -18px" />
          <el-divider />
          <div style="margin-top: -18px" />
          <div class="top-metric-penel-list">
            <div>
              <span class="border-all border-left border-top"> 策略模型 </span>
              <span class="border-all border-top">
                {{ this.skuProduct.predictModel }}
              </span>
              <span class="border-all border-top"> 快反周期 </span>
              <span class="border-all border-top">
                {{ this.skuProduct.feedbackDay }}天
              </span>
            </div>

            <div>
              <span
                :class="{ heightAll: currentShow == 4 }"
                class="border-all border-left"
                style="height: 80px"
              >
                货号
              </span>
              <span
                :class="{ heightAll: currentShow == 4 }"
                class="border-all"
                style="height: 80px"
              >
                {{ this.skuProduct.skuId }}
              </span>
              <span
                :class="{ heightAll: currentShow == 4 }"
                class="border-all"
                style="height: 80px"
              >
                商品名
              </span>
              <span
                :class="{ heightAll: currentShow == 4 }"
                class="border-all"
                style="height: 80px"
              >
                {{ this.skuProduct.fullName }}
              </span>
            </div>

            <div>
              <span class="border-all border-left"> 上市时间 </span>
              <span class="border-all">
                {{ this.skuProduct.listingDate }}
              </span>
              <span class="border-all">款式 </span>
              <span class="border-all">
                {{ this.skuProduct.styleId }}
              </span>
              <span class="border-all">参考SKU </span>
              <span class="border-all">
                {{ skuProduct.likeSku ? skuProduct.likeSku : "无" }}
              </span>
            </div>

            <div style="clear: both" />
          </div>

          <div style="margin-bottom: -10px" />
          <el-divider />
          <div style="margin-top: -10px" />

          <div style="width: 100%; height: 100px">
            <div
              v-for="metric in metrics"
              :key="metric.metricName"
              class="top-metric-penel-list2 border-set"
            >
              <div :class="{ heightAll: currentShow == 4 }">
                {{ metric.metricName }}
              </div>
              <div :class="{ heightAll: currentShow == 4 }">
                {{ metric.metricValue }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="currentShow == 2 || currentShow == 4"
          :class="{ allShow: currentShow == 2 }"
          class="bottom-sale-data"
        >
          <div style="height: 1.2rem">
            <span style="float: right">
              <span class="iconfont icon-zuixiaohua" @click="minimize" />
              <span class="iconfont icon-zuidahua" @click="maximize(2)" />
            </span>
          </div>
          <div
            class="title-region"
            style="
              width: 100%;
              height: 40px;
              line-height: 40px;
              margin-bottom: -20px;
            "
          >
            <span>数据面板</span>

            <span style="float: right">
              <!-- <el-button
                size="mini"
                class="filter-item"
                type="primary"
                icon="el-icon-search"
                style="
                  width: 100px;
                  margin: 5px 8px 5px 0;
                  background-color: #244496;
                "
                @click="syncCalculate"
              >
                同步数据
              </el-button> -->
              <el-button
                size="mini"
                class="filter-item"
                type="primary"
                icon="el-icon-search"
                :loading="refreshLoading"
                style="
                  width: 100px;
                  margin: 5px 8px 5px 0;
                  background-color: #244496;
                "
                @click="refreshSkuRelatedData"
              >
                刷新数据
              </el-button>
              <span v-if="candidateSalePlan && candidateSalePlan.length > 0">
                <el-select
                  v-model="listQuery.oldSalePlanId"
                  style="width: 150px; margin: 5px 8px 5px 0"
                  size="small"
                >
                  <el-option
                    v-for="candidate in candidateSalePlan"
                    :key="candidate.name"
                    :label="candidate.name"
                    :value="candidate.value"
                  />
                </el-select>
                <el-button
                  size="small"
                  class="filter-item"
                  type="primary"
                  icon="el-icon-search"
                  style="width: 100px; margin: 5px 8px 5px 0"
                  @click="fitting"
                >
                  拟合
                </el-button>
              </span>
              <el-button
                v-if="dataModify"
                size="small"
                class="filter-item"
                type="primary"
                icon="el-icon-search"
                style="width: 100px; margin: 5px 8px 5px 0"
                @click="submitModifySaleData"
              >
                提交修改
              </el-button>
            </span>
          </div>
          <el-divider />
          <div style="margin-top: -15px" />
          <el-table
            ref="dragTable"
            :key="key"
            v-loading="listLoading"
            style="width: 100%"
            :data="list"
            fit
            highlight-current-row
            :header-cell-style="{ background: '#e4e7f0' }"
            @cell-click="handleRowClick"
          >
            <el-table-column align="left" label="ID" type="index" width="65" />
            <!--            <el-table-column v-if="timeUint === 0" align="left" label="日期" prop="date">-->
            <!--              <template slot-scope="{row}">-->
            <!--                {{ row.date }}-->
            <!--                <el-tag v-if="row.modify" type="danger" style="margin-left: 5px">已修改</el-tag>-->
            <!--              </template>-->
            <!--            </el-table-column>-->
            <el-table-column align="left" label="月-周" prop="date" width="70">
              <template slot-scope="{ row }">
                {{ row.month + "-W" + row.week }}
                <!--                <el-tag v-if="row.modify" type="danger" style="margin-left: 5px">已修改</el-tag>-->
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="日期"
              prop="date"
              width="100"
            />
            <el-table-column
              align="left"
              label="实际销售"
              prop="actualData"
              width="100px"
            >
              <template slot-scope="{ row }">
                <span v-if="row.date === editRowDate">
                  <el-input
                    v-model="row.quantity"
                    style="width: 50px"
                    size="small"
                    @input="handleInputChange(row)"
                  />
                </span>
                <span v-else>
                  {{ row.quantity }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="采购数量"
              prop="buyOrderQuantity"
              width="100px"
            >
              <template slot-scope="{ row }">
                <span v-if="row.date === editRowDate">
                  <el-input
                    v-model="row.buyOrderQuantity"
                    style="width: 50px"
                    size="small"
                    @input="handleInputChange(row)"
                  />
                </span>
                <span v-else>
                  {{ row.buyOrderQuantity }}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              align="left"
              label="预估销售"
              prop="predictQuantity"
              width="100px"
            />
            <el-table-column
              align="left"
              label="库存数量"
              prop="storageQuantity"
              width="100px"
            />
            <!-- <el-table-column
              align="left"
              label="三次拟合"
              prop="fittingPredictQuantity"
              width="100px"
            /> -->
            <el-table-column
              align="left"
              label="周系数"
              prop="weekCoefficient"
              width="100px"
            >
              <template slot-scope="{ row }">
                <el-input
                  v-model="row.weekCoefficient"
                  placeholder="周系数"
                  @change="weekCoefficientChange(row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div
        v-show="currentShow == 3 || currentShow == 4"
        :class="{ allShow: currentShow == 3, width65: currentShow == 4 }"
        class="right-panel"
      >
        <div style="height: 1.2rem">
          <span style="float: left">
            <span class="iconfont icon-zuixiaohua" @click="minimize" />
            <span class="iconfont icon-zuidahua" @click="maximize(3)" />
          </span>
        </div>
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
      dataModify: false,
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
      sortable: null,
      salePlan: null,
      temp: {},
      brands: [],
      editRowDate: null,
      salePlanForm: {},
      salePlanId: null,
      candidateSalePlan: [],
      skuProduct: {}
    }
  },
  created() {
    this.editRowDate = null
    this.getBrands()
    console.log(this.$route)
    this.salePlanId = this.$route.query.salePlanId
    if (this.$route.query.salePlanId) {
      this.listQuery.salePlanId = this.$route.query.salePlanId
      this.getList()
    }
  },
  mounted() {
    console.log(this.$refs)
    console.log(Object.keys(this.$refs))
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

<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>

<style lang="scss" scoped>
.sale-container {
  height: 1000px;
  width: 100%;
  min-width: 1500px;
  margin-top: 30px;
}

.metric-item2 {
  margin: 5px 5px;
  font-size: 12px;
  height: 25px;
}

.metric-name2 {
  color: #a9a9a9;
}

.metric-value2 {
  color: #5b5b5b; /* 设置字体颜色为红色 */
}

.metric-item {
  float: left;
  width: 120px;
  margin: 5px 5px;
  font-size: 12px;
  height: 25px;
}

.metric-name3 {
  width: 70px;
  font-weight: bold; /* 设置字体*/
  float: left;
}

.metric-value3 {
  color: red; /* 设置字体颜色为红色 */
  font-weight: bold; /* 设置字体*/
  float: left;
}

.allShow {
  height: 100%;
  width: 90%;
  margin: 0 auto;
}

.width30 {
  width: 30%;
}

.width65 {
  width: 65%;
}

.height30 {
  height: 30%;
}

.left-panel {
  background-color: #fff;
  float: left;
  margin-right: 30px;
  height: 100%;
  margin-left: 20px;
}

.right-panel {
  max-width: 1100px;
  background-color: #fff;
  float: left;
  min-width: 400px;
  margin: auto auto;
  height: 97%;
  padding: 10px;
  border: 1px solid #1f2d3d;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5); /* 设置阴影 */
}

.top-metric-panel {
  max-width: 800px;
  max-height: 400px;
  font-size: 1rem;
  overflow: scroll;
  margin-bottom: 20px;
  padding: 10px;
  padding-top: 0;
  border: 1px solid #1f2d3d;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5); /* 设置阴影 */
  .top-metric-penel-list {
    div {
      span {
        float: left;
        width: 25%;
        word-break: break-all;
        white-space: normal;
      }
      span:nth-child(2n - 1) {
        color: #b1a9a9;
      }
    }
  }

  .top-metric-penel-list2 {
    div {
      float: left;
      width: 25%;
      word-break: break-all;
      white-space: normal;
    }
  }

  .heightAll {
    height: 40px;
  }

  .border-set {
    div {
      border: 1px solid #d5d5d5;
      // border-left-style: none;
      // border-top-style: none;
      padding: 0.2rem;
    }

    div:nth-child(1) {
      color: #a9a9a9;
      border-right-style: none;
    }
  }

  .border-all {
    border: 1px solid #d5d5d5;
    border-left-style: none;
    border-top-style: none;
    padding: 0.2rem;
  }
  .border-top {
    border-top-style: solid;
  }

  .border-left {
    border-left-style: solid;
  }
}

.bottom-sale-data {
  height: 65%;
  overflow: scroll;
  max-width: 800px;
  padding: 10px;
  border: 1px solid #1f2d3d;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5); /* 设置阴影 */
}

.top-sale-chart {
  height: 45%;
  // width: 100%;
  margin-bottom: 40px;
}

.bottom-metric-chart {
  height: 45%;
}

.chart-container {
  width: 100%;
  height: 100%;
}

/**scroll**/

/*css主要部分的样式*/

/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

::-webkit-scrollbar {
  width: 6px; /*对垂直流动条有效*/

  height: 6px; /*对水平流动条有效*/
}

/*定义滚动条的轨道颜色、内阴影及圆角*/

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);

  background: linear-gradient(to top, #fcf5ee, #faf7e6, #73d2f3, #eeeeee);

  border-radius: 1px;

  display: none;
}

/*定义滑块颜色、内阴影及圆角*/

::-webkit-scrollbar-thumb {
  border-radius: 1px;

  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);

  background: linear-gradient(to top, #fcf5ee, #faf7e6, #73d2f3, #eeeeee);
}

/*定义两端按钮的样式*/

::-webkit-scrollbar-button {
  background-color: #ffffff;
}

/*定义右下角汇合处的样式*/

::-webkit-scrollbar-corner {
  background: #ffffff;
}

::-webkit-scrollbar-track-piece {
  background-color: #ffffff;
}
</style>
