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
        <el-button
          class="filter-item"
          icon="el-icon-search"
          style="margin: 5px 0px 5px 0; background-color: #244496"
          type="primary"
          @click="dialogFormVisible = true"
        >
          新增
        </el-button>
      </span>
    </div>

    <el-dialog title="新增生产订单" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="dataForm" :model="newOrder" label-position="left" label-width="70px" style="width: 300px; margin-left:50px;">
        <el-form-item label="TRS编号" prop="id">
          <el-select v-model="newOrder.trsNo" clearable filterable style="width: 300px">
            <el-option v-for="trsNoEnum in trsNos" :key="trsNoEnum.key" :label="trsNoEnum.key" :value="trsNoEnum.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="newOrder.materialQuantity" style="width: 300px" />
        </el-form-item>
        <el-form-item label="生产时间">
          <el-date-picker v-model="newOrder.startProduceDate" style="width: 300px" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="newOrder.endProduceDate" style="width: 300px" value-format="yyyy-MM-dd" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addNewProductOrder">
          确定
        </el-button>
      </div>
    </el-dialog>

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
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button
              v-if="row.state !== 2"
              size="mini"
              style="color: #244496; border: none"
              icon="el-icon-edit-outline"
              @click="confirm(row.id)"
            >
              确认结束
            </el-button>
            <el-button
              size="mini"
              style="color: #244496; border: none"
              icon="el-icon-edit-outline"
              @click="remove(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" type="index" width="50" :index="Nindex" />
        <el-table-column align="left" label="生产单号" prop="id" :width="flexColumnWidth(list, '生产单号', 'id')" />
        <el-table-column align="left" label="TRS编号" prop="trsNo" :min-width="flexColumnWidth(list, '品牌', 'brand')" />
        <el-table-column align="left" label="生产时间" prop="startProduceDate" :min-width="flexColumnWidth(list, '生产时间', 'start_produce_date')" />
        <el-table-column align="left" label="结束时间" prop="endProduceDate" :min-width="flexColumnWidth(list, '结束时间', 'end_produce_date')" />
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
import { flexColumnWidth } from '@/common/flexColumn'
import {
  addComponentOrder,
  confirmOrder,
  deleteOrder,
  exportComponentOrder,
  queryComponentOrder
} from '@/api/componentOrder'
import { getTrsNoEnumList, queryComponentTypeList } from '@/api/bom'

export default {
  name: 'User',
  data() {
    return {
      dialogStatus: 'create',
      dialogFormVisible: false,
      salePlanDialogFormVisible: false,
      upLoading: false,
      componentTypeList: [],
      trsNos: [],
      newOrder: {},
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
    this.initTrsNos()
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

    async initTrsNos() {
      const { data } = await getTrsNoEnumList()
      this.trsNos = data
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
    },
    addNewProductOrder() {
      addComponentOrder(this.newOrder).then(res => {
        if (res.data) {
          this.$message.success('添加成功')
          this.getList(1)
        } else {
          this.$message.error('添加失败')
        }
        this.dialogFormVisible = false
      }).catch(res => {
        this.$message.error('添加失败')
        this.dialogFormVisible = false
      })
    },
    confirm(id) {
      confirmOrder(id).then(res => {
        if (res.data) {
          this.$message.success('操作成功')
          this.getList(this.page)
        } else {
          this.$message.error('操作失败')
        }
      })
    },
    remove(id) {
      deleteOrder(id).then(res => {
        if (res.data) {
          this.$message.success('操作成功')
          this.getList(this.page)
        } else {
          this.$message.error('操作失败')
        }
      })
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
