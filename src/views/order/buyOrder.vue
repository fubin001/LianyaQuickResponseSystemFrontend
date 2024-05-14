
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.brandName" placeholder="品牌名" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.productName" placeholder="商品名" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />\
      <el-input v-model="listQuery.skuId" placeholder="货号" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" style=" margin: 5px 8px 5px 0" @click="getList(1)">
        搜索
      </el-button>
      <el-upload
        action="/api/buyOrder/importExcel"
        :show-file-list="false"
        :on-success="handleFileUploadSuccess"
        style="display: inline-block"
      >
        <el-button type="primary" class="ml-5" style="margin-left: 10px">上传<i class="el-icon-top" /></el-button>
      </el-upload>
    </div>

    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="65" type="index" :index="Nindex" />
      <el-table-column prop="skuId" align="left" label="货号" />
      <el-table-column prop="productName" align="left" label="商品名称" />
      <el-table-column prop="brandName" align="left" label="品牌名称" />
      <el-table-column prop="colorSize" align="left" label="色-尺" />
      <el-table-column prop="firstCode" align="left" label="第一条码" />
      <el-table-column prop="colorName" align="left" label="颜色名称" />
      <el-table-column prop="color" align="left" label="颜色" />
      <el-table-column prop="size" align="left" label="尺寸" />
      <el-table-column prop="orderId" align="left" label="订单号" />
      <el-table-column prop="boxId" align="left" label="箱号" />
      <el-table-column prop="bookDate" align="left" label="订货日" />
      <el-table-column prop="code" align="left" label="代号" />
      <el-table-column prop="name" align="left" label="名称" />
      <el-table-column prop="quantity" align="left" label="数量" />
      <el-table-column prop="brandPrice" align="left" label="品牌价" />
      <el-table-column prop="brandQuantity" align="left" label="牌价额" />
      <el-table-column prop="price" align="left" label="计算价" />
      <el-table-column prop="cutOffRate" align="left" label="折扣" />
      <el-table-column prop="settlementAmount" align="left" label="结算价" />
      <el-table-column prop="regionConfirm" align="left" label="地区确认" />
      <el-table-column prop="headquartersConfirm" align="left" label="总部确认" />
      <el-table-column prop="transferItems" align="left" label="过账" />
      <el-table-column prop="oldOrderId" align="left" label="原订单" />
      <el-table-column prop="contractOrderId" align="left" label="合同单号" />
    </el-table>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      :current-page="page"
      :page-size="size"
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<!--  </template>-->

<script>

import { queryBuyOrder } from '@/api/buyOrder'

export default {
  name: 'User',
  data() {
    return {
      list: null,
      total: null,
      page: 1,
      size: 10,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10
      },
      sortable: null
    }
  },
  created() {
    this.getList(1)
  },
  methods: {
    async getList(page) {
      console.log(this.page)
      console.log(this.size)
      this.listQuery.page = page
      this.listQuery.size = this.size
      const { data, total } = await queryBuyOrder(this.listQuery)
      this.list = data
      this.total = total
      this.listLoading = false
    },

    handleFileUploadSuccess(res) {
      if (res.data) {
        console.log(res)
        this.$message.success('上传成功')
        this.load()
      } else {
        this.$message.error('上传失败')
      }
    },

    handleSizeChange(pageSize) {
      this.size = pageSize
      this.getList(1)
    },
    handleCurrentChange(pageNum) {
      this.page = pageNum
      this.getList(this.page)
    },
    Nindex(index) {
      const page = this.page
      const size = this.size
      return index + 1 + (page - 1) * size
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
