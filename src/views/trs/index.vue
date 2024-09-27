<template>
  <div class="app-container">
    <div class="filter-container">
      面料编码：<el-input v-model="search.trsNo" placeholder="请输入面料编码" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />

      <el-button type="primary" icon="el-icon-search" style="margin: 5px 8px 5px 0; background-color: #244496; float: right" @click="onrefresh()">
        更新
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin: 5px 8px 5px 0; background-color: #244496; float: right" @click="onsearch()">
        搜索
      </el-button>

    </div>

    <div class="table-list">
      <el-table ref="dragTable" v-loading="listLoading" :data="list" header-cell-class-name="custom-header-cell" height="650px" style="width: 100%">
        <el-table-column align="center" label="面料中文描述" width="120" prop="trsName" fixed="left" />
        <el-table-column align="center" label="面料编码" width="120" prop="trsNo" fixed="left" />
        <el-table-column align="center" label="计划总订单" width="90" prop="planSumOrder" />
        <el-table-column align="center" label="首单数量" width="80" prop="firstOrderQty" />
        <el-table-column align="center" label="计划追加数量" width="110" prop="planAddtoQty" />
        <el-table-column align="center" label="实际追加" width="80" prop="practicalAddtoQty" />
        <el-table-column align="center" label="实际数量" width="80" prop="practicalQty" />
        <el-table-column align="center" label="预计Sale Qty" width="120" prop="predictSaleQty" />
        <el-table-column align="center" label="实际季末 Qty" width="120" prop="practicalEosSaleQty" />
        <el-table-column align="center" label="YTD" width="90" prop="ytd" />
        <el-table-column align="center" label="YTD ST%" width="90" prop="ytdRatio" :formatter="formatPercentage" />
        <el-table-column align="center" label="首单 ST%" width="90" prop="firstRatio" :formatter="formatPercentage" />
        <el-table-column align="center" label="预计 ST%" width="90" prop="predictRatio" :formatter="formatPercentage" />
        <el-table-column align="center" label="实际 ST%" width="90" prop="practicalRatio" :formatter="formatPercentage" />
        <el-table-column align="center" label="本周销量" width="80" prop="thisWeekSaleQty" />
        <el-table-column align="center" label="上周销量" width="80" prop="lastWeekSaleQty" />
        <el-table-column align="center" label="周环比%" width="80" prop="weekNoWeekRatio" :formatter="formatPercentage" />
      </el-table>
      <el-pagination
        :current-page="search.current"
        :page-sizes="[10, 20, 30, 100]"
        :page-size="search.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="search.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
// import { query } from '@/api/brand'
import { query, refresh } from '@/api/skuTrs.js'

export default {
  name: 'TrsData',
  data() {
    return {
      list: [],
      total: null,
      listLoading: true,
      search: {
        trsNo: '',
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onsearch() {
      this.search.page = 1
      this.getList()
    },
    async getList() {
      // this.listQuery.page = this.page
      // this.listQuery.size = this.size
      const { data, total } = await query(this.search)
      this.list = data
      this.search.total = total
      this.listLoading = false
    },
    onrefresh() {
      refresh()
    },
    formatPercentage(row, column, cellValue) {
      // 将小数转换为百分比并保留两位小数!
      // var ration= ( ? 1:2)
      return cellValue != null ? `${(cellValue * 100).toFixed(2)}%` : null
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.search.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.search.page = val
      this.getList()
    }
  }
}
</script>

  <style>

  /* 在你的 CSS 文件或者 <style> 标签中定义这个样式 */
  .custom-header-cell {
    background-color:#409EFF !important;; /* 你想要的背景颜色 */
    color: #333; /* 你想要的文字颜色 */
    font-weight: bold; /* 其他样式 */
    text-align: center; /* 文字居中 */
  }
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
