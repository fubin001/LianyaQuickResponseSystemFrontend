<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="数据管理" name="first">

      <el-row :gutter="20">
        <el-col :span="11">
          <el-date-picker
            v-model="pickerDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <el-button type="primary" @click="onapiVRetailBILLDATE()">拉取,指定销售时间的销售数据到本地</el-button>
        </el-col>
        <el-col :span="11">
          <el-date-picker
            v-model="pickerDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <el-button type="primary" @click="onsyncBuyOrder()">采购同步更新</el-button>
        </el-col>
        <el-col :span="11">
          <el-button type="primary" @click="apiMProduct()">更新联亚商品到本地</el-button>
        </el-col>
        <el-col :span="11">
          <el-button type="primary" @click="lianYaSale()">更新联亚销售所有相关数据</el-button>
        </el-col>
        <el-col :span="11">
          <el-button type="primary" @click="lianYaBuy()">更新联亚采购所有相关数据</el-button>
        </el-col>
        <el-col :span="11">
          <el-button type="primary" @click="M_PRODUCT_ALIAS()">M_PRODUCT_ALIAS表更新</el-button>
        </el-col>
        <el-col :span="11">
          <el-button type="primary" @click="weather15DaySY()">天气测试</el-button>
        </el-col>
        <!-- <el-col :span="12">22
          2222
        </el-col>
        <el-col :span="12">
          666666
        </el-col> -->
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="api数据同步" name="fourth" />
  </el-tabs>
</template>
<script>
import { apiVRetailBILLDATE } from '@/api/saleOrder'
import { weather15DaySY } from '@/api/city.js'
// import { refreshVRetail } from '@/api/sy'
import { apiMProduct, lianYaSale, lianYaBuy, M_PRODUCT_ALIAS } from '@/api/apiLianYa'
import { syncBuyOrder } from '@/api/sync.js'
export default {
  name: 'SystemIndex',
  data() {
    return {
      activeName: 'first',
      apiVRetailBILLDATEValue: {
        startDate: '',
        endDate: ''
      },
      pickerDate: null
    }
  },
  watch: {

    'pickerDate'(newVal, oldVal) {
      if (newVal) {
        console.log(newVal)

        const dateArray = newVal.map(dateTime => {
          const date = new Date(dateTime)
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const day = String(date.getDate()).padStart(2, '0')
          const formattedDate = `${year}-${month}-${day}`
          return formattedDate
        })

        this.apiVRetailBILLDATEValue.startDate = dateArray[0]
        this.apiVRetailBILLDATEValue.endDate = dateArray[1]
      }
    }
  },
  methods: {
    /** 获取联亚商品数据 */
    apiMProduct,
    lianYaSale,
    lianYaBuy,
    M_PRODUCT_ALIAS,
    weather15DaySY,
    onsyncBuyOrder() {
      syncBuyOrder(this.apiVRetailBILLDATEValue).then(res => {

      })
    },
    /** 指定时间范文刷新销售数据 */
    onapiVRetailBILLDATE() {
      apiVRetailBILLDATE(this.apiVRetailBILLDATEValue).then(res => {

      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
  margin: 10px;
  /* background-color: rgb(119, 192, 255); */

}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
