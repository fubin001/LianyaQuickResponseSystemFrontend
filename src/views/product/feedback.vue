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
      <el-table-column align="left" label="到货日期" prop="predictDate" />
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
import { queryFeedbackOrder } from '@/api/feedback'

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

    beforeCreate() {
      this.temp = {}
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },

    beforeUpdate(row) {
      this.temp = JSON.parse(JSON.stringify(row))
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },

    deleteProduct(row) {
      deleteProductById(row.id).then(res => {
        if (res.data) {
          this.$message.success('删除成功')
          this.getList(this.page)
        } else {
          this.$message.error('删除失败')
        }
      })
    },

    beforeCreateNewSalePlan(row) {
      this.salePlanForm = JSON.parse(JSON.stringify(row))
      this.salePlanForm.productName = this.salePlanForm.name
      this.salePlanForm.productId = this.salePlanForm.id
      this.salePlanForm.name = null
      this.salePlanDialogFormVisible = true
    },

    async getBrands() {
      const { data } = await getBrandEnum()
      this.brands = data
    },

    createOrUpdateProduct(status, data) {
      if (status === 'create') {
        data.id = null
      }
      for (let i = 0; i < this.brands.length; i++) {
        const brand = this.brands[i]
        if (brand.value === data.brandId) {
          data.brandName = brand.name
        }
      }
      saveOrUpdateProduct(data).then(res => {
        if (res.data) {
          this.$message.success('操作成功')
          this.getList(this.page)
        }
        this.dialogFormVisible = false
      })
    },
    createOrUpdateSalePlan(status, data) {
      if (status === 'create') {
        data.id = null
      }

      saveOrUpdateSalePlan(data).then(res => {
        if (res.data) {
          this.$message.success('操作成功')
          this.getList(this.page)
        }
        this.salePlanDialogFormVisible = false
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
