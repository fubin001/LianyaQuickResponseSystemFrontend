<template>
  <div class="app-container">
    <div class="filter-container">
      <span>
        skuId：
        <el-select
          v-model="listQuery.skuId"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
          clearable
          allow-create
          filterable
        >
          <el-option v-for="item in skuIdEnumList" :key="item.name" :label="item.name" :value="item.value" />
        </el-select>
      </span>
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
        物料类型：
        <el-select
          v-model="listQuery.componentType"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
          clearable
          filterable
        >
          <el-option v-for="item in componentTypeEnumList" :key="item.name" :label="item.name" :value="item.value" />
        </el-select>
      </span>
      <span>
        创建类型：
        <el-select
          v-model="listQuery.createType"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
          clearable
          filterable
        >
          <el-option v-for="item in createTypeEnumList" :key="item.name" :label="item.name" :value="item.value" />
        </el-select>
      </span>
      <span style="float: right">
        <el-button
          class="filter-item"
          plain
          style="margin: 3px 5px"
          @click="reset"
        >
          重置
        </el-button>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          style="margin: 3px 5px; background-color: #244496"
          @click="getList(1)"
        >
          搜索
        </el-button>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          style="margin: 3px 5px; background-color: #244496"
          @click="addBomDialogVisible = true"
        >
          新增
        </el-button>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          style="margin: 3px 5px; background-color: #244496"
          @click="exportBom(listQuery)"
        >
          下载
        </el-button>
      </span>
    </div>

    <el-dialog title="新增BOM" :visible.sync="addBomDialogVisible" width="500px">
      <el-form ref="dataForm" :model="addBomForm" label-position="left" label-width="120px" style="width: 300px; margin-left:30px;">
        <el-form-item label="skuId" prop="skuId">
          <el-select
            v-model="addBomForm.skuId"
            style="width: 300px"
            class="filter-item"
            clearable
            allow-create
            filterable
          >
            <el-option v-for="item in skuIdEnumList" :key="item.name" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="TRS编号" prop="parentTrsNo">
          <el-input
            v-model="addBomForm.trsNo"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="颜色代码">
          <el-input v-model="addBomForm.colorCode" style="width: 300px" />
        </el-form-item>
        <el-form-item label="层">
          <el-select
            v-model="addBomForm.layer"
            style="width: 300px"
            class="filter-item"
            clearable
            allow-create
            filterable
          >
            <el-option v-for="item in LayerEnumList" :key="item.name" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input v-model="addBomForm.supplier" style="width: 300px" />
        </el-form-item>
        <el-form-item label="供应商物料编号">
          <el-input v-model="addBomForm.supplierMaterialComponentNo" style="width: 300px" />
        </el-form-item>
        <el-form-item label="物料描述">
          <el-input v-model="addBomForm.materialDescription" style="width: 300px" />
        </el-form-item>
        <el-form-item label="物料描述">
          <el-input v-model="addBomForm.materialDescription" style="width: 300px" />
        </el-form-item>
        <el-form-item label="区分尺寸">
          <el-select
            v-model="addBomForm.size"
            style="width: 300px"
            class="filter-item"
            clearable
            allow-create
            filterable
          >
            <el-option v-for="item in DistinguishSizeEnum" :key="item.name" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称">
          <el-input v-model="addBomForm.unitName" style="width: 300px" />
        </el-form-item>
        <el-form-item label="单位成本">
          <el-input-number v-model="addBomForm.unitCost" style="width: 300px" />
        </el-form-item>
        <el-form-item label="单位用量">
          <el-input-number v-model="addBomForm.useQuantity" style="width: 300px" />
        </el-form-item>
        <el-form-item label="生产天数">
          <el-input-number v-model="addBomForm.produceDay" style="width: 300px" />
        </el-form-item>
        <el-form-item label="组件类型" prop="id">
          <el-select
            v-model="addBomForm.componentType"
            style="width: 300px"
            class="filter-item"
            clearable
            filterable
          >
            <el-option v-for="item in componentTypeEnumList" :key="item.name" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="父组件编号" prop="parentTrsNo">
          <el-select
            v-model="addBomForm.parentTrsNo"
            style="width: 300px"
            class="filter-item"
            clearable
            filterable
            allow-create
          >
            <el-option v-for="item in trsEnumList" :key="item.name" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBomDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleAddBom">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改BOM" :visible.sync="modBomDialogVisible" width="500px">
      <el-form ref="dataForm" :model="modBomForm" label-position="left" label-width="120px" style="width: 300px; margin-left:30px;">
        <el-form-item label="skuId" prop="skuId">
          <el-input
            v-model="modBomForm.skuId"
            style="width: 300px"
            disabled
          />
        </el-form-item>
        <el-form-item label="TRS编号" prop="trsNo">
          <el-input
            v-model="modBomForm.trsNo"
            style="width: 300px"
            disabled
          />
        </el-form-item>
        <el-form-item label="颜色代码">
          <el-input v-model="modBomForm.colorCode" style="width: 300px" />
        </el-form-item>
        <el-form-item label="层">
          <el-select
            v-model="modBomForm.layer"
            style="width: 300px"
            class="filter-item"
            clearable
            allow-create
            filterable
          >
            <el-option v-for="item in LayerEnumList" :key="item.name" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input v-model="modBomForm.supplier" style="width: 300px" />
        </el-form-item>
        <el-form-item label="供应商物料编号">
          <el-input v-model="modBomForm.supplierMaterialComponentNo" style="width: 300px" />
        </el-form-item>
        <el-form-item label="物料描述">
          <el-input v-model="modBomForm.materialDescription" style="width: 300px" />
        </el-form-item>
        <el-form-item label="区分尺寸">
          <el-select
            v-model="modBomForm.size"
            style="width: 300px"
            class="filter-item"
            clearable
            allow-create
            filterable
          >
            <el-option v-for="item in DistinguishSizeEnum" :key="item.name" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称">
          <el-input v-model="modBomForm.unitName" style="width: 300px" />
        </el-form-item>
        <el-form-item label="单位成本">
          <el-input-number v-model="modBomForm.unitCost" style="width: 300px" />
        </el-form-item>
        <el-form-item label="生产天数">
          <el-input-number v-model="modBomForm.produceDay" style="width: 300px" />
        </el-form-item>
        <el-form-item label="单位用量">
          <el-input-number v-model="modBomForm.useQuantity" style="width: 300px" />
        </el-form-item>
        <el-form-item label="组件类型" prop="id">
          <el-select
            v-model="modBomForm.componentType"
            style="width: 300px"
            class="filter-item"
            clearable
            filterable
          >
            <el-option v-for="item in componentTypeEnumList" :key="item.name" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="父组件编号" prop="parentTrsNo">
          <el-select
            v-model="modBomForm.parentTrsNo"
            style="width: 300px"
            class="filter-item"
            clearable
            filterable
            allow-create
          >
            <el-option v-for="item in trsEnumList" :key="item.name" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modBomDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleModBom">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="BOM可视化结构" :visible.sync="bomTreeDialogVisble" width="1500px">
      <BomTree ref="bomTree" />
    </el-dialog>

    <div class="table-list">
      <div style="height: 2rem; line-height: 2rem; padding: 0 0.3rem;">
        <span style="float: left;">商品列表</span>
        <span style="float: right;">
          <span style="text-align: right">
            <el-upload
              action="/api/bom/importExcel"
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
        <el-table-column align="left" label="编号" type="index" width="50" :index="Nindex" />
        <el-table-column align="left" label="操作" width="180px">
          <template slot-scope="{row}">
            <el-button
              size="mini"
              style="color: #244496; border: none"
              icon="el-icon-edit"
              @click="popModBomDialog(row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              style="color: #244496; border: none"
              icon="el-icon-scissors"
              @click="handleRemoveBom(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="left" label="skuId" prop="skuId" :width="flexColumnWidth(list,'skuId', 'skuId')" />
        <el-table-column align="left" label="TRS 编号" prop="trsNo" :min-width="flexColumnWidth(list,'TRS 编号', 'trs')" />
        <el-table-column align="left" label="创建类型" prop="createType" :min-width="flexColumnWidth(list,'创建类型', 'createType')" />
        <el-table-column align="left" label="颜色代码" prop="colorCode" :min-width="flexColumnWidth(list,'颜色代码', 'colorCode')" />
        <el-table-column align="left" label="颜色" prop="color" :min-width="flexColumnWidth(list, '颜色', 'color')" />
        <el-table-column align="left" label="层" prop="layer" :min-width="flexColumnWidth(list, '层', 'layer')" />
        <el-table-column align="left" label="供应商" prop="supplier" :min-width="flexColumnWidth(list, '供应商', 'supplier')" />
        <el-table-column align="left" label="供应商物料编号" prop="supplierMaterialComponentNo" :min-width="flexColumnWidth(list,'供应商物料编号', 'supplierMaterialComponentNo')" />
        <el-table-column align="left" label="物料描述" prop="materialDescription" :min-width="flexColumnWidth(list,'物料描述', 'materialDescription')" />
        <el-table-column align="left" label="区分尺码" prop="size" :width="flexColumnWidth(list,'区分尺码', 'size')">
          <template slot-scope="{row}">
            <el-tag v-if="row.size === 'Y'">区分</el-tag>
            <el-tag v-else type="success">不区分</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="单位名称" prop="unitName" :min-width="flexColumnWidth(list,'单位名称', 'unitName')" />
        <el-table-column align="left" label="单位成本" prop="unitCode" :min-width="flexColumnWidth(list,'单位成本', 'unitCode')" />
        <el-table-column align="left" label="用量" prop="useQuantity" :min-width="flexColumnWidth(list,'用量', 'useQuantity')" />
        <el-table-column align="left" label="生产天数" prop="produceDay" :min-width="flexColumnWidth(list,'生产天数', 'produceDay')" />
        <el-table-column align="left" label="上层TRS编号" prop="parentTrsNo" :min-width="flexColumnWidth(list,'上层TRS编号', 'parentTrsNo')" />
        <el-table-column align="left" label="组件类型" prop="componentType" :min-width="flexColumnWidth(list,'组件类型', 'componentType')" />
        <el-table-column>
          <template slot-scope="{row}">
            <el-button
              v-if="row.layer === 1"
              size="mini"
              style="color: #244496; border: none"
              icon="iconfont icon-a-zu1221"
              @click="popBomTreeDialog(row.skuId)"
            >
              查看bom结构
            </el-button>
            <el-tooltip v-else content="只能查看成品bom结构">
              <el-button
                size="mini"
                style="color: gray; border: none"
                icon="iconfont icon-a-zu1221"
                disabled
              >
                查看bom结构
              </el-button>
            </el-tooltip>

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
  </div>
