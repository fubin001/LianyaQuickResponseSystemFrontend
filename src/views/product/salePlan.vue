<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.brandName" placeholder="品牌名" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.productName" placeholder="品牌名" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.styleId" placeholder="款式编号" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.skuId" placeholder="skuId" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.name" placeholder="计划名称" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-select v-model="listQuery.saleType" placeholder="产品线" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item">
        <el-option label="MFO" value="MFO" />
        <el-option label="MFE" value="MFE" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" style=" margin: 5px 8px 5px 0" @click="getList(1)">
        搜索
      </el-button>
    </div>

    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" prop="id" width="65" />
      <el-table-column align="left" label="计划名称" prop="name" width="180" />
      <el-table-column align="left" label="产品线" prop="saleType" width="180" />
      <el-table-column align="left" label="商品名" prop="name" width="180" />
      <el-table-column align="left" label="品牌名" prop="brandName" width="180" />
      <el-table-column align="left" label="款式编号" prop="styleId" width="180" />
      <el-table-column align="left" label="类别" prop="category" width="180" />
      <el-table-column align="left" label="skuId" prop="skuId" width="180" />
      <el-table-column align="left" label="oldSkuId" prop="oldSkuId" width="180" />
      <el-table-column align="left" label="开始时间" prop="launchDate" width="180" />
      <el-table-column align="left" label="结束时间" prop="endDate" width="180" />
      <el-table-column align="left" label="第一周时间" prop="firstOfWeek" width="180" />
      <el-table-column align="left" label="统计维度" width="70">
        <template slot-scope="{row}">
          <span v-if="row.saleTimeUnit === 0">天</span>
          <span v-else-if="row.saleTimeUnit===1">周</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" type="danger" @click="deleteSalePlan(row)">
            删除
          </el-button>
          <el-button type="success" size="mini" @click="goSalePanel(row)">
            预览
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
import { deleteSalePlanById, querySalePlan, saveOrUpdateSalePlan } from '@/api/salePlan'

export default {
  name: 'User',
  data() {
    return {
      dialogStatus: 'create',
      dialogFormVisible: false,
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
        'create': '新增销售计划',
        'update': '编辑销售计划'
      },
      sortable: null,
      temp: {},
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
      const { data, total } = await querySalePlan(this.listQuery)
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

    deleteSalePlan(row) {
      deleteSalePlanById(row.id).then(res => {
        if (res.data) {
          this.$message.success('删除成功')
          this.getList(this.page)
        } else {
          this.$message.error('删除失败')
        }
      })
    },

    goSalePanel(row) {
      this.$router.push({
        path: '/product/saleDataPanel',
        query: {
          salePlanId: row.id
        }
      })
    },

    async getBrands() {
      const { data } = await getBrandEnum()
      this.brands = data
    },

    saveOrUpdate(status, data) {
      if (status === 'create') {
        data.id = null
      }

      saveOrUpdateSalePlan(data).then(res => {
        if (res.data) {
          this.$message.success('操作成功')
          this.getList(this.page)
        }
        this.dialogFormVisible = false
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
