<template>
  <div style="width:100%">
    <div class="sale-container" style="width: 100%; height: 1000px">
      <div class="left-panel">
        <div class="top-metric-panel">
          <div class="title-region">
            <h1>指标面板</h1>
          </div>
          <div v-for="(metricValue, metricName) in metrics " :key="metricName" class="metric-item">
            <span>{{ metricName }}</span>:<span style="float:right">{{ metricValue }}</span>
          </div>
        </div>
        <div class="bottom-sale-data">
          <div class="title-region" style="width: 100%">
            <h1>数据面板</h1>

            <div style="margin-bottom: 20px">
              <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" style="width:100px;margin: 5px 8px 5px 0" @click="syncCalculate">
                同步数据
              </el-button>
              <span v-if="candidateSalePlan && candidateSalePlan.length > 0">
                <el-select v-model="listQuery.oldSalePlanId" style="width:150px;  margin: 5px 8px 5px 0" size="small">
                  <el-option v-for="candidate in candidateSalePlan" :key="candidate.name" :label="candidate.name" :value="candidate.value" />
                </el-select>
                <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" style="width:100px;margin: 5px 8px 5px 0" @click="fitting">
                  拟合
                </el-button>
              </span>
              <el-button v-if="dataModify" size="small" class="filter-item" type="primary" icon="el-icon-search" style="width:100px;margin: 5px 8px 5px 0" @click="submitModifySaleData">
                提交修改
              </el-button>
            </div>
          </div>
          <el-table ref="dragTable" :key="key" v-loading="listLoading" style="width: 100%" :data="list" border fit highlight-current-row @cell-click="handleRowClick">
            <el-table-column align="left" label="ID" type="index" width="65" />
            <el-table-column v-if="timeUint === 0" align="left" label="日期" prop="date">
              <template slot-scope="{row}">
                {{ row.date }}
                <el-tag v-if="row.modify" type="danger" style="margin-left: 5px">已修改</el-tag>
              </template>
            </el-table-column>
            <el-table-column v-else-if="timeUint === 1" align="left" label="日期" prop="date" width="150px">
              <template slot-scope="{row}">
                {{ row.month + '-W' + row.week }}{{ '(' + row.date + ')' }}
                <el-tag v-if="row.modify" type="danger" style="margin-left: 5px">已修改</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="left" label="实际销售" prop="actualData" width="100px">
              <template slot-scope="{row}">
                <span v-if="row.date === editRowDate">
                  <el-input v-model="row.quantity" style="width: 50px" size="small" @input="handleInputChange(row)" />
                </span>
                <span v-else>
                  {{ row.quantity }}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="采购数量" prop="buyOrderQuantity" width="100px">
              <template slot-scope="{row}">
                <span v-if="row.date === editRowDate">
                  <el-input v-model="row.buyOrderQuantity" style="width: 50px" size="small" @input="handleInputChange(row)" />
                </span>
                <span v-else>
                  {{ row.buyOrderQuantity }}
                </span>
              </template>
            </el-table-column>

            <el-table-column align="left" label="预估销售" prop="predictQuantity" width="100px" />
            <el-table-column align="left" label="库存数量" prop="storageQuantity" width="100px" />
            <el-table-column align="left" label="三次拟合" prop="fittingPredictQuantity" width="100px" />
            <el-table-column align="left" label="快反追加" width="100px" />
          </el-table>
        </div>
      </div>
      <div class="right-panel">
        <div class="top-sale-chart">
          <div class="chart-container">
            <SaleLineChart id="sale-data" ref="saleDataChart" title="销售曲线" height="100%" width="100%" />
          </div>
        </div>
        <div class="bottom-metric-chart">
          <div class="chart-container">
            <SaleLineChart id="storage-data" ref="storageDataChart" title="剩余库存" height="100%" width="100%" />
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
  queryCandidateSalePlan, querySaleDataBy,
  querySaleDataBySalePlanById,
  syncCalculateBySalePlanById
} from '@/api/saleData'
import SaleLineChart from '@/views/product/component/SaleLineChart.vue'
export default {
  name: 'User',
  components: { SaleLineChart },
  data() {
    return {
      timeUint: 0,
      fittingSalePlanId: null,
      dialogStatus: 'create',
      dialogFormVisible: false,
      page: 1,
      size: 10,
      list: null,
      total: null,
      listLoading: false,
      dataModify: false,
      listQuery: {
        page: 1,
        size: 10
      },
      metrics: {},
      key: 1,
      titleMap: {
        'create': '新增销售计划',
        'update': '编辑销售计划'
      },
      sortable: null,
      salePlan: null,
      temp: {},
      brands: [],
      editRowDate: null,
      salePlanForm: {},
      salePlanId: null,
      candidateSalePlan: []
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
  },
  methods: {
    async getList() {
      if (!this.listQuery.salePlanId) {
        this.$message.error('请填写销售计划')
      }
      this.listLoading = true
      const { data } = await querySaleDataBySalePlanById(this.listQuery.salePlanId)
      this.list = data.saleDataList
      this.salePlan = data.salePlan
      this.timeUint = this.salePlan?.saleTimeUnit ?? 0
      this.metrics = data.metrics
      this.listLoading = false
      const xs = this.list.map(x => x.date)
      console.log(xs)

      queryCandidateSalePlan(this.salePlan.oldSkuId).then(res => {
        this.candidateSalePlan = res.data
      })
      const actualData = this.list.map(x => x.quantity)
      const predictData = this.list.map(x => x.predictQuantity)
      const storageData = this.list.map(x => x.storageQuantity)
      const fittingData = this.list.map(x => x.fittingPredictQuantity)

      const actualDataSeriesConfig = this.getChartSerialDataConfig(actualData, '销售数据', 'rgb(219,50,51)', false)
      const predictDataSeriesConfig = this.getChartSerialDataConfig(predictData, '预估销售', 'rgb(137, 189, 27)', false)
      const fittingPredictDataSeriesConfig = this.getChartSerialDataConfig(fittingData, '三次拟合', 'rgb(0, 136, 212)', false)
      const storageDataSeriesConfig = this.getChartSerialDataConfig(storageData, '库存数据', 'rgb(219,50,51)', false)
      this.$refs.saleDataChart.initChart(xs, [actualDataSeriesConfig, predictDataSeriesConfig, fittingPredictDataSeriesConfig])
      this.$refs.storageDataChart.initChart(xs, [storageDataSeriesConfig])
      this.$forceUpdate()
    },

    async fitting() {
      this.listLoading = true
      const { data } = await querySaleDataBy(this.listQuery.salePlanId, this.listQuery.oldSalePlanId)
      this.list = data.saleDataList
      this.salePlan = data.salePlan
      this.timeUint = this.salePlan?.saleTimeUnit ?? 0
      this.metrics = data.metrics
      this.listLoading = false
      const xs = this.list.map(x => x.date)
      console.log(xs)

      queryCandidateSalePlan(this.salePlan.oldSkuId).then(res => {
        this.candidateSalePlan = res.data
      })
      const actualData = this.list.map(x => x.quantity)
      const predictData = this.list.map(x => x.predictQuantity)
      const storageData = this.list.map(x => x.storageQuantity)
      const fittingData = this.list.map(x => x.fittingPredictQuantity)

      const actualDataSeriesConfig = this.getChartSerialDataConfig(actualData, '销售数据', 'rgb(219,50,51)', false)
      const predictDataSeriesConfig = this.getChartSerialDataConfig(predictData, '预估销售', 'rgb(137, 189, 27)', false)
      const fittingPredictDataSeriesConfig = this.getChartSerialDataConfig(fittingData, '三次拟合', 'rgb(0, 136, 212)', false)
      const storageDataSeriesConfig = this.getChartSerialDataConfig(storageData, '库存数据', 'rgb(219,50,51)', false)
      this.$refs.saleDataChart.initChart(xs, [actualDataSeriesConfig, predictDataSeriesConfig, fittingPredictDataSeriesConfig])
      this.$refs.storageDataChart.initChart(xs, [storageDataSeriesConfig])
    },

    async getBrands() {
      const { data } = await getBrandEnum()
      this.brands = data
    },

    handleRowClick(row, column, cell, event) {
      if (column.property === 'actualData' || column.property === 'buyOrderQuantity') {
        if (this.editRowDate !== row.date) {
          this.editRowDate = row.date
          console.log(this.editRowDate)
          this.key = Math.random() * 100
        }
      } else {
        this.editRowDate = null
      }
    },
    handleInputChange(row) {
      row.modify = true
      this.dataModify = true
    },

    syncCalculate() {
      syncCalculateBySalePlanById(this.salePlanId).then(res => {
        if (res.data) {
          this.$message.success('同步成功')
          this.getList()
        } else {
          this.$message.error('同步失败')
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
        typeList.forEach(type => {
          const saleData = JSON.parse(JSON.stringify(item))
          saleData.salePlanId = this.salePlan.id
          saleData.type = type
          if (type === 0) {
            saleData.quantity = item.quantity
          } else if (type === 1) {
            saleData.quantity = item.buyOrderQuantity
          }
          modifyDataList.push(saleData)
        }
        )
      }
      batchUpdateSaleData(modifyDataList).then(res => {
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
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style scoped>

body {
  background: #08263a;
}

.sale-container {
  height: 1000px ;
  width: 100%;
  min-width: 1500px;
  margin-top:30px;
}

.metric-item {
  float:left;
  width: 240px;
  margin: 10px 10px;
}

.left-panel {
  float : left;
  width : 30%;
  min-width: 400px;
  margin-right: 30px;
  height: 100%;
  margin-left: 20px;
}

.right-panel {
  float : left;
  width: 65%;
  min-width: 1000px;
  margin: auto auto;
  height: 97%;
  padding: 10px;
  border: 1px solid #1f2d3d;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5); /* 设置阴影 */
}

.top-metric-panel {
  height: 25%;
  overflow: scroll;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #1f2d3d;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5); /* 设置阴影 */
}

.bottom-sale-data {
  height: 70%;
  overflow: scroll;
  padding: 10px;
  border: 1px solid #1f2d3d;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5); /* 设置阴影 */
}

.top-sale-chart {
  height: 45%;
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

::-webkit-scrollbar-track{

  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);

  background:linear-gradient(to top, #fcf5ee, #faf7e6,#73d2f3,#eeeeee);

  border-radius: 1px;

  display:none;

}

/*定义滑块颜色、内阴影及圆角*/

::-webkit-scrollbar-thumb{

  border-radius: 1px;

  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);

  background:linear-gradient(to top, #fcf5ee, #faf7e6,#73d2f3,#eeeeee);

}

/*定义两端按钮的样式*/

::-webkit-scrollbar-button {

  background-color:#ffffff;

}

/*定义右下角汇合处的样式*/

::-webkit-scrollbar-corner {

  background:#ffffff;

}

::-webkit-scrollbar-track-piece {

  background-color: #ffffff;

}

</style>
