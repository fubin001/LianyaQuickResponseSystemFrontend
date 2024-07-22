<template>
  <el-dialog title="物料单" :visible.sync="visible" :before-close="handleClose" width="1200px">
    <el-tabs v-model="activeName">
      <el-tab-pane label="物料需求计划" name="first">
        <div class="size-info" style="width: 100%">
          <div style="height: 2rem; line-height: 2rem; padding: 0 0.1rem;">
            <span style="float: right">
              <el-button
                size="medium"
                style="color: #244496; border: none"
                icon="el-icon-plus"
                @click="exportProduceMaterialUseBomList(feedbackOrderId)"
              >导出物料单</el-button>
            </span>
          </div>
          <el-table ref="sizeData" :data="sizeInfo">
            <el-table-column label="尺码" prop="size" :min-width="flexColumnWidth(sizeInfo, '尺码', 'size')" />
            <el-table-column label="数量" prop="quantity" :min-width="flexColumnWidth(sizeInfo, '数量', 'quantity')" />
          </el-table>
        </div>
        <el-table :data="useBomList" row-key="id" :header-cell-style="{ background: '#e4e7f0' }" fit highlight-current-row>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <!-- <span>{{ scope.row }}</span> -->
              <el-button
                v-if="!scope.row.supplyState"
                size="mini"
                type="primary"
                @click="onUpdSupplyState(scope.row)"
              >确认补货</el-button>
              <!-- <el-button v-if="!scope.row.supplyState && scope.row.needFeedbackQuantity > 0.0001" size="mini" type="primary" @click="onUpdSupplyState(row)">确认补货</el-button> -->
              <el-button v-else disabled size="small">补货完成</el-button>
              <el-button
                v-if="!scope.row.produceState"
                size="mini"
                type="primary"
                @click="onUpdIDProduceState(scope.row)"
              >确认生产</el-button>
              <el-button v-else disabled size="small">生产完成</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="layer" label="层" :min-width="flexColumnWidth(useBomList, '层', 'layer')" />
          <el-table-column prop="trsNo" label="TRS编号" :min-width="flexColumnWidth(useBomList, 'TRS编号', 'trsNo')" />
          <el-table-column prop="colorCode" label="颜色代码" :min-width="flexColumnWidth(useBomList, '颜色代码', 'colorCode')" />
          <el-table-column prop="supplier" label="供应商" :min-width="flexColumnWidth(useBomList, '供应商', 'supplier')" />
          <el-table-column
            prop="supplierMaterialComponentNo"
            label="供应商物料编号"
            :min-width="flexColumnWidth(useBomList, '供应商物料编号', 'supplierMaterialComponentNo')"
          />
          <el-table-column
            prop="componentType"
            label="组件类型"
            :min-width="flexColumnWidth(useBomList, '组件类型', 'componentType')"
          />
          <el-table-column prop="unitName" label="单位" :min-width="flexColumnWidth(useBomList, '单位', 'unitName')" />
          <el-table-column prop="size" label="尺码" :min-width="flexColumnWidth(useBomList, '尺码', 'size')" />
          <el-table-column
            prop="useQuantity"
            label="用量(单件)"
            :min-width="flexColumnWidth(useBomList, '单位用量', 'useQuantity')"
          />
          <el-table-column
            prop="totalQuantity"
            label="数量"
            :min-width="flexColumnWidth(useBomList, '数量', 'totalQuantity')"
          />
          <el-table-column
            prop="totalUseQuantity"
            label="总用量"
            :min-width="flexColumnWidth(useBomList, '总用量', 'totalUseQuantity')"
          />
          <el-table-column
            prop="storageQuantity"
            label="锁定库存数量"
            :min-width="flexColumnWidth(useBomList, '锁定库存数量', 'storageQuantity')"
          />
          <el-table-column
            prop="needFeedbackQuantity"
            label="快反数量"
            :min-width="flexColumnWidth(useBomList, '快反数量', 'needFeedbackQuantity')"
          />
          <el-table-column
            prop="useStorageQuantity"
            label="锁定库存用量"
            :min-width="flexColumnWidth(useBomList, '锁定库存用量', 'useStorageQuantity')"
          />
          <el-table-column
            prop="useNeedFeedbackQuantity"
            label="快反用量"
            :min-width="flexColumnWidth(useBomList, '快反用量', 'useNeedFeedbackQuantity')"
          />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="生产可视化" name="second">
        <div class="container">
          <vue-tree
            style="width: 100%; height: 500px; border: 1px solid gray;overflow: scroll"
            :dataset="produceNode"
            :config="treeConfig"
          >
            <template v-slot:node="{ node, collapsed }">
              <div
                :class="nodeClasses[''+node.state]"
                :style="{ border: collapsed ? '2px solid grey' : '' }"
              >
                <div v-if="node.trsNo">
                  <div
                    style="padding: 4px 0; font-size: 12px; font-weight: bold;"
                  >TRS: {{ node.trsNo }}
                  </div>
                  <div
                    v-if="node.size"
                    style="padding: 4px 0; font-size: 12px; font-weight: bold;"
                  >尺寸: {{ node.size }}
                  </div>
                  <div v-else style="padding: 4px 0; font-size: 12px; font-weight: bold;">
                    尺寸: 不区分
                  </div>
                  <div
                    v-if="node.colorCode"
                    style="padding: 4px 0; font-size: 12px; font-weight: bold;"
                  >颜色代码: {{ node.colorCode }}
                  </div>
                  <div v-else style="padding: 4px 0; font-size: 12px; font-weight: bold;">
                    颜色代码: 无
                  </div>
                  <div
                    style="padding: 4px 0; font-size: 12px; font-weight: bold;"
                  >处理状态:
                    <span v-if="node.state===0" style="border: none; color: #ffffff00; ">未开始</span>
                    <span v-else-if="node.state === 1" style="border: none">确认补货</span>
                    <span v-else-if="node.state === 2" style="border: none">补货完成</span>
                    <span v-else-if="node.state === 3" style="border: none">生产中</span>
                    <span v-else-if="node.state === 4" style="border: none">生产完成</span>
                  </div>
                </div>
                <div v-else>
                  <div
                    style="padding: 4px 0; font-size: 12px; font-weight: bold;"
                  > 生产汇总 </div>
                </div>
              </div>
            </template>
          </vue-tree>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>

