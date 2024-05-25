
<template>
  <div class="app-container">
    <div class="filter-container">
      <span>
        品牌名称：<el-input
          v-model="listQuery.brand"
          placeholder="请输入品牌名称"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
      /></span>
      <span
        >商品名称：<el-input
          v-model="listQuery.productName"
          placeholder="请输入商品名称"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
      /></span>
      <span
        >货号：<el-input
          v-model="listQuery.skuId"
          placeholder="请输入货号"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        />
      </span>
      <span class="end">
        <span
          ><el-button
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
          </el-button></span
        >
      </span>
      <div style="clear: both"></div>
    </div>

    <div class="product-list">
      <div style="height: 2rem; line-height: 2rem; padding: 0 0.1rem;">
        <span style="float: left;">商品列表</span>
        <span style="float: right">
          <el-upload
            action="/api/saleOrder/importExcel"
            :show-file-list="false"
            :on-success="handleFileUploadSuccess"
            :on-error="handleFileUploadError"
            style="display: inline-block"
          >
            <el-button
              type="primary"
              class="ml-5"
              size="mini"
              style="background-color: #244496"
              :loading="upLoading"
              @click="upLoading = true"
              >上传<i class="el-icon-top"
            /></el-button>
          </el-upload>
        </span>
      </div>
      <el-table
        ref="dragTable"
        v-loading="listLoading"
        :data="list"
        row-key="id"
        fit
        :header-cell-style="{ background: '#e4e7f0' }"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          align="center"
          label="序号"
          width="50"
          type="index"
          :index="Nindex"
        />
        <el-table-column
          prop="skuId"
          align="left"
          label="货号"
          :width="flexColumnWidth('货号', 'skuId')"
        />
        <el-table-column
          prop="productName"
          align="left"
          label="商品名称"
          :width="flexColumnWidth('商品名称', 'productName')"
        />
        <el-table-column
          prop="brand"
          align="left"
          label="品牌名称"
          :width="flexColumnWidth('品牌名称', 'brand')"
        />
        <el-table-column
          prop="colorSize"
          align="left"
          label="色-尺"
          :width="flexColumnWidth('色-尺', 'colorSize')"
        />
        <el-table-column
          prop="colorName"
          align="left"
          label="颜色名称"
          :width="flexColumnWidth('颜色名称', 'colorName')"
        />
        <el-table-column
          prop="color"
          align="left"
          label="颜色"
          :width="flexColumnWidth('颜色', 'color')"
        />
        <el-table-column
          prop="size"
          align="left"
          label="尺寸"
          :width="flexColumnWidth('尺寸', 'size')"
        />
        <el-table-column
          prop="firstCode"
          align="left"
          label="第一条码"
          :width="flexColumnWidth('第一条码', 'firstCode')"
        />
        <el-table-column
          prop="orderId"
          align="left"
          label="订单号"
          :width="flexColumnWidth('订单号', 'orderId')"
        />
        <el-table-column
          prop="saler"
          align="left"
          label="售货员"
          :width="flexColumnWidth('售货员', 'saler')"
        />
        <el-table-column
          prop="date"
          align="left"
          label="日期"
          :width="flexColumnWidth('日期', 'date')"
        />
        <el-table-column
          prop="code"
          align="left"
          label="代号"
          :width="flexColumnWidth('代号', 'code')"
        />
        <el-table-column
          prop="name"
          align="left"
          label="名称"
          :width="flexColumnWidth('名称', 'name')"
        />
        <el-table-column
          prop="quantity"
          align="left"
          label="数量"
          :width="flexColumnWidth('数量', 'quantity')"
        />
        <el-table-column
          prop="brandPrice"
          align="left"
          label="品牌价"
          :width="flexColumnWidth('品牌价', 'brandPrice')"
        />
        <el-table-column
          prop="brandPriceQuantity"
          align="left"
          label="牌价额"
          :width="flexColumnWidth('牌价额', 'brandPriceQuantity')"
        />
        <el-table-column
          prop="currentPrice"
          align="left"
          label="当前价格"
          :width="flexColumnWidth('当前价格', 'currentPrice')"
        />
        <el-table-column
          prop="currentPriceAmount"
          align="left"
          label="当前价格额度"
          :width="flexColumnWidth('当前价格额度', 'currentPriceAmount')"
        />
        <el-table-column
          prop="singlePrice"
          align="left"
          label="单剧价"
          :width="flexColumnWidth('单剧价', 'singlePrice')"
        />
        <el-table-column
          prop="singlePriceAmount"
          align="left"
          label="单剧价额度"
          :width="flexColumnWidth('单剧价额度', 'singlePriceAmount')"
        />
        <el-table-column
          prop="confirm"
          align="left"
          label="确认"
          :width="flexColumnWidth('确认', 'confirm')"
        />
        <el-table-column
          prop="category"
          align="left"
          label="类别"
          :width="flexColumnWidth('类别', 'category')"
        />
        <el-table-column
          prop="transferItem"
          align="left"
          label="过账"
          :width="flexColumnWidth('过账', 'transferItem')"
        />
        <el-table-column
          prop="salePlatform"
          align="left"
          label="销售平台"
          :width="flexColumnWidth('销售平台', 'salePlatform')"
        />
        <el-table-column
          prop="oldOrderId"
          align="left"
          label="原单号"
          :width="flexColumnWidth('原单号', 'oldOrderId')"
        />
        <el-table-column
          prop="discountPrice"
          align="left"
          label="折后价"
          :width="flexColumnWidth('折后价', 'discountPrice')"
        />
        <el-table-column
          prop="discountPriceAmount"
          align="left"
          label="折后价额"
          :width="flexColumnWidth('折后价额', 'discountPriceAmount')"
        />
        <el-table-column
          prop="settlementPrice"
          align="left"
          label="结算价"
          :width="flexColumnWidth('结算价', 'settlementPrice')"
        />
        <el-table-column
          prop="settlementPriceAmount"
          align="left"
          label="结算价额"
          :width="flexColumnWidth('结算价额', 'settlementPriceAmount')"
        />
        <el-table-column
          prop="settlementPayAmount"
          align="left"
          label="结算收款额"
          :width="flexColumnWidth('结算收款额', 'settlementPayAmount')"
        />
        <el-table-column
          prop="payPointAmount"
          align="left"
          label="收款积分额"
          :width="flexColumnWidth('收款积分额', 'payPointAmount')"
        />
        <el-table-column
          prop="cardNumber"
          align="left"
          label="卡号"
          :width="flexColumnWidth('卡号', 'cardNumber')"
        />
        <el-table-column
          prop="payNetworkSite"
          align="left"
          label="收款网点"
          :width="flexColumnWidth('收款网点', 'payNetworkSite')"
        />
        <el-table-column
          prop="priceOrder"
          align="left"
          label="价格单"
          :width="flexColumnWidth('价格单', 'priceOrder')"
        />
        <el-table-column
          prop="promotionInfo"
          align="left"
          label="营销信息"
          :width="flexColumnWidth('营销信息', 'promotionInfo')"
        />
        <el-table-column
          prop="nickName"
          align="left"
          label="昵称"
          :width="flexColumnWidth('昵称', 'nickName')"
        />
        <el-table-column
          prop="tradeOrderId"
          align="left"
          label="交易订单号"
          :width="flexColumnWidth('交易订单号', 'tradeOrderId')"
        />
        <el-table-column
          prop="systemOrderId"
          align="left"
          label="系统订单号"
          :width="flexColumnWidth('系统订单号', 'systemOrderId')"
        />
        <el-table-column
          prop="oldTradeOrderId"
          align="left"
          label="原交易订单号"
          :width="flexColumnWidth('原交易订单号', 'oldTradeOrderId')"
        />
        <el-table-column
          prop="saleChannel"
          align="left"
          label="销售渠道"
          :width="flexColumnWidth('销售渠道', 'saleChannel')"
        />
        <el-table-column
          prop="saleSubCategory"
          align="left"
          label="销售细类"
          :width="flexColumnWidth('销售细类', 'saleSubCategory')"
        />
        <el-table-column
          prop="takeGoodCategory"
          align="left"
          label="提货"
          :width="flexColumnWidth('提货', 'takeGoodCategory')"
        />
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
import { querySaleOrder } from "@/api/saleOrder";

