
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.brand" placeholder="品牌名" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.styleId" placeholder="款式" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.fullName" placeholder="名称" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.skuId" placeholder="skuId" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-date-picker v-model="listQuery.listingMonth" type="month" placeholder="上市日期" class="filter-item" style="width: 150px; margin: 5px 8px 5px 0" value-format="yyyy-MM-01" />
      <el-input v-model="listQuery.season" placeholder="季节" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.fabricCode" placeholder="面料编码" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.fabricComposition" placeholder="面料组成" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" style=" margin: 5px 8px 5px 0" @click="getList(1)">
        搜索
      </el-button>
      <el-upload
        action="/api/skuProduct/importExcel"
        :show-file-list="false"
        :on-success="handleFileUploadSuccess"
        style="display: inline-block"
      >
        <el-button type="primary" class="ml-5" style="margin-left: 10px">上传<i class="el-icon-top" /></el-button>
      </el-upload>
    </div>

    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
      <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="success" size="mini" @click="goSalePanel(row)">
            预览
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="序号" width="65" type="index" :index="Nindex" />
      <el-table-column label="基础属性">
        <el-table-column prop="brand" label="品牌" width="100" />
        <el-table-column prop="styleId" align="left" width="110" label="款式" />
        <el-table-column prop="skuId" align="left" width="130" label="货号" />
        <el-table-column prop="color" align="left" width="70" label="颜色" />
        <el-table-column prop="fullName" align="left" label="名称" />
        <el-table-column prop="listingDate" align="left" width="120" label="上市日期" />
        <el-table-column prop="season" align="left" width="80" label="季节" />
        <el-table-column prop="subCategory" align="left" label="商品子类" />
        <el-table-column prop="fabricCode" align="left" width="120" label="面料编码" />
        <el-table-column prop="fabricComposition" align="left" label="面料成分" />
      </el-table-column>
      <el-table-column label="关联指标" width="240px">
        <template slot-scope="{row}">
          <div v-for="metric in row.metricValueList" :key="metric.metricName">
            <div class="metric-name">{{ metric.metricName }}</div>:<div style="float:right" class="metric-value">{{ metric.metricValue }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <el-table :data="[row]">
            <el-table-column prop="supplier" align="left" label="供货商" />
            <el-table-column prop="standardPrice" align="left" label="标准价" />
            <el-table-column prop="year" align="left" label="年" />
            <el-table-column prop="season" align="left" label="季" />
            <el-table-column prop="gender" align="left" label="性别" />
            <el-table-column prop="enName" align="left" label="英文名" />
            <el-table-column prop="gbCode" align="left" label="国标码" />
            <el-table-column prop="boxId" align="left" label="箱号" />
            <el-table-column prop="fabric_code" align="left" label="面料编码" />
            <el-table-column prop="fabric_composition" align="left" label="面料组成" />
            <el-table-column prop="auxiliary_material_code" align="left" label="面料编码" />
            <el-table-column prop="auxiliary_material_composition" align="left" label="面料组成" />
            <el-table-column prop="category" align="left" label="类别" />
            <el-table-column prop="productCategory" align="left" label="商品类别" />
            <el-table-column prop="productLine" align="left" label="产品线" />
            <el-table-column prop="series" align="left" label="系列" />
            <el-table-column prop="productType" align="left" label="商品类别" />
            <el-table-column prop="subCategory" align="left" label="商品子类" />
            <el-table-column prop="thirdCategory" align="left" label="三次类目" />
            <el-table-column prop="producer" align="left" label="产地" />
            <el-table-column prop="businessCategory" align="left" label="产地" />
            <el-table-column prop="collection" align="left" label="collection" />
            <el-table-column prop="gender" align="left" label="性别" />
            <el-table-column prop="unit" align="left" label="单位" />
          </el-table>
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<!--  </template>-->

<script>

import { querySkuProduct } from '@/api/skuProduct'

export default {
  name: 'User',
  data() {
    return {
      list: [],
      total: 0,
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
      const { data, total } = await querySkuProduct(this.listQuery)
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
    },
    goSalePanel(row) {
      this.$router.push({
        path: '/product/saleProductPanel',
        query: {
          salePlanId: row.skuId
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
.metric-name {
  width: 150px;
  font-weight: bold; /* 设置字体*/
  float: left;
}

.metric-value {
  color: red; /* 设置字体颜色为红色 */
  font-weight: bold; /* 设置字体*/
  float: left;
}
</style>
