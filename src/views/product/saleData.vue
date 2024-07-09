<template>
  <div style="width:100%">
    <div class="filter-container">
      <el-input v-model="listQuery.salePlanId" placeholder="销售计划id" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" style=" margin: 5px 8px 5px 0" @click="getList(1)">
        搜索
      </el-button>
      <el-button v-if="dataModify" class="filter-item" type="primary" icon="el-icon-search" style=" margin: 5px 8px 5px 0" @click="submitModifySaleData">
        提交修改
      </el-button>
    </div>

    <div class="sale-container" style="width: 100%; height: 1000px">
      <div class="data-part1 data-panel" style="width: 350px; height: 100%; float: left; margin-right: 50px">
        <el-table ref="dragTable" :key="key" v-loading="listLoading" :data="list" border fit highlight-current-row @cell-click="handleRowClick">
          <el-table-column align="left" label="ID" type="index" width="65" />
          <el-table-column align="left" label="日期" prop="date">
            <template slot-scope="{row}">
              <span v-if="timeUint === 0"> {{ row.date }}</span>
              <span v-else-if="timeUint === 1">{{ row.month + '-W' + row.week }}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="实际销售数据" prop="actualData">
            <template slot-scope="{row}">
              <span v-if="row.date === editRowDate">
                <el-input-number v-model="row.quantity" @input="handleInputChange(row)" />
              </span>
              <span v-else>
                <span v-if="row.hasEntry"> {{ row.quantity }}</span>
                <span v-else>
                  <span v-if="row.quantity">
                    {{ row.quantity }}
                  </span>
                  <span v-else>
                    未录入
                  </span>
                </span>
              </span>
              <el-tag v-if="row.modify" type="danger" style="margin-left: 5px">已修改</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="left" label="销售预估数据" />
        </el-table>
      </div>
      <div class="data-part2 chart-panel " style="width: 1800px; height: 400px; float: left">
        <div class="chart-container">
          <chart height="40%" width="100%" />
        </div>
      </div>
      <div class="data-part3 chart-panel " style="width: 1800px; height: 400px; float: left">
        <div class="chart-container">
          <chart height="40%" width="100%" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { getBrandEnum } from '@/api/enum'
import { batchUpdateSaleData, querySaleDataBySalePlanById } from '@/api/saleData'
import Chart from '@/components/Charts/LineMarker'
export default {
  name: 'User',
  components: { Chart },
  data() {
    return {
      timeUint: 0,
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
      key: 1,
      titleMap: {
        'create': '新增销售计划',
        'update': '编辑销售计划'
      },
      sortable: null,
      salePlan: null,
      temp: {},
      brands: [],
      editRowDate: null
    }
  },
  created() {
    this.editRowDate = null
    this.getBrands()
    // this.getList(1)
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
      this.listLoading = false
    },

    async getBrands() {
      const { data } = await getBrandEnum()
      this.brands = data
    },

    handleRowClick(row, column, cell, event) {
      if (column.property === 'actualData') {
        if (this.editRowDate !== row.date) {
          this.editRowDate = row.date
          console.log(this.editRowDate)
          this.key = Math.random() * 100
        }
      }
    },
    handleInputChange(row) {
      row.modify = true
      this.dataModify = true
    },
    submitModifySaleData() {
      const modifyDataList = []
      this.dataModify = false
      for (let i = 0; i < this.list.length; i++) {
        const row = this.list[i]
        if (row.modify) {
          row.modify = false
          row.salePlanId = this.salePlan.id
          row.type = 0
          modifyDataList.push(row)
        }
      }
      this.editRowDate = null
      batchUpdateSaleData(modifyDataList).then(res => {
        if (res.data) {
          this.$message.success('修改已提交')
        }
      })
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
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d{
  margin-top: 15px;
}

.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