</template>

<script>
import Vue from 'vue'

import { flexColumnWidth } from '@/common/util'
import { getFeedbackOrder, getProduceTree } from '@/api/feedback'
import {
  exportProduceMaterialUseBomList,
  getProduceMaterialSize,
  getProduceMaterialUseBomList,
  updIDSupplyState, updIDProduceState
} from '@/api/produceMaterial'
import VueTree from '@ssthouse/vue-tree-chart'
Vue.component('vue-tree', VueTree)

export default {
  name: 'ProduceMaterialListReader',
  components: {
    VueTree
  },
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
      useBomList: [],
      activeName: 'first',
      produceNode: {},
      produceTree: {},
      treeConfig: { nodeWidth: 150, nodeHeight: 80, levelHeight: 200 },
      nodeClasses: {
        '0': 'node-not-confirm',
        '1': 'node-supplying',
        '2': 'node-finish-supply',
        '3': 'node-producing',
        '4': 'node-finish-supply'
      }
    }
  },
  computed: {
  },

  watch: {
    params(newValue, oldValue) {
      this.skuId = newValue.skuId
      this.feedbackOrderId = newValue.feedbackOrderId
      if (this.skuId && this.feedbackOrderId) {
        this.getFeedbackOrder(this.feedbackOrderId)
        this.handleGetProduceTree(this.feedbackOrderId)
      }
    }
  },

  created() {
  },

  methods: {
    exportProduceMaterialUseBomList,
    flexColumnWidth,

    handleClose() {
      this.$emit('update:visible', false)
      this.$emit('close', 1)
    },
    onUpdSupplyState(row) {
      // row.supplyState=1
      updIDSupplyState({ id: row.id, supplyState: 1 }).finally(() => {
        if (this.skuId && this.feedbackOrderId) {
          this.getFeedbackOrder(this.feedbackOrderId)
        }
      })
      // console.log(row);
    },
    onUpdIDProduceState(row) {
      updIDProduceState({ id: row.id, produceState: 1 }).finally(() => {
        if (this.skuId && this.feedbackOrderId) {
          this.getFeedbackOrder(this.feedbackOrderId)
        }
      })
    },
    async getFeedbackOrder(feedbackOrderId) {
      await getFeedbackOrder(feedbackOrderId).then(res => {
        this.feedbackOrder = res?.data ?? {}
        this.totalQuantity = this.feedbackOrder.quantity
      })

      await getProduceMaterialSize(feedbackOrderId).then(res => {
        this.sizeInfo = res?.data ?? {}
      })

      await getProduceMaterialUseBomList(feedbackOrderId).then(res => {
        console.log(1)
        this.useBomList = res?.data ?? {}
      })
    },
    async handleGetProduceTree(produceOrderId) {
      await getProduceTree(produceOrderId).then(res => {
        this.produceTree = res?.data ?? {}
        console.log(this.produceTree)
        this.produceNode = this.produceTree?.root ?? {}
        console.log(this.produceNode)
      })
    }
  }
}
</script>

<style scoped lang="scss">

.container {
  width: 1200px;
  height: 500px;
  position: relative;
}

.node-not-confirm {
  width: 240px;
  padding: 8px;
  margin: 5px;
  justify-content: center;
  color: white;
  background-color: gray;
  border-radius: 4px;
}

.node-supplying {
  width: 240px;
  padding: 8px;
  margin: 5px;
  justify-content: center;
  color: white;
  background-color: pink;
  border-radius: 4px;
}

.node-finish-supply {
  width: 240px;
  padding: 8px;
  margin: 5px;
  justify-content: center;
  color: white;
  background-color: darkolivegreen;
  border-radius: 4px;
}

.node-producing {
  width: 240px;
  padding: 8px;
  margin: 5px;
  justify-content: center;
  color: white;
  background-color: #b3d3c2;
  border-radius: 4px;
}

.node-finish-produce {
  width: 240px;
  padding: 8px;
  margin: 5px;
  justify-content: center;
  color: white;
  background-color: green;
  border-radius: 4px;
}
</style>
