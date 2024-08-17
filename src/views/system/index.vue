<template>
  <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="数据管理" name="first">

      <el-row :gutter="20">
        <el-col :span="11">
          <el-date-picker v-model="pickerDate" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-button @click="onapiVRetailBILLDATE"  type="primary">更新销售</el-button>
        </el-col>
        <el-col :span="11">
          <el-button @click="apiMProduct"  type="primary">更新联亚商品到本地</el-button>
        </el-col>
        <el-col :span="11">
          <el-button @click="refreshVRetail"  type="primary">更新联亚销售商品</el-button>
        </el-col>
        <!-- <el-col :span="12">22
          2222
        </el-col>
        <el-col :span="12">
          666666
        </el-col> -->
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="api数据同步" name="fourth">

    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { apiVRetailBILLDATE } from "@/api/saleOrder";
import { refreshVRetail } from "@/api/sy";
import { apiMProduct } from "@/api/APILianya"
export default {
  name: '系统管理',
  data() {
    return {
      activeName: 'first',
      apiVRetailBILLDATEValue: {
        startDate: '',
        endDate: '',
      },
      pickerDate: null,
    };
  },
  methods: {
    /**获取联亚商品数据 */
    apiMProduct,
    /**获取联亚销售数据，到本地数据库 */
    refreshVRetail,
    /**指定时间范文刷新销售数据 */
    onapiVRetailBILLDATE() {
      apiVRetailBILLDATE(this.apiVRetailBILLDATEValue).then(res => {

      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  watch: {

    'pickerDate'(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);

        const dateArray = newVal.map(dateTime => {
          const date = new Date(dateTime);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;
          return formattedDate;
        });

        this.apiVRetailBILLDATEValue.startDate = dateArray[0];
        this.apiVRetailBILLDATEValue.endDate = dateArray[1];
      }

    }
  }
};
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