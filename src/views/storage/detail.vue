<template>
  <div class="app-container">
    <div class="filter-container">
      <span>
        TRS编号：
        <el-select
          v-model="listQuery.trsNo"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
          clearable
          allow-create
          filterable
        >
          <el-option v-for="item in trsEnumList" :key="item.name" :label="item.name" :value="item.value" />
        </el-select>
      </span>
      <span>
        颜色代码：
        <el-input
          v-model="listQuery.colorCode"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        />
      </span>
      <span>
        尺寸：
        <el-input
          v-model="listQuery.sizeCode"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        />
      </span>
      <span>
        订单类型：
        <el-select
          v-model="listQuery.orderType"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
          clearable
          allow-create
          filterable
        >
          <el-option label="备料单" value="备料单" />
          <el-option label="反馈订单" value="反馈订单" />
          <el-option label="生产订单" value="生产订单" />
          <el-option label="补货订单" value="补货订单" />
          <el-option label="采购订单" value="采购订单" />
          <el-option label="生产节点" value="生产节点" />
          <el-option label="人工操作" value="人工操作" />
        </el-select>
      </span>

      <span style="float: right">
        <el-button
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
        </el-button>
        <el-button
          class="filter-item"
          icon="el-icon-search"
          style="margin: 5px 0px 5px 0; background-color: #244496"
          type="primary"
          @click="exportStorageDetail(listQuery)"
        >
          下载
        </el-button>
      </span>
    </div>

    <div class="table-list">
      <div style="height: 2rem; line-height: 2rem; padding: 0 0.3rem;">
        <span style="float: left;">库存明细</span>
      </div>

      <el-table
        ref="dragTable"
        v-loading="listLoading"
        :data="list"
        row-key="id"
        border
        :header-cell-style="{background:'#e4e7f0'}"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" type="index" width="50" :index="Nindex" />
        <el-table-column align="left" label="TRS编号" prop="trsNo" :min-width="flexColumnWidth(list, 'TRS编号', 'trsNo')" show-overflow-tooltip />
        <el-table-column align="left" label="颜色" prop="colorCode" :min-width="flexColumnWidth(list, '颜色代码', 'colorCode')" show-overflow-tooltip />
        <el-table-column align="left" label="颜色描述" prop="colorDescription" :min-width="flexColumnWidth(list, '颜色描述', 'colorDescription')" show-overflow-tooltip />
        <el-table-column align="left" label="尺寸" prop="size" :min-width="flexColumnWidth(list, '尺寸', 'size')" show-tooltip-when-overflow />
        <el-table-column align="left" label="记录来源" prop="orderType" :min-width="flexColumnWidth(list, '记录来源', 'orderType')" show-overflow-tooltip />
        <el-table-column align="left" label="关联ID" prop="outerId" :min-width="flexColumnWidth(list, '关联ID', 'outerId')" show-overflow-tooltip />
        <el-table-column align="left" label="操作类型" prop="recordType" :min-width="flexColumnWidth(list, '操作类型', 'recordType')" show-overflow-tooltip />
        <el-table-column align="left" label="记录时间" prop="recordDateTime" :min-width="flexColumnWidth(list, '记录时间', 'recordDateTime')" show-overflow-tooltip />
        <el-table-column align="left" label="用量" prop="quantity" :min-width="flexColumnWidth(list, '用量', 'quantity')" show-overflow-tooltip />
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
import { getBrandEnum } from '@/api/enum'
import {
  getTrsNoEnumList
} from '@/api/enum'
import { exportMaterialOrder } from '@/api/materialOrder'
import { flexColumnWidth } from '@/common/flexColumn'
import { exportStorageDetail, queryStorageDetail } from '@/api/storage'

export default {
  name: '',
  data() {
    return {
      dialogStatus: 'create',
      dialogFormVisible: false,
      salePlanDialogFormVisible: false,
      upLoading: false,
      componentTypeList: [],
      page: 1,
      size: 10,
      list: null,
      total: null,
      trsEnumList: [],
      listLoading: true,
      listQuery: {
        trsNo: '',
        colorCode: '',
        sizeCode: '',
        page: 1,
        size: 10
      },
      brands: []
    }
  },

  watch: {
    '$route.query.querys': {
      immediate: true,
      handler(newVal) {
        console.log(newVal)
        this.listQuery.trsNo = newVal?.routerTrsNo ? newVal?.routerTrsNo : ''
        this.listQuery.sizeCode = newVal?.routerSize ? newVal?.routerSize : ''
        this.listQuery.colorCode = newVal?.routerColor ? newVal?.routerColor : ''
        this.getList(1)
      },
      deep: true // 深度监听
    }
  },
  async created() {
    const { data } = await getBrandEnum()
    await this.initTrsList()
    this.brands = data
    this.getList(1)
  },
  methods: {
    exportStorageDetail,
    flexColumnWidth,
    exportMaterialOrder,
    reset() {
      this.listQuery = {
        page: 1,
        size: 10
      }
    },

    async initTrsList() {
      await getTrsNoEnumList().then(res => {
        this.trsEnumList = res?.data ?? []
      })
    },
    async getList(page) {
      console.log(this.page, this.size)
      this.listQuery.page = page
      this.listQuery.size = this.size
      this.listLoading = true
      const { data, total } = await queryStorageDetail(this.listQuery).catch(res => {
        this.listLoading = false
      })
      this.list = data
      this.total = total
      this.listLoading = false
    },
    Nindex(index) {
      const page = this.page
      const size = this.size
      return index + 1 + (page - 1) * size
    },
    handleSizeChange(pageSize) {
      this.size = pageSize
      this.getList(1)
    },
    handleCurrentChange(pageNum) {
      this.page = pageNum
      this.getList(this.page)
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