</template>

<script>
import { addBom, exportBom, modifyBom, queryBom, queryComponentTypeList, removeBomById } from '@/api/bom'
import BomTree from '@/views/bom/tree.vue'
import {
  DistinguishSizeEnum,
  getBomCreateTypeEnumList,
  getSkuIdEnumList,
  getTrsNoEnumList,
  LayerEnumList
} from '@/api/enum'
import { flexColumnWidth } from '@/common/util'

export default {
  name: 'BOM数据',
  components: { BomTree },
  data() {
    return {
      addBomForm: {},
      modBomForm: {},
      addBomDialogVisible: false,
      modBomDialogVisible: false,
      dialogFormVisible: false,
      salePlanDialogFormVisible: false,
      upLoading: false,
      componentTypeEnumList: [],
      createTypeEnumList: [],
      trsEnumList: [],
      skuIdEnumList: [],
      page: 1,
      size: 10,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10
      },
      bomTreeDialogVisible: false
    }
  },
  computed: {
    LayerEnumList() {
      return LayerEnumList
    },
    DistinguishSizeEnum() {
      return DistinguishSizeEnum
    }
  },
  created() {
    this.initComponentTypeList()
    this.initCreateTypeList()
    this.initSkuIdList()
    this.initTrsList()
    this.getList(1)
  },
  methods: {

    flexColumnWidth,
    exportBom,
    reset() {
      this.listQuery = {
        page: 1,
        size: 10
      }
    },

    async initComponentTypeList() {
      await queryComponentTypeList().then(res => {
        this.componentTypeEnumList = res?.data ?? []
      })
    },

    async initCreateTypeList() {
      await getBomCreateTypeEnumList().then(res => {
        this.createTypeEnumList = res?.data ?? []
      })
    },

    async initTrsList() {
      await getTrsNoEnumList().then(res => {
        this.trsEnumList = res?.data ?? []
      })
    },

    async initSkuIdList() {
      await getSkuIdEnumList().then(res => {
        this.skuIdEnumList = res?.data ?? []
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
      const { data, total } = await queryBom(this.listQuery).catch(res => {
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
    popBomTreeDialog(skuId) {
      this.bomTreeDialogVisble = true
      this.$nextTick(() => {
        console.log(skuId)
        this.$refs.bomTree.render(skuId)
      })
    },
    handleSizeChange(pageSize) {
      this.size = pageSize
      this.getList(1)
    },
    handleCurrentChange(pageNum) {
      this.page = pageNum
      this.getList(this.page)
    },

    popModBomDialog(row) {
      this.modBomForm = JSON.parse(JSON.stringify(row))
      this.modBomDialogVisible = true
    },

    handleModBom() {
      modifyBom(this.modBomForm).then(res => {
        if (res && res.data) {
          this.$message.success('修改成功')
          this.addBomForm = {}
          this.modBomDialogVisible = false
          this.getList(this.page)
        } else {
          this.$message.error('修改失败')
        }
      }).catch(res => {
        console.error(res)
        this.$message.error('修改失败')
      })
    },
    handleAddBom() {
      this.addBomForm.createType = '人工创建'
      // 参数检查
      addBom(this.addBomForm).then(res => {
        if (res && res.data) {
          this.$message.success('新增成功')
          this.addBomForm = {}
          this.addBomDialogVisible = false
          this.getList(this.page)
        } else {
          this.$message.error('新增失败')
        }
      }).catch(res => {
        console.error(res)
        this.$message.error('新增失败')
      })
    },
    handleRemoveBom(id) {
      removeBomById(id).then(res => {
        if (res && res.data) {
          this.$message.success('删除成功')
          this.getList(this.page)
        } else {
          this.$message.error('删除失败')
        }
      }).catch(res => {
        console.error(res)
        this.$message.error('删除失败')
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
