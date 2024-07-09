<template>
  <div class="container">
    <vue-tree
      style="width: 100%; height: 600px; border: 1px solid gray;overflow: scroll"
      :dataset="bomData"
      :config="treeConfig"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
          class="rich-media-node"
          :style="{ border: collapsed ? '2px solid grey' : '' }"
        >
          <span
            style="padding: 4px 0; font-size: 12px; font-weight: bold;"
          >TRS: {{ node.data.trsNo }}</span>
          <span
            style="padding: 4px 0; font-size: 12px; font-weight: bold;"
          >物料类型: {{ node.data.componentType }}</span>
          <span
            style="padding: 4px 0; font-size: 12px; font-weight: bold;"
          >快反天数: {{ node.data.produceDay }}</span>
        </div>
      </template>
    </vue-tree>
  </div>
</template>

<script>

import VueTree from '@ssthouse/vue-tree-chart'
import Vue from 'vue'
import { queryBomTree } from '@/api/bom'
Vue.component('vue-tree', VueTree)

export default {
  name: 'BomTree',
  components: {
    VueTree
  },

  props: {
    skuId: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      bomData: null,
      treeConfig: { nodeWidth: 150, nodeHeight: 80, levelHeight: 200 }
    }
  },

  async created() {
    this.render(this.skuId)
  },
  methods: {
    async render(skuId) {
      if (skuId) {
        const { data } = await queryBomTree(skuId)
        this.bomData = data
        this.skuId = skuId
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rich-media-node {
  width: 240px;
  padding: 8px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  background-color: blue;
  border-radius: 4px;
}
</style>
