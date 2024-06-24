
<template>
  <div class="app-container">
    <div class="filter-container" style="">
      <span>
        品牌名称：<el-input
          v-model="listQuery.brandName"
          placeholder="请输入品牌名称"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        /></span>
      <span>商品名称：<el-input
        v-model="listQuery.productName"
        placeholder="请输入商品名称"
        style="width: 150px; margin: 5px 8px 5px 0"
        class="filter-item"
      /></span>
      <span>货号：<el-input
        v-model="listQuery.skuId"
        placeholder="请输入货号"
        style="width: 150px; margin: 5px 8px 5px 0"
        class="filter-item"
      /></span>
      <span class="end">
        <span><el-button
                class="filter-item"
                plain
                style="margin: 5px 8px 5px 0"
                @click="reset"
              >
                重置
              </el-button>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            style="margin: 5px 0px 5px 0; background-color: #244496"
            @click="getList(1)"
          >
            搜索
          </el-button></span>
      </span>
      <div style="clear:both" />
    </div>

    <div class="table-list">
      <div style="height: 2rem; line-height: 2rem; padding: 0 0.3rem;">
        <span style="float: left;">商品列表</span>
        <span style="float: right;">
          <span style="text-align: right">
            <el-upload
              action="/api/buyOrder/importExcel"
              style="display: inline-block"
              :show-file-list="false"
              :on-success="handleFileUploadSuccess"
              :on-error="handleFileUploadError"
              :on-progress="onProgress"
            >

              <el-button
                type="primary"
                class="ml-5"
                style="background-color: #244496"
                size="mini"
                :loading="upLoading"
              >上传<i
                class="el-icon-top"
              /></el-button>
            </el-upload>
          </span>
        </span>
      </div>

      <el-table
        ref="dragTable"
        v-loading="listLoading"
        :data="list"
        row-key="id"
        fit
        :header-cell-style="{background:'#e4e7f0'}"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          align="center"
          label="序号"
          width="55"
          type="index"
          :index="Nindex"
        />
        <el-table-column
          prop="skuId"
          align="left"
          label="货号"
          :width="flexColumnWidth('货号', 'skuId')"
        />
        <el-table-column
          prop="productName"
          align="left"
          label="商品名称"
          :width="flexColumnWidth('商品名称', 'productName')"
        />
        <el-table-column
          prop="brandName"
          align="left"
          label="品牌名称"
          :width="flexColumnWidth('品牌名称', 'brandName')"
        />
        <el-table-column
          prop="colorSize"
          align="left"
          label="色-尺"
          :width="flexColumnWidth('色-尺', 'colorSize')"
        />
        <el-table-column
          prop="firstCode"
          align="left"
          label="第一条码"
          :width="flexColumnWidth('第一条码', 'firstCode')"
        />
        <el-table-column
          prop="colorName"
          align="left"
          label="颜色名称"
          :width="flexColumnWidth('颜色名称', 'colorName')"
        />
        <el-table-column
          prop="color"
          align="left"
          label="颜色"
          :width="flexColumnWidth('颜色', 'color')"
        />
        <el-table-column
          prop="size"
          align="left"
          label="尺寸"
          :width="flexColumnWidth('尺寸', 'size')"
        />
        <el-table-column
          prop="orderId"
          align="left"
          label="订单号"
          :width="flexColumnWidth('订单号', 'orderId')"
        />
        <el-table-column
          prop="boxId"
          align="left"
          label="箱号"
          :width="flexColumnWidth('箱号', 'boxId')"
        />
        <el-table-column
          prop="bookDate"
          align="left"
          label="订货日"
          :width="flexColumnWidth('商品名称', 'bookDate')"
        />
        <el-table-column
          prop="code"
          align="left"
          label="代号"
          :width="flexColumnWidth('代号', 'code')"
        />
        <el-table-column
          prop="name"
          align="left"
          label="名称"
          :width="flexColumnWidth('名称', 'name')"
        />
        <el-table-column
          prop="quantity"
          align="left"
          label="数量"
          :width="flexColumnWidth('数量', 'quantity')"
        />
        <el-table-column
          prop="brandPrice"
          align="left"
          label="品牌价"
          :width="flexColumnWidth('品牌价', 'brandPrice')"
        />
        <el-table-column
          prop="brandQuantity"
          align="left"
          label="牌价额"
          :width="flexColumnWidth('牌价额', 'brandQuantity')"
        />
        <el-table-column
          prop="price"
          align="left"
          label="计算价"
          :width="flexColumnWidth('计算价', 'price')"
        />
        <el-table-column
          prop="cutOffRate"
          align="left"
          label="折扣"
          :width="flexColumnWidth('折扣', 'cutOffRate')"
        />
        <el-table-column
          prop="settlementAmount"
          align="left"
          label="结算价"
          :width="flexColumnWidth('结算价', 'settlementAmount')"
        />
        <el-table-column
          prop="regionConfirm"
          align="left"
          label="地区确认"
          :width="flexColumnWidth('地区确认', 'regionConfirm')"
        />
        <el-table-column
          prop="headquartersConfirm"
          align="left"
          label="总部确认"
          :width="flexColumnWidth('总部确认', 'headquartersConfirm')"
        />
        <el-table-column
          prop="transferItems"
          align="left"
          label="过账"
          :width="flexColumnWidth('过账', 'transferItems')"
        />
        <el-table-column
          prop="oldOrderId"
          align="left"
          label="原订单"
          :width="flexColumnWidth('原订单', 'oldOrderId')"
        />
        <el-table-column
          prop="contractOrderId"
          align="left"
          label="合同单号"
          :width="flexColumnWidth('计合同单号算价', 'contractOrderId')"
        />
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
  </div>
