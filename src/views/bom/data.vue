<template>
  <div class="app-container">
    <div class="filter-container">
      <span>
        款号：<el-input
          v-model="listQuery.skuId"
          placeholder="请输入款号"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        />
      </span>
      <span>
        TRS编号：<el-input
          v-model="listQuery.trsNo"
          placeholder="请输入TRS编号"
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
          type="primary"
          icon="el-icon-search"
          style="margin: 5px 0px 5px 0; background-color: #244496"
          @click="exportBom(listQuery)"
        >
          下载
        </el-button>
      </span>

      <!--      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin: 5px 8px 5px 0" @click="beforeCreate">-->
      <!--        增加-->
      <!--      </el-button>-->
    </div>

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
        <el-table-column align="center" type="index" width="50" :index="Nindex" />
        <el-table-column align="left" label="款号" prop="skuId" :min-width="flexColumnWidth('款号', 'skuId')" />
        <el-table-column align="left" label="颜色" prop="color" :min-width="flexColumnWidth('颜色', 'color')" />
        <el-table-column align="left" label="层" prop="layer" :min-width="flexColumnWidth('层', 'layer')" />
        <el-table-column align="left" label="TRS 编号" prop="trsNo" :min-width="flexColumnWidth('TRS 编号', 'trs')" />
        <el-table-column align="left" label="供应商" prop="supplier" :min-width="flexColumnWidth('供应商', 'supplier')" />
        <el-table-column align="left" label="供应商物料编号" prop="supplierMaterialComponentNo" :min-width="flexColumnWidth('供应商物料编号', 'supplierMaterialComponentNo')" />
        <el-table-column align="left" label="物料描述" prop="materialDescription" :min-width="flexColumnWidth('物料描述', 'materialDescription')" />
        <el-table-column align="left" label="颜色代码" prop="colorCode" :min-width="flexColumnWidth('颜色代码', 'colorCode')" />
        <el-table-column align="left" label="尺码" prop="size" :width="flexColumnWidth('尺码', 'colorDescription')" />
        <el-table-column align="left" label="单位名称" prop="unitName" :min-width="flexColumnWidth('单位名称', 'unitName')" />
        <el-table-column align="left" label="单位成本" prop="unitCode" :min-width="flexColumnWidth('单位成本', 'unitCode')" />
        <el-table-column align="left" label="用量" prop="useQuantity" :min-width="flexColumnWidth('用量', 'useQuantity')" />
        <el-table-column align="left" label="生产天数" prop="produceDay" :min-width="flexColumnWidth('生产天数', 'produceDay')" />
        <el-table-column align="left" label="上层TRS编号" prop="parentTrsNo" :min-width="flexColumnWidth('上层TRS编号', 'parentTrsNo')" />
        <el-table-column align="left" label="组件类型" prop="componentType" :min-width="flexColumnWidth('组件类型', 'componentType')" />
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
        @size-change="getList(page)"
        @current-change="getList(page)"
      />
    </div>
  </div>
</template>

<script>
import { exportBom, queryBom, queryComponentTypeList } from '@/api/bom'
import BomTree from '@/views/bom/tree.vue'

export default {
  name: 'User',
  components: { BomTree },
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
      bomTreeDialogVisble: false
    }
  },
  created() {
    this.initComponentTypeList()
    this.getList(1)
  },
  methods: {
    exportBom,
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

    async initComponentTypeList() {
      const { data } = await queryComponentTypeList()
      this.componentTypeList = data
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
      // 1.获取该列的所有数据
      let arr = []
      if (this.list && this.list.length > 0) {
        arr = this.list.map((x) => x[prop])
      }
      arr.push(label) // 把每列的表头也加进去算
      // 2.计算每列内容最大的宽度 + 表格的内间距（依据实际情况而定）
      return this.getMaxLength(arr) + 20 + 'px'
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
