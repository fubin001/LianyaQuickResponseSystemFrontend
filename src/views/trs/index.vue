<template>
  <div class="app-container">
    <div class="filter-container">
      品牌名：
      <el-input v-model="listQuery.name" placeholder="请输入品牌名" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin: 5px 8px 5px 0; background-color: #244496; float: right" @click="getList(1)">
        搜索
      </el-button>
    </div>

    <div class="table-list">
      <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" fit highlight-current-row :header-cell-style="{ background: '#e4e7f0' }" style="width: 90%">
        <el-table-column align="center" label="面料中文描述" width="110" type="index" :index="getIndex" />
        <el-table-column align="center" label="面料编码" width="80" type="index" :index="getIndex" />
        <el-table-column align="center" label="计划总订单" width="90" type="index" :index="getIndex" />
        <el-table-column align="center" label="首单数量" width="80" type="index" :index="getIndex" />
        <el-table-column align="center" label="计划追加数量" width="110" type="index" :index="getIndex" />
        <el-table-column align="center" label="追加数量1" width="90" type="index" :index="getIndex" />
        <el-table-column align="center" label="追加数量2" width="90" type="index" :index="getIndex" />
        <el-table-column align="center" label="追加数量?" width="90" type="index" :index="getIndex" />
        <el-table-column align="center" label="实际追加" width="80" type="index" :index="getIndex" />
        <el-table-column align="center" label="实际数量" width="80" type="index" :index="getIndex" />
        <el-table-column align="center" label="预计Sale Qty" width="120" type="index" :index="getIndex" />
        <el-table-column align="center" label="实际季末 Qty" width="120" type="index" :index="getIndex" />
        <el-table-column align="center" label="YTD" width="90" type="index" :index="getIndex" />
        <el-table-column align="center" label="YTD ST%" width="90" type="index" :index="getIndex" />
        <el-table-column align="center" label="首单 ST%" width="90" type="index" :index="getIndex" />
        <el-table-column align="center" label="预计 ST%" width="90" type="index" :index="getIndex" />
        <el-table-column align="center" label="实际 ST%" width="90" type="index" :index="getIndex" />
        <el-table-column align="center" label="本周销量" width="80" type="index" :index="getIndex" />
        <el-table-column align="center" label="上周销量" width="80" type="index" :index="getIndex" />
        <el-table-column align="center" label="周环比%" width="80" type="index" :index="getIndex" />
        <el-table-column prop="name" width="180px" align="center" label="test">
          <template slot-scope="scope">
            <el-link type="primary" @click="onDialog(scope.row.name)">
              {{ scope.row.name }}
            </el-link>
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
  </div>
</template>

<script>
import { query } from '@/api/brand'

export default {
  name: 'TrsData',
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
      sortable: null
    }
  },
  created() {
    this.getList(1)
  },
  methods: {
    async getList(page) {
      this.listQuery.page = page
      this.listQuery.size = this.size
      const { data, total } = await query(this.listQuery)
      this.list = data
      this.total = total
      this.listLoading = false
    },

    getIndex(index) {
      const page = this.page
      const size = this.size
      return index + 1 + (page - 1) * size
    },

    onDialog(brand) {
      this.$router.push({ path: '/skuProduct/info', query: { brand: brand }})
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
