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
          type="primary"
          icon="el-icon-search"
          style="margin: 5px 0px 5px 0; background-color: #244496"
          @click="exportStorage(listQuery)"
        >
          下载
        </el-button>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          style="margin: 5px 0px 5px 0; background-color: #244496"
          @click="refreshStorage()"
        >更新库存</el-button>

      </span>
    </div>

    <div class="table-list">
      <div style="height: 2rem; line-height: 2rem; padding: 0 0.3rem;">
        <span style="float: left;">库存管理</span>
        <span style="float: right;">
          <span style="text-align: right">
            <el-upload
              action="/api/storage/importExcel"
              style="display: inline-block"
              :show-file-list="false"
              :on-success="handleFileUploadSuccess"
              :on-error="handleFileUploadError"
            >
              <el-button
                type="primary"
                class="ml-5"
                style="background-color: #244496;margin: 4px"
                size="mini"
                :loading="upLoading"
                @click="upLoading = true"
              >上传<i
                class="el-icon-top"
              /></el-button>
            </el-upload>
            <el-button
              type="primary"
              class="ml-5"
              style="background-color: #244496;margin: 4px"
              size="mini"
              icon="el-icon-plus"
              @click="addDialogVisible = true"
            >新增<i /></el-button>
          </span>
        </span>
      </div>

      <el-dialog :visible.sync="addDialogVisible" title="新增库存" width="500px">
        <el-form ref="dataForm" :model="addForm" label-position="left" label-width="100px" style="width: 300px; margin-left:50px;">
          <el-form-item label="TRS编号">
            <el-select v-model="addForm.trsNo" style="width: 300px">
              <el-option v-for="trsNoEnum in trsNoEnumList" :key="trsNoEnum.key" :label="trsNoEnum.key" :value="trsNoEnum.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="尺寸（选填）">
            <el-input v-model="addForm.size" style="width: 300px" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="addOneStorage">
            确定
          </el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="editDialogVisible" title="编辑库存" width="500px">
        <el-form ref="dataForm" :model="editForm" label-position="left" label-width="70px" style="width: 300px; margin-left:50px;">
          <el-form-item label="TRS编号">
            <el-input v-model="editForm.trsNo" style="width: 300px" disabled />
          </el-form-item>
          <el-form-item label="安全库存">
            <el-input v-model="editForm.safeQuantity" style="width: 300px" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="editStorage">
            确定
          </el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="storageDialogVisible" title="操作库存" width="500px">
        <el-form ref="dataForm" :model="storageForm" label-position="left" label-width="70px" style="width: 300px; margin-left:50px;">
          <el-form-item label="TRS编号">
            <el-input v-model="storageForm.trsNo" style="width: 300px" disabled />
          </el-form-item>
          <el-form-item label="操作类型">
            <el-input v-model="storageForm.recordType" style="width: 300px" disabled />
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="storageForm.quantity" style="width: 300px" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="storageDialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="manualOperateStorage">
            确定
          </el-button>
        </div>
      </el-dialog>

      <el-table
        ref="dragTable"
        v-loading="listLoading"
        :data="list"
        border
        row-key="id"
        :header-cell-style="{background:'#e4e7f0'}"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="left" label="操作" width="400px">
          <template slot-scope="{row}">
            <el-button
              size="mini"
              style="color: #244496; border: none"
              icon="el-icon-edit"
              @click="popEditDialog(row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              style="color: #244496; border: none"
              icon="el-icon-scissors"
              @click="removeStorageById(row.id)"
            >
              删除
            </el-button>
            <el-button
              size="mini"
              style="color: #244496; border: none"
              icon="el-icon-minus"
              @click="popOperateStorageDialog(row.id, row.trsNo, '出库')"
            >
              出库
            </el-button>
            <el-button
              size="mini"
              style="color: #244496; border: none"
              icon="el-icon-plus"
              @click="popOperateStorageDialog(row.id, row.trsNo, '入库')"
            >
              入库
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="left" label="TRS编号" prop="trsNo" :min-width="flexColumnWidth(list, 'TRS编号', 'trsNo')" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link type="primary" @click="goToPage(scope.row)">
              {{ scope.row.trsNo }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column align="left" label="颜色代码" prop="colorCode" :min-width="flexColumnWidth(list, '颜色代码', 'colorCode')" show-overflow-tooltip />
        <el-table-column align="left" label="颜色描述" prop="colorDescription" :min-width="flexColumnWidth(list, '颜色描述', 'colorDescription')" show-overflow-tooltip />
        <el-table-column align="left" label="尺寸" prop="size" :min-width="flexColumnWidth(list, '尺寸', 'size')" show-overflow-tooltip />
        <el-table-column align="left" label="单位" prop="unitName" :min-width="flexColumnWidth(list, '单位', 'unitName')" show-overflow-tooltip />
        <el-table-column align="left" label="库存" prop="quantity" :min-width="flexColumnWidth(list, '库存', 'quantity')" show-overflow-tooltip />
        <el-table-column align="left" label="预留库存" prop="preserveQuantity" :min-width="flexColumnWidth(list, '预留库存', 'preserveQuantity')" show-overflow-tooltip />
        <el-table-column align="left" label="可用库存" prop="availableQuantity" :min-width="flexColumnWidth(list, '可用库存', 'availableQuantity')" show-overflow-tooltip />
        <el-table-column align="left" label="安全库存" prop="safeQuantity" :min-width="flexColumnWidth(list, '安全库存', 'safeQuantity')" show-overflow-tooltip />
        <el-table-column align="left" label="补货中库存" prop="buyingQuantity" :min-width="flexColumnWidth(list, '补货中库存', 'buyingQuantity')" show-overflow-tooltip />
        <el-table-column align="left" label="生产中库存" prop="producingQuantity" :min-width="flexColumnWidth(list, '生产中库存', 'producingQuantity')" show-overflow-tooltip />
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
import {
  addStorage,
  exportStorage,
  getRecordTypeList,
  modifyStorage,
  operateStorage,
  queryStorage,
  refreshStorage,
  removeStorage
} from '@/api/storage'
import { getTrsNoEnumList } from '@/api/bom'
import { flexColumnWidth } from '@/common/flexColumn'

export default {
  name: '',
  data() {
    return {
      addForm: {},
      editForm: {},
      storageForm: {},
      trsEnumList: [], // 搜索框 数据
      addDialogVisible: false,
      editDialogVisible: false,
      storageDialogVisible: false,
      dialogStatus: 'create',
      dialogFormVisible: false,
      salePlanDialogFormVisible: false,
      upLoading: false,
      page: 1,
      size: 10,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        trsNo: '',
        colorCode: '',
        sizeCode: '',
        page: 1,
        size: 10
      },
      titleMap: {
        create: '新增商品',
        update: '编辑商品'
      },
      sortable: null,
      temp: {},
      salePlanForm: {},
      trsNoEnumList: [],
      recordTypeEnumList: []
    }
  },
  computed: {
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
    await this.initTrsList()
    await this.initEnums()
    this.getList(1)
  },
  methods: {
    flexColumnWidth,
    exportStorage,
    refreshStorage,
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

    popOperateStorageDialog(id, trsNo, recordType) {
      this.storageForm.id = id
      this.storageForm.trsNo = trsNo
      this.storageForm.recordType = recordType
      this.storageDialogVisible = true
    },

    manualOperateStorage() {
      operateStorage(this.storageForm).then(res => {
        if (res.data) {
          this.$message.success(this.storageForm.recordType + '成功')
          this.getList(this.page)
          this.storageDialogVisible = false
        } else {
          this.$message.error(this.storageForm.recordType + '失败')
        }
      }).catch(res => {
        this.$message.error(this.storageForm.recordType + '失败')
      })
    },

    removeStorageById(id) {
      removeStorage(id).then(res => {
        if (res.data) {
          this.$message.success('删除成功')
          this.getList(this.page)
        } else {
          this.$message.error('删除失败')
        }
      }).catch(res => {
        this.$message.error('删除失败')
      })
    },

    addOneStorage() {
      addStorage(this.addForm).then(res => {
        if (res.data) {
          this.$message.success('添加成功')
          this.addForm = {}
          this.getList(this.page)
        } else {
          this.$message.error('添加失败')
        }
        this.addDialogVisible = false
      }).catch(res => {
        this.$message.error('添加失败')
        this.addDialogVisible = false
      })
    },

    popEditDialog(row) {
      this.editForm = JSON.parse(JSON.stringify(row))
      this.editDialogVisible = true
    },

    editStorage() {
      modifyStorage(this.editForm).then(res => {
        if (res.data) {
          this.$message.success('编辑成功')
          this.addForm = {}
          this.getList(this.page)
          this.editDialogVisible = false
        } else {
          this.$message.error('编辑失败')
        }
      }).catch(res => {
        this.$message.error('编辑失败')
      })
    },

    async initEnums() {
      await getTrsNoEnumList().then(res => {
        this.trsNoEnumList = res?.data ?? []
      })
      await getRecordTypeList().then(res => {
        this.recordTypeEnumList = res?.data ?? []
      })
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
      this.listQuery.page = page
      this.listQuery.size = this.size
      this.listLoading = true
      const { data, total } = await queryStorage(this.listQuery).catch(res => {
        this.listLoading = false
      })
      this.list = data
      this.total = total
      this.listLoading = false
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
    goToPage(row) {
      const query = {
        trsNo: row.trsNo
      }
      // 库存详情
      this.$router.push({
        path: '/data/storageDetail',
        query
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
