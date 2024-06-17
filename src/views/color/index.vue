<template>
  <div class="app-container">
    <div class="filter-container">
      <span>
        品牌：
        <el-select
          v-model="listQuery.brand"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        >
          <el-option v-for="item in brands" :key="item.name" :label="item.name" :value="item.value" />
        </el-select>
      </span>
      <span>
        颜色代码：<el-input
          v-model="listQuery.colorCode"
          placeholder="请输入颜色代码"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        />
      </span>
      <span>
        颜色描述：<el-input
          v-model="listQuery.colorDescription"
          placeholder="请输入颜色描述"
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
          icon="el-icon-search"
          style="margin: 5px 0px 5px 0; background-color: #244496"
          type="primary"
          @click="exportColor(listQuery)"
        >
          下载
        </el-button>
      </span>
    </div>

    <div class="table-list">
      <div style="height: 2rem; line-height: 2rem; padding: 0 0.3rem;">
        <span style="float: left;">颜色数据</span>
        <span style="float: right;">
          <span style="text-align: right">
            <el-upload
              action="/api/color/importExcel"
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
        <el-table-column align="left" label="品牌" prop="skuId" :min-width="flexColumnWidth('品牌', 'brand')" />
        <el-table-column align="left" label="颜色代码" prop="colorCode" :min-width="flexColumnWidth('颜色代码', 'colorCode')" />
        <el-table-column align="left" label="颜色描述" prop="colorDescription" :min-width="flexColumnWidth('颜色描述', 'colorDescription')" />
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
import { exportColor, queryColor } from '@/api/color'

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
    const { data } = await getBrandEnum()
    this.brands = data
    this.getList(1)
  },
  methods: {
    exportColor,
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
      console.log(this.page, this.size)
      this.listQuery.page = page
      this.listQuery.size = this.size
      this.listLoading = true
      const { data, total } = await queryColor(this.listQuery).catch(res => {
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
