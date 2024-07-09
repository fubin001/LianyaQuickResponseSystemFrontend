<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.brandName" placeholder="品牌名" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.styleId" placeholder="款式编号" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.name" placeholder="商品名" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.skuId" placeholder="skuId" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" style=" margin: 5px 8px 5px 0" @click="getList(1)">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin: 5px 8px 5px 0" @click="beforeCreate">
        增加
      </el-button>
    </div>

    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" prop="id" width="65" />
      <el-table-column align="left" label="商品名" prop="name" width="180" />
      <el-table-column align="left" label="品牌名" prop="brandName" width="180" />
      <el-table-column align="left" label="款式编号" prop="styleId" width="180" />
      <el-table-column align="left" label="类别" prop="categoryType" width="180" />
      <el-table-column align="left" label="skuId" prop="skuId" width="180" />
      <el-table-column align="left" label="旧skuId" prop="oldSkuId" width="180" />

      <el-table-column label="操作" align="center" min-width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="warning" size="mini" @click="beforeUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="deleteProduct(row)">
            删除
          </el-button>
          <el-button type="success" size="mini" @click="beforeCreateNewSalePlan(row)">
            新建销售计划
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

    <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 300px; margin-left:50px;">
        <el-form-item v-if="dialogStatus==='update'" label="商品id" prop="id">
          <el-input v-model="temp.id" style="width: 300px" disabled />
        </el-form-item>
        <el-form-item label="商品名称" prop="id">
          <el-input v-model="temp.name" style="width: 300px" />
        </el-form-item>
        <el-form-item label="品牌名称" prop="brandId">
          <el-select v-model="temp.brandId" class="filter-item" clearable filterable placeholder="请选择" style="width: 300px">
            <el-option v-for="item in brands" :key="item.name" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="款式编号" prop="styleId">
          <el-input v-model="temp.styleId" style="width: 300px" />
        </el-form-item>
        <el-form-item label="类别" prop="categoryType">
          <el-input v-model="temp.categoryType" style="width: 300px" />
        </el-form-item>
        <el-form-item label="skuId" prop="styleId">
          <el-input v-model="temp.skuId" style="width: 300px" />
        </el-form-item>
        <el-form-item label="旧skuId" prop="oldSkuId">
          <el-input v-model="temp.oldSkuId" style="width: 300px" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createOrUpdateProduct(dialogStatus, temp)">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="新建销售计划" :visible.sync="salePlanDialogFormVisible" width="500px">
      <el-form ref="salePlanDataForm" :model="salePlanForm" label-position="left" label-width="70px" style="width: 300px; margin-left:50px;">
        <el-form-item label="商品id" prop="id">
          <el-input v-model="salePlanForm.id" style="width: 300px" disabled />
        </el-form-item>
        <el-form-item label="商品名称" prop="id">
          <el-input v-model="salePlanForm.productName" style="width: 300px" disabled />
        </el-form-item>
        <el-form-item label="品牌名称" prop="id">
          <el-input v-model="salePlanForm.brandName" style="width: 300px" disabled />
        </el-form-item>
        <el-form-item label="款式编号" prop="styleId">
          <el-input v-model="salePlanForm.styleId" style="width: 300px" disabled />
        </el-form-item>
        <el-form-item label="skuId" prop="skuId">
          <el-input v-model="salePlanForm.skuId" style="width: 300px" disabled />
        </el-form-item>
        <el-form-item label="旧skuId" prop="oldSkuId">
          <el-input v-model="salePlanForm.oldSkuId" style="width: 300px" />
        </el-form-item>
        <el-form-item label="计划名称" prop="name">
          <el-input v-model="salePlanForm.name" style="width: 300px" />
        </el-form-item>
        <el-form-item label="产品线" prop="saleType">
          <el-select v-model="salePlanForm.saleType" clearable filterable placeholder="产品线" style="width: 300px; margin: 5px 8px 5px 0">
            <el-option label="MFO" value="MFO" />
            <el-option label="MFE" value="MFE" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="launchDate">
          <el-date-picker v-model="salePlanForm.launchDate" style="width: 300px" />
        </el-form-item>
        <el-form-item label="结束时间" prop="endDate">
          <el-date-picker v-model="salePlanForm.endDate" style="width: 300px" />
        </el-form-item>
        <el-form-item label="单位时间" prop="saleTimeUnit">
          <el-select v-model="salePlanForm.saleTimeUnit" clearable style="width: 300px; margin: 5px 8px 5px 0">
            <el-option label="周" value="1" />
            <el-option label="天" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="反馈周期" prop="responseDuration">
          <el-input v-model="salePlanForm.responseDuration" style="width: 300px" />
        </el-form-item>
        <el-form-item label="库存预警" prop="storageLowerBound">
          <el-input v-model="salePlanForm.storageLowerBound" style="width: 300px" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="salePlanDialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createOrUpdateSalePlan('create', salePlanForm)">
          确定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import { deleteProductById, queryProduct, saveOrUpdateProduct } from '@/api/product'
import { getBrandEnum } from '@/api/enum'
import { saveOrUpdateSalePlan } from '@/api/salePlan'

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
      const { data, total } = await queryProduct(this.listQuery)
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