</template>

<script>
import { queryBuyOrder } from '@/api/buyOrder'

export default {
  name: 'User',
  data() {
    return {
      list: [],
      total: null,
      page: 1,
      size: 10,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10
      },
      sortable: [],
      upLoading: false
    }
  },
  created() {
    this.getList(1)
  },
  methods: {
    reset() {
      this.listQuery = {
        page: 1,
        size: 10
      }
    },
    getMaxLength(arr) {
      return arr.reduce((acc, item) => {
        if (item) {
          const calcLen = this.getTextWidth(item)
          if (acc < calcLen) {
            acc = calcLen
          }
        }
        return acc
      }, 0)
    },

    getTextWidth(str) {
      let width = 0
      const html = document.createElement('span')
      html.innerText = str
      html.className = 'getTextWidth'
      document.querySelector('body').appendChild(html)
      width = document.querySelector('.getTextWidth').offsetWidth
      document.querySelector('.getTextWidth').remove()
      return width
    },
    /**
     * el-table-column 自适应列宽
     * @param prop_label: 表名
     * @param table_data: 表格数据
     */
    flexColumnWidth(label, prop) {
      // console.log('label', label)
      // console.log('prop', prop)
      // 1.获取该列的所有数据
      const arr = this.list.map((x) => x[prop])
      arr.push(label) // 把每列的表头也加进去算
      // console.log(arr)
      // 2.计算每列内容最大的宽度 + 表格的内间距（依据实际情况而定）
      return this.getMaxLength(arr) + 25 + 'px'
    },

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
      console.log('上传成功')
      if (res.data) {
        console.log(res)
        this.$message.success('上传成功')
        this.upLoading = false
        this.load()
      } else {
        this.$message.error('上传失败')
        this.upLoading = false
      }
    },
    handleFileUploadError() {
      console.log('上传失败')
      this.$message.error('上传失败')
      this.upLoading = false
    },

    onProgress(){
      this.upLoading = true
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
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>

<style lang="scss" scoped>
.app-container {
  background-color: #f7f8fc;

  .filter-container {
    background-color: #ffffff;
    padding: 10px;
    margin-bottom: 10px;

    span{
      float: left;
      width: 240px;
      text-align: end;
    }

    .end{
      float: right;
    }
  }

  .table-list {
    background-color: #ffffff;
    padding: 10px;
  }
}

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
