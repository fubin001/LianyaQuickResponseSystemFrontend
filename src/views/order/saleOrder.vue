
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.brand" placeholder="品牌名" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.productName" placeholder="商品名" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.skuId" placeholder="货号" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" style=" margin: 5px 8px 5px 0" @click="getList(1)">
        搜索
      </el-button>
      <el-upload
        action="/api/saleOrder/importExcel"
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
      <el-table-column prop="brand" align="left" label="品牌名称" />
      <el-table-column prop="colorSize" align="left" label="色-尺" />
      <el-table-column prop="colorName" align="left" label="颜色名称" />
      <el-table-column prop="color" align="left" label="颜色" />
      <el-table-column prop="size" align="left" label="尺寸" />
      <el-table-column prop="firstCode" align="left" label="第一条码" />
      <el-table-column prop="orderId" align="left" label="订单号" />
      <el-table-column prop="saler" align="left" label="售货员" />
      <el-table-column prop="date" align="left" label="日期" />
      <el-table-column prop="code" align="left" label="代号" />
      <el-table-column prop="name" align="left" label="名称" />
      <el-table-column prop="quantity" align="left" label="数量" />
      <el-table-column prop="brandPrice" align="left" label="品牌价" />
      <el-table-column prop="brandPriceQuantity" align="left" label="牌价额" />
      <el-table-column prop="currentPrice" align="left" label="当前价格" />
      <el-table-column prop="currentPriceAmount" align="left" label="当前价格额度" />
      <el-table-column prop="singlePrice" align="left" label="单剧价" />
      <el-table-column prop="singlePriceAmount" align="left" label="单剧价额度" />
      <el-table-column prop="confirm" align="left" label="确认" />
      <el-table-column prop="category" align="left" label="类别" />
      <el-table-column prop="transferItem" align="left" label="过账" />
      <el-table-column prop="salePlatform" align="left" label="销售平台" />
      <el-table-column prop="oldOrderId" align="left" label="原单号" />
      <el-table-column prop="discountPrice" align="left" label="折后价" />
      <el-table-column prop="discountPriceAmount" align="left" label="折后价额" />
      <el-table-column prop="settlementPrice" align="left" label="结算价" />
      <el-table-column prop="settlementPriceAmount" align="left" label="结算价额" />
      <el-table-column prop="settlementPayAmount" align="left" label="结算收款额" />
      <el-table-column prop="payPointAmount" align="left" label="收款积分额" />
      <el-table-column prop="cardNumber" align="left" label="卡号" />
      <el-table-column prop="payNetworkSite" align="left" label="收款网点" />
      <el-table-column prop="priceOrder" align="left" label="价格单" />
      <el-table-column prop="promotionInfo" align="left" label="营销信息" />
      <el-table-column prop="nickName" align="left" label="昵称" />
      <el-table-column prop="tradeOrderId" align="left" label="交易订单号" />
      <el-table-column prop="systemOrderId" align="left" label="系统订单号" />
      <el-table-column prop="oldTradeOrderId" align="left" label="原交易订单号" />
      <el-table-column prop="saleChannel" align="left" label="销售渠道" />
      <el-table-column prop="saleSubCategory" align="left" label="销售细类" />
      <el-table-column prop="takeGoodCategory" align="left" label="提货" />
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

import { querySaleOrder } from '@/api/saleOrder'

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
      const { data, total } = await querySaleOrder(this.listQuery)
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
.sortable-ghost {
  opacity: .8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>

<style scoped>
.icon-star {
  margin-right: 2px;
}

.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.show-d {
  margin-top: 15px;
}
</style>
