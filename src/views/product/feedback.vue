<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.skuId" placeholder="skuId" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" style=" margin: 5px 8px 5px 0" @click="getList(1)">
        搜索
      </el-button>
      <!--      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin: 5px 8px 5px 0" @click="beforeCreate">-->
      <!--        增加-->
      <!--      </el-button>-->
    </div>

    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" prop="id" width="65" />
      <el-table-column align="left" label="skuId" prop="skuId" />
      <el-table-column align="left" label="订货日期" prop="bookDate" />
      <el-table-column align="left" label="预计到货" prop="predictDate" />
      <el-table-column align="left" label="确认到货" prop="confirmDate" />
      <el-table-column align="left" label="订货数量" prop="quantity" />
      <el-table-column align="left" label="颜色" prop="color" />
      <el-table-column align="left" label="颜色名称" prop="colorName" />
      <el-table-column align="left" label="销售YTD" prop="ytd" />
      <el-table-column align="left" label="库存量" prop="storage" />
      <el-table-column align="left" label="YTD售罄率" prop="ytdSaleOutRate">
        <template slot-scope="{row}">
          {{ new Number(row.ytdSaleOutRate * 100).toFixed(2) }} %
        </template>
      </el-table-column>
      <el-table-column align="left" label="首单售罄率" prop="firstOrderSaleOut">
        <template slot-scope="{row}">
          {{ new Number(row.firstOrderSaleOut * 100).toFixed(2) }} %
        </template>
      </el-table-column>
      <el-table-column align="left" label="预计最终销售" prop="predictFinalSale" />
      <el-table-column align="left" label="剩余预计销售" prop="restSale" />
      <el-table-column align="left" label="预计最终售罄率" prop="predictFinalSaleOut">
        <template slot-scope="{row}">
          {{ new Number(row.predictFinalSaleOut * 100).toFixed(2) }} %
        </template>
      </el-table-column>
      <el-table-column align="left" label="上周销售" prop="lastWeekSale" />
      <el-table-column align="left" label="本周销售" prop="currentWeekSale" />
      <el-table-column align="left" label="最近四周销售" prop="recentlyFourWeekSale" />
      <el-table-column align="left" label="最近四周销售平均" prop="recentlyFourWeekAvgSale" />
      <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="success" size="mini" @click="confirmFeedbackOrder(row)">
            确认到货
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      :current-page="page"
      :page-size="size"
      align="center"
      @size-change="getList(page)"
      @current-change="getList(page)"
    />

  </div>
</template>

<script>

import { getBrandEnum } from '@/api/enum'
import { saveOrUpdateSalePlan } from '@/api/salePlan'
import { confirmFeedback, queryFeedbackOrder } from '@/api/feedback'

export default {
  name: 'User',
  data() {
    return {
      dialogStatus: 'create',
      dialogFormVisible: false,
      salePlanDialogFormVisible: false,
      page: 1,
      size: 10,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10
      },
      titleMap: {
        'create': '新增商品',
        'update': '编辑商品'
      },
      sortable: null,
      temp: {},
      salePlanForm: {},
      brands: []
    }
  },
  created() {
    this.getBrands()
    this.getList(1)
  },
  methods: {
    async getList(page) {
      this.listQuery.page = page
      this.listQuery.size = this.size
      this.listLoading = true
      const { data, total } = await queryFeedbackOrder(this.listQuery)
      this.list = data
      this.total = total
      this.listLoading = false
    },

    async getBrands() {
      const { data } = await getBrandEnum()
      this.brands = data
    },

    confirmFeedbackOrder(row) {
      confirmFeedback(row.id).then(res => {
        if (res.data) {
          this.$message.success('已确认')
          this.getList(this.page)
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
</style>