export default {
  name: "User",
  data() {
    return {
      list: null,
      total: null,
      page: 1,
      size: 10,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
      },
      sortable: null,
      upLoading: false,
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
    reset() {
      this.listQuery = {
        page: 1,
        size: 10,
      };
    },

    getMaxLength(arr) {
      return arr.reduce((acc, item) => {
        if (item) {
          const calcLen = this.getTextWidth(item);
          if (acc < calcLen) {
            acc = calcLen;
          }
        }
        return acc;
      }, 0);
    },

    getTextWidth(str) {
      let width = 0;
      const html = document.createElement("span");
      html.innerText = str;
      html.className = "getTextWidth";
      document.querySelector("body").appendChild(html);
      width = document.querySelector(".getTextWidth").offsetWidth;
      document.querySelector(".getTextWidth").remove();
      return width;
    },
    /**
     * el-table-column 自适应列宽
     * @param prop_label: 表名
     * @param table_data: 表格数据
     */
    flexColumnWidth(label, prop) {
      // 1.获取该列的所有数据
      const arr = this.list.map((x) => x[prop]);
      arr.push(label); // 把每列的表头也加进去算
      // 2.计算每列内容最大的宽度 + 表格的内间距（依据实际情况而定）
      return this.getMaxLength(arr) + 20 + "px";
    },

    async getList(page) {
      console.log(this.page);
      console.log(this.size);
      this.listQuery.page = page;
      this.listQuery.size = this.size;
      const { data, total } = await querySaleOrder(this.listQuery);
      this.list = data;
      this.total = total;
      this.listLoading = false;
    },

    handleFileUploadSuccess(res) {
      if (res.data) {
        console.log(res);
        this.$message.success("上传成功");
        this.load();
      } else {
        this.$message.error("上传失败");
      }
      this.upLoading = false;
    },
    handleFileUploadError() {
      this.$message.error("上传失败");
      this.upLoading = false;
    },
    handleSizeChange(pageSize) {
      this.size = pageSize;
      this.getList(1);
    },
    handleCurrentChange(pageNum) {
      this.page = pageNum;
      this.getList(this.page);
    },
    Nindex(index) {
      const page = this.page;
      const size = this.size;
      return index + 1 + (page - 1) * size;
    },
  },
};
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

    span {
      float: left;
      width: 240px;
      text-align: end;
    }

    .end {
      float: right;
    }
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
