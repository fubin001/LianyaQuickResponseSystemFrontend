
<template>
  <div class="app-container">
    <div class="filter-container">
      <span>
        品牌名称：<el-input
          v-model="listQuery.brand"
          placeholder="请输入品牌名称"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        />
      </span>
      <span>
        款式：<el-input
          v-model="listQuery.styleId"
          placeholder="请输入款式"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        />
      </span>
      <span>
        名称：<el-input
          v-model="listQuery.fullName"
          placeholder="请输入名称"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        />
      </span>
      <span>
        skuId：<el-input
          v-model="listQuery.skuId"
          placeholder="请输入skuId"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        />
      </span>
      <span>
        上市日期：<el-date-picker
          v-model="listQuery.listingMonth"
          type="month"
          placeholder="上市日期"
          class="filter-item"
          style="width: 150px; margin: 5px 8px 5px 0"
          value-format="yyyy-MM-01"
        />
      </span>
      <span>
        季节：<el-input
          v-model="listQuery.season"
          placeholder="季节"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        />
      </span>
      <span>
        面料编码：<el-input
          v-model="listQuery.fabricCode"
          placeholder="面料编码"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
        />
      </span>
      <span>
        面料组成：<el-input
        v-model="listQuery.fabricComposition"
        placeholder="面料组成"
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
      <div style="clear:both"></div>
    </div>

    <div class="product-list">
      <div style="height: 2.2rem; line-height: 2.2rem; padding: 0 0.1rem;">
          <span style="float: left;">商品列表</span>
          <span style="float: right;">
            <span>
              <el-upload
                action="/api/skuProduct/importExcel"
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
          </span>
      </div>
      <el-table
        ref="dragTable"
        v-loading="listLoading"
        :data="list"
        row-key="id"
        :header-cell-style="{ background: '#e4e7f0' }"
        fit
        highlight-current-row
        style="width: 100%"
      >
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
              @click="goSalePanel(row)"
              style="background-color: #244496; border: none"
            >
              预览
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="序号"
          width="50"
          type="index"
          :index="Nindex"
        />
        <el-table-column label="基础属性">
          <el-table-column
            prop="brand"
            label="品牌"
            :width="flexColumnWidth('品牌', 'brand')"
          />
          <el-table-column
            prop="styleId"
            align="left"
            label="款式"
            :width="flexColumnWidth('款式', 'styleId')"
          />
          <el-table-column
            prop="skuId"
            align="left"
            label="货号"
            :width="flexColumnWidth('货号', 'skuId')"
          />
          <el-table-column
            prop="color"
            align="left"
            label="颜色"
            :width="flexColumnWidth('颜色', 'color')"
          />
          <el-table-column
            prop="fullName"
            align="left"
            label="名称"
            :width="flexColumnWidth('名称', 'fullName')"
          />
          <el-table-column
            prop="listingDate"
            align="left"
            label="上市日期"
            :width="flexColumnWidth('上市日期', 'listingDate')"
          />
          <el-table-column
            prop="season"
            align="left"
            label="季节"
            :width="flexColumnWidth('季节', 'season')"
          />
          <el-table-column
            prop="subCategory"
            align="left"
            label="商品子类"
            :width="flexColumnWidth('商品子类', 'subCategory')"
          />
          <el-table-column
            prop="fabricCode"
            align="left"
            label="面料编码"
            :width="flexColumnWidth('面料编码', 'fabricCode')"
          />
          <el-table-column
            prop="fabricComposition"
            align="left"
            label="面料成分"
            :width="flexColumnWidth('面料成分', 'fabricComposition')"
          />
        </el-table-column>
        <el-table-column label="关联指标" width="90">
          <template slot-scope="{ row }">
            <el-button
              type="success"
              size="mini"
              @click="openRelevance(row.metricValueList)"
              style="background-color: #244496; border: none"
            >
              查看
            </el-button>
            <!-- <div v-for="metric in row.metricValueList" :key="metric.metricName">
              <div class="metric-name">{{ metric.metricName }}</div>
              :
              <div style="float: right" class="metric-value">
                {{ metric.metricValue }}
              </div>
            </div> -->
            <el-dialog
              title="关联指标"
              :visible.sync="relevanceShow"
              width="40%"
              :before-close="handleClose"
            >
              <div style="height: 200px">
                <div
                  class="border-set"
                  v-for="metric in metricValueList"
                  :key="metric.metricName"
                >
                  <div style="width: 28%; float: left">
                    {{ metric.metricName }}
                  </div>
                  <div style="width: 22%; float: left">
                    {{ metric.metricValue }}
                  </div>
                </div>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="{ row }">
            <el-table :data="[row]">
              <el-table-column prop="supplier" align="left" label="供货商" />
              <el-table-column
                prop="standardPrice"
                align="left"
                label="标准价"
              />
              <el-table-column prop="year" align="left" label="年" />
              <el-table-column prop="season" align="left" label="季" />
              <el-table-column prop="gender" align="left" label="性别" />
              <el-table-column prop="enName" align="left" label="英文名" />
              <el-table-column prop="gbCode" align="left" label="国标码" />
              <el-table-column prop="boxId" align="left" label="箱号" />
              <el-table-column
                prop="fabric_code"
                align="left"
                label="面料编码"
              />
              <el-table-column
                prop="fabric_composition"
                align="left"
                label="面料组成"
              />
              <el-table-column
                prop="auxiliary_material_code"
                align="left"
                label="面料编码"
              />
              <el-table-column
                prop="auxiliary_material_composition"
                align="left"
                label="面料组成"
              />
              <el-table-column prop="category" align="left" label="类别" />
              <el-table-column
                prop="productCategory"
                align="left"
                label="商品类别"
              />
              <el-table-column prop="productLine" align="left" label="产品线" />
              <el-table-column prop="series" align="left" label="系列" />
              <el-table-column
                prop="productType"
                align="left"
                label="商品类别"
              />
              <el-table-column
                prop="subCategory"
                align="left"
                label="商品子类"
              />
              <el-table-column
                prop="thirdCategory"
                align="left"
                label="三次类目"
              />
              <el-table-column prop="producer" align="left" label="产地" />
              <el-table-column
                prop="businessCategory"
                align="left"
                label="产地"
              />
              <el-table-column
                prop="collection"
                align="left"
                label="collection"
              />
              <el-table-column prop="gender" align="left" label="性别" />
              <el-table-column prop="unit" align="left" label="单位" />
            </el-table>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { querySkuProduct } from "@/api/skuProduct";

export default {
  name: "User",
  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      size: 10,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
      },
      sortable: null,
      upLoading: false,
      relevanceShow: false,
      metricValueList: [],
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
    openRelevance(data) {
      this.relevanceShow = true;
      this.metricValueList = data;
    },
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
      const { data, total } = await querySkuProduct(this.listQuery);
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
    goSalePanel(row) {
      this.$router.push({
        path: "/product/saleProductPanel",
        query: {
          salePlanId: row.skuId,
        },
      });
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

    span{
      float: left;
      width: 240px;
      text-align: end;
    }

    .end{
      float: right;
    }
  }

  .product-list {
    background-color: #ffffff;
    padding: 10px;
  }
}
.border-set {
  div {
    border: 1px solid #d5d5d5;
    // border-left-style: none;
    // border-top-style: none;
    padding: 0.2rem;
  }

  div:nth-child(1) {
    color: #cccccc;
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
.metric-name {
  width: 150px;
  font-weight: bold; /* 设置字体*/
  float: left;
}

.metric-value {
  color: red; /* 设置字体颜色为红色 */
  font-weight: bold; /* 设置字体*/
  float: left;
}
</style>
