<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <span>
        TRS编号：<el-input
          v-model="listQuery.skuId"
          placeholder="TRS编号"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        />
      </span> -->

      <span>
        TRS编号：
        <el-select v-model="listQuery.skuId" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" clearable
          allow-create filterable>
          <el-option v-for="item in trsEnumList" :key="item.name" :label="item.name" :value="item.value" />
        </el-select>
      </span>
      <span>
        反馈类型：<el-select v-model="listQuery.feedbackType" placeholder="反馈类型" style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item" filterable clearable>
          <el-option value="销售预测" />
          <el-option value="人工操作" />
        </el-select>
      </span>
      <span style="float: right">
        <el-button class="filter-item" plain style="margin: 5px 8px 5px 0" @click="reset">
          重置
        </el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-search"
          style="margin: 5px 0px 5px 0; background-color: #244496" @click="getList(1)">
          搜索
        </el-button>
        <el-button class="filter-item" icon="el-icon-search" style="margin: 5px 0px 5px 0; background-color: #244496"
          type="primary" @click="addProduceOrderDialogFormVisible = true">
          新增
        </el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-search"
          style="margin: 5px 0px 5px 0; background-color: #244496" @click="exportFeedbackOrder(listQuery)">
          下载
        </el-button>
      </span>
    </div>

    <el-dialog title="新增生产订单" :visible.sync="addProduceOrderDialogFormVisible" width="500px">
      <el-form ref="dataForm" :model="newOrder" label-position="left" label-width="70px"
        style="width: 300px; margin-left:50px;">
        <el-form-item label="物料类型" prop="id">
          <el-select v-model="newOrder.componentType" clearable filterable style="width: 300px"
            @change="handleComponentTypeChange">
            <el-option v-for="componentType in componentTypeList" :key="componentType" :label="componentType"
              :value="componentType" />
          </el-select>
        </el-form-item>
        <el-form-item label="TRS编号" prop="id">
          <el-select v-model="newOrder.trsNo" clearable filterable style="width: 300px">
            <el-option v-for="trsNoEnum in currentTrsNoList" :key="trsNoEnum.key" :label="trsNoEnum.key"
              :value="trsNoEnum.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="newOrder.materialQuantity" style="width: 300px" />
        </el-form-item>
        <el-form-item label="尺寸">
          <el-input v-model="newOrder.size" style="width: 300px" />
        </el-form-item>
        <el-form-item label="生产时间">
          <el-date-picker v-model="newOrder.startProduceDate" style="width: 300px" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="newOrder.endProduceDate" style="width: 300px" value-format="yyyy-MM-dd" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addProduceOrderDialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addNewProductOrder">
          确定
        </el-button>
      </div>
    </el-dialog>

    <div class="table-list">
      <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id"
        :header-cell-style="{ background: '#e4e7f0' }" fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="ID" prop="id" width="50" />
        <el-table-column label="操作" align="left" width="200" class-name="small-padding fixed-width">
          <template slot-scope="{ row }">
            <span v-if="row.orderState < 2">
              <el-button size="mini" style="color: #244496; border: none" icon="el-icon-edit-outline"
                @click="popProduceMaterialList(row.skuId, row.id)">
                配置物料
              </el-button>
            </span>
            <span v-if="row.orderState > 0">
              <el-button size="mini" style="color: #244496; border: none" icon="el-icon-search"
                @click="popProduceMaterialListReader(row.skuId, row.id)">
                查看物料
              </el-button>
              <el-button size="mini" style="color: #244496; border: none" icon="el-icon-arrow-right"
                @click="executeFeedbackOrder(row)">
                执行反馈
              </el-button>
            </span>
            <el-button size="mini" style="color: #244496; border: none" icon="el-icon-circle-check"
              @click="confirmFeedbackOrder(row)">
              确认到货
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="left" label="skuId" prop="skuId" :min-width="flexColumnWidth(list, 'skuId', 'skuId')" />
        <el-table-column align="left" label="TRS编号" prop="rtsNo" :min-width="flexColumnWidth(list, 'RTS编号', 'rtsNo')" />
        <el-table-column align="left" label="订单类型" prop="feedbackType"
          :min-width="flexColumnWidth(list, '订单类型', 'feedbackType')" />
        <el-table-column align="left" label="订货日期" prop="bookDate"
          :min-width="flexColumnWidth(list, '订货日期', 'bookDate')" />
        <el-table-column align="left" label="预计到货" prop="predictDate"
          :min-width="flexColumnWidth(list, '预计到货', 'predictDate')" />
        <el-table-column align="left" label="确认到货" prop="confirmDate"
          :min-width="flexColumnWidth(list, '确认到货', 'confirmDate')" />
        <el-table-column align="left" label="订货数量" prop="quantity"
          :min-width="flexColumnWidth(list, '订货数量', 'quantity')" />
        <el-table-column align="left" label="颜色" prop="color" :min-width="flexColumnWidth(list, '颜色', 'color')" />
        <el-table-column align="left" label="颜色名称" prop="colorName"
          :min-width="flexColumnWidth(list, '颜色名称', 'colorName')" />
        <el-table-column align="left" label="销售YTD" prop="ytd" :min-width="flexColumnWidth(list, '销售YTD', 'ytd')">
          <template slot-scope="{ row }">
            <span v-if="row.ytd">
              {{ row.ytd }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="库存量" prop="storage" :min-width="flexColumnWidth(list, '库存量', 'storage')">
          <template slot-scope="{ row }">
            <span v-if="row.storage">
              {{ row.storage }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="YTD售罄率" prop="ytdSaleOutRate"
          :min-width="flexColumnWidth(list, 'YTD售罄率', 'ytdSaleOutRate')">
          <template slot-scope="{ row }">
            <span v-if="row.ytdSaleOutRate">
              {{ new Number(row.ytdSaleOutRate * 100).toFixed(2) }} %
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="首单售罄率" prop="firstOrderSaleOut"
          :width="flexColumnWidth(list, '首单售罄率', 'firstOrderSaleOut')">
          <template slot-scope="{ row }">
            <span v-if="row.firstOrderSaleOut">
              {{ new Number(row.firstOrderSaleOut * 100).toFixed(2) }} %
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="预计最终销售" prop="predictFinalSale"
          :width="flexColumnWidth(list, '预计最终销售', 'predictFinalSale')" />
        <el-table-column align="left" label="剩余预计销售" prop="restSale"
          :width="flexColumnWidth(list, '剩余预计销售', 'restSale')">
          <template slot-scope="{ row }">
            <span v-if="row.restSale">
              {{ row.restSale }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="预计最终售罄率" prop="predictFinalSaleOut"
          :width="flexColumnWidth(list, '预计最终售罄率', 'predictFinalSaleOut')">
          <template slot-scope="{ row }">
            <span v-if="row.predictFinalSaleOut">
              {{ Number(row.predictFinalSaleOut * 100).toFixed(2) }}%
            </span>
            <span>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="上周销售" prop="lastWeekSale"
          :width="flexColumnWidth(list, '上周销售', 'lastWeekSale')">
          <template slot-scope="{ row }">
            <span v-if="row.lastWeekSale">
              {{ row.lastWeekSale }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="本周销售" prop="currentWeekSale"
          :width="flexColumnWidth(list, '本周销售', 'currentWeekSale')">
          <template slot-scope="{ row }">
            <span v-if="row.currentWeekSale">
              {{ row.currentWeekSale }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="最近四周销售" prop="recentlyFourWeekSale"
          :width="flexColumnWidth(list, '最近四周销售', 'flexColumnWidth')">
          <template slot-scope="{ row }">
            <span v-if="row.recentlyFourWeekSale">
              {{ row.recentlyFourWeekSale }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="最近四周销售平均" prop="recentlyFourWeekAvgSale"
          :width="flexColumnWidth(list, '最近四周销售平均', 'recentlyFourWeekAvgSale')">
          <template slot-scope="{ row }">
            <span v-if="row.recentlyFourWeekAvgSale">
              {{ row.recentlyFourWeekAvgSale }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="total" :page-sizes="[10, 20, 50, 100]"
        :current-page="page" :page-size="size" align="center" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />

      <ProduceMaterialList :params="produceMaterialListObj.params" :visible.sync="produceMaterialListObj.visible"
        @close="getList(page)" />
      <ProduceMaterialListReader :params="produceMaterialReaderListObj.params"
        :visible.sync="produceMaterialReaderListObj.visible" @close="getList(page)" />

    </div>
  </div>
</template>

<script>
import { getBrandEnum, getTrsNoEnumList } from '@/api/enum'
import {
  addFeedbackOrder, addProduceOrder,
  confirmFeedback,
  executeFeedback,
  exportFeedbackOrder,
  queryFeedbackOrder
} from '@/api/feedback'
import ProduceMaterialList from '@/views/product/component/produceMaterialList.vue'
import ProduceMaterialListReader from '@/views/product/component/produceMaterialListReader.vue'
import { flexColumnWidth } from '@/common/util'
import { getTrsNoEnumListByComponentType } from '@/api/bom'
import {
  updFeedbackOrderIDState, getProduceMaterialUseBomList
} from '@/api/produceMaterial'
export default {
  name: '生产订单',
  components: { ProduceMaterialListReader, ProduceMaterialList },
  data() {
    return {
      dialogStatus: 'create',
      produceMaterialListObj: {
        visible: false,
        params: {}
      },
      produceMaterialReaderListObj: {
        visible: false,
        params: {}
      },
      readerDialogFormVisible: false,
      page: 1,
      size: 10,
      list: null,
      total: null,
      listLoading: true,
      addProduceOrderDialogFormVisible: false,
      newOrder: {},
      componentTypeList: ['成品', '鞋面半成品', '鞋底半成品'],
      listQuery: {
        skuId: '',
        page: 1,
        size: 10
      },
      trsEnumList: [],// SUKID 搜索框 数据查询
      finishedTrsNosList: [],
      semiFinishTrsNoList1: [],
      semiFinishTrsNoList2: [],
      currentTrsNoList: [],
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

  async created() {
    this.listQuery.skuId = this.$route.query.skuId ? this.$route.query.skuId : ''
    await this.initTrsNoList()
    await this.getBrands()
    await this.initTrsList()
    this.getList(1)
  },
  methods: {
    flexColumnWidth,
    exportFeedbackOrder,
    reset() {
      this.listQuery = {
        page: 1,
        size: 10
      }
    },

    initTrsNoList() {
      getTrsNoEnumListByComponentType('成品').then(res => {
        this.finishedTrsNosList = res?.data ?? []
      })
      getTrsNoEnumListByComponentType('鞋面半成品').then(res => {
        this.semiFinishTrsNoList1 = res?.data ?? []
      })
      getTrsNoEnumListByComponentType('鞋底半成品').then(res => {
        this.semiFinishTrsNoList2 = res?.data ?? []
      })
    },
    //全部完成
    async onupdFeedbackOrderIDState(row) {
      console.log(row);
      await updFeedbackOrderIDState({ feedbackOrderId: row.id, supplyState: 1, produceState: 1 }).then((res) => {
      }).finally(() => {
        this.getList(1)
      })
    },
    async initTrsList() {
      await getTrsNoEnumList().then(res => {
        this.trsEnumList = res?.data ?? []
      })
    },
    popProduceMaterialList(skuId, feedbackOrderId) {
      this.produceMaterialListObj.visible = true
      this.produceMaterialListObj.params = {
        skuId: skuId,
        feedbackOrderId: feedbackOrderId
      }
    },

    async popProduceMaterialListReader(skuId, feedbackOrderId) {
      this.produceMaterialReaderListObj.visible = true
      this.produceMaterialReaderListObj.params = {
        skuId: skuId,
        feedbackOrderId: feedbackOrderId
      }
    },

    addNewProductOrder() {
      if (!this.newOrder.trsNo) {
        this.$message.warning('trsNo不能为空')
        return
      }
      if (!this.newOrder.materialQuantity) {
        this.$message.warning('数量不能为空')
        return
      }
      if (!this.newOrder.startProduceDate) {
        this.$message.warning('开始时间不能为空')
      }
      addProduceOrder(this.newOrder).then(res => {
        if (res.data) {
          this.$message.success('添加成功')
          this.getList(1)
        } else {
          this.$message.error('添加失败')
        }
        this.addProduceOrderDialogFormVisible = false
      }).catch(res => {
        this.$message.error('添加失败')
        this.addProduceOrderDialogFormVisible = false
      })
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

    handleComponentTypeChange(value) {
      console.log(value)
      if (value === '成品') {
        this.currentTrsNoList = this.finishedTrsNosList
      } else if (value === '鞋底半成品') {
        this.currentTrsNoList = this.semiFinishTrsNoList2
      } else {
        this.currentTrsNoList = this.semiFinishTrsNoList1
      }
    },

    async getBrands() {
      const { data } = await getBrandEnum()
      this.brands = data
    },
    //确认到货
    async confirmFeedbackOrder(row) {
      var hasZero = false
      await getProduceMaterialUseBomList(row.id).then((res) => {
        console.log(res.data);
        hasZero = res.data.some(item => item['produceState'] <= 0 || item['supplyState'] <= 0)
      }).finally(() => {
        // console.log(hasZero);
      })
      console.log(hasZero);
      try {
        if (hasZero) {
          await this.$confirm('请查看物料确认所有物流均已完成生产和补货', {
            confirmButtonText: '一键全部完成',
            cancelButtonText: '去查看',
            type: 'warning'
          }).then(() => {
            console.log(437);
            this.onupdFeedbackOrderIDState(row)
          }).catch(() => {
            this.popProduceMaterialListReader(row.skuId, row.id)
            throw new Error('Terminating all functions');
          });
        }
        console.log(439);
        //确认到货  
        await confirmFeedback(row.id).then((res) => {
          if (res.data) {
            this.$message.success('已确认')
            this.getList(this.page)
          }
        })
      } catch (error) {

      }





    },



    executeFeedbackOrder(row) {
      executeFeedback(row.id).then((res) => {
        if (res.data) {
          this.$message.success('已确认')
          this.$forceUpdate()
        }
      })
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
