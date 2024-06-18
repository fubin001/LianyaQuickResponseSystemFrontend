<template>
  <div class="app-container">
    <div class="filter-container">
      <span>
        TRS编号：
        <el-input
          v-model="listQuery.trsNo"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        />
      </span>
      <span>
        物料类型：
        <el-select
          v-model="listQuery.componentType"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
          clearable
          filterable
        >
          <el-option v-for="item in componentTypeList" :key="item.name" :label="item.name" :value="item.value" />
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
          @click="exportComponentOrder(listQuery)"
        >
          下载
        </el-button>
      </span>
    </div>

    <div class="table-list">
      <div style="height: 2rem; line-height: 2rem; padding: 0 0.3rem;">
        <span style="float: left;">生产订单</span>
        <span style="float: right;">
          <span style="text-align: right">
            <el-upload
              action="/api/componentOrder/importExcel"
              style="display: inline-block"
              :show-file-list="false"
              :on-success="handleFileUploadSuccess"
              :on-error="handleFileUploadError"
            >
              <el-button
                type="primary"
                class="ml-5"
                style="background-color: #244496"
                size="mini"
                :loading="upLoading"
                @click="upLoading = true"
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
        :header-cell-style="{background:'#e4e7f0'}"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" type="index" width="50" :index="Nindex" />
        <el-table-column align="left" label="TRS编号" prop="trsNo" :min-width="flexColumnWidth(list, '品牌', 'brand')" />
        <el-table-column align="left" label="组件类型" prop="componentType" :min-width="flexColumnWidth(list, '组件类型', 'componentType')" />
        <el-table-column align="left" label="供应商" prop="supplier" :min-width="flexColumnWidth(list, '供应商', 'supplier')" />
        <el-table-column align="left" label="颜色代码" prop="colorCode" :min-width="flexColumnWidth(list, '颜色代码', 'colorCode')" />
        <el-table-column align="left" label="颜色描述" prop="colorDescription" :min-width="flexColumnWidth(list, '颜色描述', 'colorDescription')" />
        <el-table-column align="left" label="尺码" prop="size" :min-width="flexColumnWidth(list, '尺码', 'size')" />
        <el-table-column align="left" label="单位" prop="unitName" :min-width="flexColumnWidth(list, '单位', 'unitName')" />
        <el-table-column align="left" label="数量" prop="materialQuantity" :min-width="flexColumnWidth(list, '数量', 'materialQuantity')" />
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
import { flexColumnWidth } from '@/common/util'
import { exportComponentOrder, queryComponentOrder } from '@/api/componentOrder'
import { queryComponentTypeList } from '@/api/bom'

export default {
  name: 'User',
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
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10
      },
      brands: []
    }
  },
  async created() {
    this.initComponentTypeList()
    this.getList(1)
  },
  methods: {
    exportComponentOrder,
    flexColumnWidth,
    reset() {
      this.listQuery = {
        page: 1,
        size: 10
      }
    },

    async initComponentTypeList() {
      const { data } = await queryComponentTypeList()
      this.componentTypeList = data
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

    async getList(page) {
      console.log(this.page, this.size)
      this.listQuery.page = page
      this.listQuery.size = this.size
      this.listLoading = true
      const { data, total } = await queryComponentOrder(this.listQuery).catch(res => {
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
