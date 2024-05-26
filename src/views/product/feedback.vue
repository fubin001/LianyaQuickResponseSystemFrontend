<template>
  <div class="app-container">
    <div class="filter-container">
      <span>
        订单号：<el-input
          v-model="listQuery.skuId"
          placeholder="请输入订单号"
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
          @click="exportFeedbackOrder(listQuery)"
        >
          下载
        </el-button>
      </span>

      <!--      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin: 5px 8px 5px 0" @click="beforeCreate">-->
      <!--        增加-->
      <!--      </el-button>-->
    </div>

    <div class="product-list">
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
        <el-table-column align="center" label="ID" prop="id" width="50" />
        <el-table-column align="left" label="skuId" prop="skuId" :width="flexColumnWidth('skuId', 'skuId')" />
        <el-table-column align="left" label="订货日期" prop="bookDate" :width="flexColumnWidth('订货日期', 'bookDate')" />
        <el-table-column align="left" label="预计到货" prop="predictDate" :width="flexColumnWidth('预计到货', 'predictDate')" />
        <el-table-column align="left" label="确认到货" prop="confirmDate" :width="flexColumnWidth('确认到货', 'confirmDate')" />
        <el-table-column align="left" label="订货数量" prop="quantity" :width="flexColumnWidth('订货数量', 'quantity')" />
        <el-table-column align="left" label="颜色" prop="color" :width="flexColumnWidth('颜色', 'color')" />
        <el-table-column align="left" label="颜色名称" prop="colorName" :width="flexColumnWidth('颜色名称', 'colorName')" />
        <el-table-column align="left" label="销售YTD" prop="ytd" :width="flexColumnWidth('销售YTD', 'ytd')" />
        <el-table-column align="left" label="库存量" prop="storage" :width="flexColumnWidth('库存量', 'storage')" />
        <el-table-column align="left" label="YTD售罄率" prop="ytdSaleOutRate" :width="flexColumnWidth('YTD售罄率', 'ytdSaleOutRate')">
          <template slot-scope="{ row }">
            {{ new Number(row.ytdSaleOutRate * 100).toFixed(2) }} %
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="首单售罄率"
          prop="firstOrderSaleOut"
          :width="flexColumnWidth('首单售罄率', 'firstOrderSaleOut')"
        >
          <template slot-scope="{ row }">
            {{ new Number(row.firstOrderSaleOut * 100).toFixed(2) }} %
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="预计最终销售"
          prop="predictFinalSale"
          :width="flexColumnWidth('预计最终销售', 'predictFinalSale')"
        />
        <el-table-column align="left" label="剩余预计销售" prop="restSale" :width="flexColumnWidth('剩余预计销售', 'restSale')" />
        <el-table-column
          align="left"
          label="预计最终售罄率"
          prop="predictFinalSaleOut"
          :width="flexColumnWidth('预计最终售罄率', 'predictFinalSaleOut')"
        >
          <template slot-scope="{ row }">
            {{ new Number(row.predictFinalSaleOut * 100).toFixed(2) }} %
          </template>
        </el-table-column>
        <el-table-column align="left" label="上周销售" prop="lastWeekSale" :width="flexColumnWidth('上周销售', 'lastWeekSale')" />
        <el-table-column align="left" label="本周销售" prop="currentWeekSale" :width="flexColumnWidth('本周销售', 'currentWeekSale')" />
        <el-table-column
          align="left"
          label="最近四周销售"
          prop="recentlyFourWeekSale"
          :width="flexColumnWidth('最近四周销售', 'flexColumnWidth')"
        />
        <el-table-column
          align="left"
          label="最近四周销售平均"
          prop="recentlyFourWeekAvgSale"
          :width="flexColumnWidth('最近四周销售平均', 'recentlyFourWeekAvgSale')"
        />
        <el-table-column
          label="操作"
          align="center"
          width="100"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{ row }">
            <el-button
              type="success"
              size="mini"
              style="background-color: #244496; border: none"
              @click="confirmFeedbackOrder(row)"
            >
              确认到货
            </el-button>
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
import { getBrandEnum } from '@/api/enum'
import { confirmFeedback, exportFeedbackOrder, queryFeedbackOrder } from '@/api/feedback'

export default {
  name: 'User',
  data() {
    return {
      dialogStatus: 'create',
      dialogFormVisible: false,
      salePlanDialogFormVisible: false,
      page: 1,
      size: 10,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
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
      brands: []
    }
  },
  created() {
    this.getBrands()
    this.getList(1)
  },
  methods: {
    exportFeedbackOrder,
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
      // 1.获取该列的所有数据
      const arr = this.list.map((x) => x[prop])
      arr.push(label) // 把每列的表头也加进去算
      // 2.计算每列内容最大的宽度 + 表格的内间距（依据实际情况而定）
      return this.getMaxLength(arr) + 20 + 'px'
    },

    async getList(page) {
      this.listQuery.page = page
      this.listQuery.size = this.size
      this.listLoading = true
      const { data, total } = await queryFeedbackOrder(this.listQuery)
      this.list = data
      this.total = total
      this.listLoading = false
    },

    async getBrands() {
      const { data } = await getBrandEnum()
      this.brands = data
    },

    confirmFeedbackOrder(row) {
      confirmFeedback(row.id).then((res) => {
        if (res.data) {
          this.$message.success('已确认')
          this.getList(this.page)
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

  .product-list {
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
