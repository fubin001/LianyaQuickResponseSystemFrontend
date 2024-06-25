<template>
  <div v-if="prepare">
    <h2>基础信息</h2>
    <el-dialog title="物料单" :visible.sync="visible">
      <el-form ref="dataForm" :model="sizeForm" label-position="left" label-width="70px" style="width: 300px; margin-left:50px;">
        <el-form-item label="尺寸" prop="id">
          <el-input v-model="sizeForm.id" style="width: 300px" disabled />
        </el-form-item>
        <el-form-item label="数量" prop="id">
          <el-input v-model="sizeForm.name" style="width: 300px" />
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="size-info" style="width: 100%">
      <div style="height: 2rem; line-height: 2rem; padding: 0 0.1rem;">
        <span style="float:left">
          订单总数：<el-input
            v-model="feedbackOrder.quantity"
            placeholder="尺码"
            style="width: 150px; margin: 5px 8px 5px 0;border: none"
            class="filter-item"
            disabled
          />
        </span>
        <span style="float:left">
          款号：<el-input
            v-model="sizeForm.size"
            placeholder="尺码"
            style="width: 150px; margin: 5px 8px 5px 0"
            class="filter-item"
          />
        </span>
        <span style="float:left">
          数量：<el-input-number
            v-model="sizeForm.quantity"
            :placeholder="'默认' + feedbackOrder.quantity"
            style="width: 150px; margin: 5px 8px 5px 0"
            class="filter-item"
          />
        </span>
        <span style="float: right">
          <el-button
            size="medium"
            style="color: #244496; border: none"
            icon="el-icon-plus"
            @click="changeUseBomPage"
          >生成物料单</el-button>
        </span>
        <span style="float: right">
          <el-button
            size="medium"
            style="color: #244496; border: none"
            icon="el-icon-plus"
            @click="addSize"
          >增加</el-button>
        </span>
      </div>
      <el-divider />

      <el-table ref="sizeData" :data="sizeInfo">
        <el-table-column label="尺码" prop="size" />
        <el-table-column label="数量" prop="quantity" />
        <el-table-column label="操作">
          <template slot-scope="{row,$index}">
            <el-button
              size="medium"
              style="color: #244496; border: none"
              icon="el-icon-minus"
              @click="remove($index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <h2>物料明细</h2>
    <el-table
      :data="bomList"
      row-key="id"
      :header-cell-style="{background:'#e4e7f0'}"
      fit
      highlight-current-row
    >
      <el-table-column prop="layer" label="层" :min-width="flexColumnWidth(bomList, '层', 'layer')" />
      <el-table-column prop="trsNo" label="TRS编号" :min-width="flexColumnWidth(bomList, 'TRS编号', 'trsNo')" />
      <el-table-column prop="color" label="颜色" :min-width="flexColumnWidth(bomList, 'TRS编号', 'trsNo')" />
      <el-table-column prop="supplier" label="供应商" :min-width="flexColumnWidth(bomList, '供应商', 'supplier')" />
      <el-table-column prop="supplierMaterialComponentNo" label="供应商物料编号" :min-width="flexColumnWidth(bomList, '供应商物料编号', 'supplierMaterialComponentNo')" />
      <el-table-column prop="materialDescription" label="物料描述" :min-width="flexColumnWidth(bomList, '物料描述', 'materialDescription')" />
      <el-table-column prop="componentType" label="组件类型" :min-width="flexColumnWidth(bomList, '组件类型', 'componentType')" />
      <el-table-column prop="unitName" label="单位" :min-width="flexColumnWidth(bomList, '层', 'unitName')" />
      <el-table-column prop="useQuantity" label="用量(单件)" :min-width="flexColumnWidth(useBomList, '单位用量', 'useQuantity')">
        <template slot-scope="{row}">
          {{ Number(row.useQuantity).toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="size" label="是否区分尺寸" :min-width="flexColumnWidth(bomList, '', 'size')" />

    </el-table>
  </div>
  <div v-else>
    <h2>物料需求计划</h2>
    <div class="size-info" style="width: 100%">
      <div style="height: 2rem; line-height: 2rem; padding: 0 0.1rem;">
        <span style="float: right">
          <el-button
            size="medium"
            style="color: #244496; border: none"
            icon="el-icon-plus"
            @click="changeUseBomPage"
          >配置物料单</el-button>
        </span>
        <span style="float: right">
          <el-button
            size="medium"
            style="color: #244496; border: none"
            icon="el-icon-plus"
            @click="addSize"
          >确定</el-button>
        </span>
      </div>
      <el-table ref="sizeData" :data="sizeInfo">
        <el-table-column label="尺码" prop="size" :min-width="flexColumnWidth(sizeInfo, '尺码', 'size')" />
        <el-table-column label="数量" prop="quantity" :min-width="flexColumnWidth(sizeInfo, '数量', 'quantity')" />
      </el-table>
    </div>
    <el-table
      :data="useBomList"
      row-key="id"
      :header-cell-style="{background:'#e4e7f0'}"
      fit
      highlight-current-row
    >
      <el-table-column prop="layer" label="层" :min-width="flexColumnWidth(useBomList, '层', 'layer')" />
      <el-table-column prop="trsNo" label="TRS编号" :min-width="flexColumnWidth(useBomList, 'TRS编号', 'trsNo')" />
      <el-table-column prop="color" label="颜色" :min-width="flexColumnWidth(useBomList, 'TRS编号', 'trsNo')" />
      <el-table-column prop="supplier" label="供应商" :min-width="flexColumnWidth(useBomList, '供应商', 'supplier')" />
      <el-table-column prop="supplierMaterialComponentNo" label="供应商物料编号" :min-width="flexColumnWidth(useBomList, '供应商物料编号', 'supplierMaterialComponentNo')" />
      <el-table-column prop="materialDescription" label="物料描述" :min-width="flexColumnWidth(useBomList, '物料描述', 'materialDescription')" />
      <el-table-column prop="componentType" label="组件类型" :min-width="flexColumnWidth(useBomList, '组件类型', 'componentType')" />
      <el-table-column prop="unitName" label="单位" :min-width="flexColumnWidth(useBomList, '层', 'unitName')" />
      <el-table-column prop="size" label="尺码" :min-width="flexColumnWidth(useBomList, '尺码', 'size')" />
      <el-table-column prop="useQuantity" label="用量(单件)" :min-width="flexColumnWidth(useBomList, '单位用量', 'useQuantity')">
        <template slot-scope="{row}">
          {{ Number(row.useQuantity).toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="totalQuantity" label="数量" :min-width="flexColumnWidth(useBomList, '数量', 'totalQuantity')" />
      <el-table-column prop="totalUseQuantity" label="总用量" :min-width="flexColumnWidth(useBomList, '总量', 'totalUseQuantity')">
        <template slot-scope="{row}">
          {{ Number(row.totalUseQuantity).toFixed(2) }}
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { generateProduceMaterial, getBomTreeNodeListByRootTrs } from '@/api/bom'
import { flexColumnWidth } from '@/common/util'
import { getFeedbackOrder } from '@/api/feedback'

export default {
  name: 'ProduceMaterialList',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => {
        return 0
      }
    }
  },
  data() {
    return {
      bomList: [],
      sizeInfo: [],
      sizeForm: {},
      totalQuantity: 0,
      feedbackOrder: {},
      dialogVisible: false,
      prepare: true,
      useBomList: []
    }
  },
  watch: {
    params(newValue, oldValue) {
      this.skuId = newValue.skuId
      this.feedbackOrderId = newValue.feedbackOrderId
      if (this.skuId && this.feedbackOrderId) {
        this.getBomList(this.skuId)
        this.getFeedbackOrder(this.feedbackOrderId)
      }
    }
  },
  created() {
  },

  methods: {
    flexColumnWidth,
    addSize() {
      if (!this.sizeForm.size) {
        this.$message.warning('需要填写尺码信息')
        return
      }

      if (this.sizeForm.quantity != null || this.sizeForm.quantity !== undefined) {
        if (this.feedbackOrder.quantity < this.sizeForm.quantity) {
          this.$message.warning('分尺码数量不能大于订单总数')
          return
        }
      } else {
        if (this.feedbackOrder.quantity < this.sizeForm.quantity) {
          this.$message.warning('分尺码数量不能大于订单总数')
          return
        }
        this.sizeForm.quantity = this.feedbackOrder.quantity
      }
      if (this.feedbackOrder.quantity < this.sizeForm.quantity) {
        this.$message.warning('分尺码数量不能大于订单总数')
        return
      }
      this.sizeInfo.push({
        size: this.sizeForm.size,
        quantity: this.sizeForm.quantity
      })
      this.$refs.sizeData.$forceUpdate()
      this.feedbackOrder.quantity -= this.sizeForm.quantity
      this.sizeForm = {}
    },

    remove(no) {
      this.feedbackOrder.quantity += this.sizeInfo[no].quantity
      this.sizeInfo.splice(no, 1)
    },

    async getBomList(skuId, rtsNo) {
      await getBomTreeNodeListByRootTrs(skuId, rtsNo).then(res => {
        this.bomList = res?.data ?? []
      })
    },

    async getFeedbackOrder(feedbackOrderId) {
      await getFeedbackOrder(feedbackOrderId).then(res => {
        this.feedbackOrder = res?.data ?? {}
        this.totalQuantity = this.feedbackOrder.quantity
      })
    },

    async changeUseBomPage() {
      console.log(this.prepare)
      if (this.prepare) {
        const data = {
          skuId: this.skuId,
          totalQuantity: this.totalQuantity,
          sizeInfoList: this.sizeInfo,
          feedbackOrderId: this.feedbackOrderId,
          rtsNo: this.feedbackOrder.rtsNo
        }
        await generateProduceMaterial(data).then(res => {
          this.useBomList = res?.data ?? []
          this.prepare = false
        })
      } else {
        this.prepare = true
      }
    }
  }
}
</script>
