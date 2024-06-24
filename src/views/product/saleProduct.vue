
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
        预测模型：<el-select
          v-model="listQuery.predictModel"
          placeholder="请输入款式"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
          clearable
          filterable
        >
          <el-option value="平均销售" />
          <el-option value="增长对比" />
          <el-option value="四周平均" />
          <el-option value="货仓周转" />
        </el-select>
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
            v-loading="listLoading"
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
      <div style="clear: both" />
    </div>
    <div class="filter-container2">
      <div class="search-item">
        <span>
          YTD售罄率：
          <el-input-number
            v-model="listQuery.saleYtdSaleOutRateLowerBound"
            placeholder="下限(%)"
            style="width: 150px; margin: 5px 8px 5px 0"
            class="filter-item"
            size="small"
          />
        </span>
        <span
          >~
          <el-input-number
            v-model="listQuery.saleYtdSaleOutRateUpperBound"
            placeholder="上限(%)"
            style="width: 150px; margin: 5px 8px 5px 0"
            class="filter-item"
            size="small"
          />
        </span>
      </div>
      <div class="search-item">
        <span>
          首单售罄率：
          <el-input-number
            v-model="listQuery.firstOrderSaleOutRateLowerBound"
            placeholder="下限(%)"
            style="width: 150px; margin: 5px 8px 5px 0"
            class="filter-item"
          />
        </span>
        <span
          >~
          <el-input-number
            v-model="listQuery.firstOrderSaleOutRateUpperBound"
            placeholder="上限(%)"
            style="width: 150px; margin: 5px 8px 5px 0"
            class="filter-item"
          />
        </span>
      </div>
      <div class="search-item">
        <span>
          预估售罄率：
          <el-input-number
            v-model="listQuery.predictSaleOutRateLowerBound"
            placeholder="下限(%)"
            style="width: 150px; margin: 5px 8px 5px 0"
            class="filter-item"
          />
        </span>
        <span
          >~
          <el-input
            v-model="listQuery.predictSaleOutRateUpperBound"
            placeholder="上限(%)"
            style="width: 150px; margin: 5px 8px 5px 0"
            class="filter-item"
          />
        </span>
      </div>
      <div style="clear: both" />
    </div>
    <div class="table-list">
      <div style="height: 2.2rem; line-height: 2.2rem; padding: 0 0.1rem">
        <span style="float: left">商品列表</span>
        <span style="float: right">
          <span>
            <el-button
              type="primary"
              class="ml-5"
              size="mini"
              style="background-color: #244496; margin-right: 2px"
              :loading="allLoad"
              @click="refreshAllSkuData"
              >全部刷新</el-button
            >
          </span>
          <span>
            <el-button
              type="primary"
              class="ml-5"
              size="mini"
              style="background-color: #244496; margin-right: 2px"
              @click="exportSkuProductExcel"
              >导出</el-button
            >
          </span>
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

      <el-dialog
        :visible.sync="editDialogVisible"
        title="编辑库存"
        width="500px"
      >
        <el-form
          ref="dataForm"
          :model="modForm"
          label-position="left"
          label-width="70px"
          style="width: 300px; margin-left: 50px"
        >
          <el-form-item label="skuId">
            <el-input v-model="modForm.skuId" style="width: 300px" disabled />
          </el-form-item>
          <el-form-item label="预测系数">
            <el-input v-model="modForm.predictCoe" style="width: 300px" />
          </el-form-item>
          <el-form-item label="下线日期">
            <el-date-picker
              v-model="modForm.endDate"
              style="width: 300px"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="editPredictCoe"> 确定 </el-button>
        </div>
      </el-dialog>
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
          width="300"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{ row }">
            <el-button
              size="mini"
              style="color: #244496; border: none"
              icon="iconfont icon-a-zu1221"
              @click="goSalePanel(row)"
            >
              预览
            </el-button>
            <el-button
              size="mini"
              icon="iconfont icon-shuaxin"
              style="color: #244496; border: none"
              @click="refreshSkuRelatedData(row.skuId)"
            >
              刷新
            </el-button>
            <el-button
              size="mini"
              icon="iconfont icon-a-zu1221"
              style="color: #244496; border: none"
              @click="openRelevance(row.metricValueList)"
            >
              指标
            </el-button>
            <el-button
              size="mini"
              icon="iconfont icon-shuaxin"
              style="color: #244496; border: none"
              @click="popModForm(row)"
            >
              编辑
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
                  v-for="metric in metricValueList"
                  :key="metric.metricName"
                  class="border-set"
                >
                  <div style="width: 24%; float: left">
                    {{ metric.metricName }}
                  </div>
                  <div style="width: 26%; float: left">
                    {{ metric.metricValue }}
                  </div>
                </div>
              </div>
            </el-dialog>
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
        <el-table-column label="预测">
          <el-table-column
            prop="predictModel"
            align="left"
            label="预测模型"
            :width="flexColumnWidth('预测模型', 'predictModel')"
          />
          <el-table-column
            prop="endDate"
            align="left"
            label="下线日期"
            :width="flexColumnWidth('下线日期', 'endDate')"
          />
          <el-table-column
            prop="predictCoe"
            align="left"
            label="预测系数"
            :width="flexColumnWidth('预测系数', 'predictCoe')"
          />
        </el-table-column>
        <el-table-column label="关联指标" width="90">
          <el-table-column
            prop="ytdSaleOutRate"
            align="left"
            label="ytd售罄率"
            :width="flexColumnWidth('预估售罄率', 'ytdSaleOutRate')"
          >
            <template slot-scope="{ row }">
              {{ new Number(row.ytdSaleOutRate * 100).toFixed(1) }}%
            </template>
          </el-table-column>
          <el-table-column
            prop="firstOrderSaleOutRate"
            align="left"
            label="首单售罄率"
            :width="flexColumnWidth('预估售罄率', 'firstOrderSaleOutRate')"
          >
            <template slot-scope="{ row }">
              {{ new Number(row.firstOrderSaleOutRate * 100).toFixed(1) }}%
            </template>
          </el-table-column>
          <el-table-column
            prop="predictSaleOutRate"
            align="left"
            label="预估售罄率"
            :width="flexColumnWidth('预估售罄率', 'predictSaleOutRate')"
          >
            <template slot-scope="{ row }">
              {{ new Number(row.predictSaleOutRate * 100).toFixed(1) }}%
            </template>
          </el-table-column>
          <el-table-column
            prop="saleYtd"
            align="left"
            label="销售ytd"
            :width="flexColumnWidth('销售ytd', 'saleYtd')"
          />
          <el-table-column
            prop="storage"
            align="left"
            label="库存"
            :width="flexColumnWidth('库存', 'storage')"
          />
          <el-table-column
            prop="predictRestSale"
            align="left"
            label="预估剩余销售"
            :width="flexColumnWidth('预估剩余销售', 'predictRestSale')"
          />
          <el-table-column
            prop="predictFinalSale"
            align="left"
            label="预估最终销售"
            :width="flexColumnWidth('预估最终销售', 'predictFinalSale')"
          />
          <el-table-column
            prop="firstBuyOrder"
            align="left"
            label="首单采购量"
            :width="flexColumnWidth('首单采购量', 'firstBuyOrder')"
          />
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
import {
  exportSkuProduct,
  querySkuProduct,
  refreshAllRelatedData,
  refreshRelatedData,
} from "@/api/skuProduct";
import request from "@/utils/request";

export default {
  name: "User",
  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      size: 10,
      listLoading: true,
      allLoad: false,
      listQuery: {
        page: 1,
        size: 10,
      },
      sortable: null,
      upLoading: false,
      relevanceShow: false,
      metricValueList: [],
      editDialogVisible: false,
      modForm: {},
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
    refreshRelatedData,
    exportSkuProductExcel() {
      console.log(this.listQuery);
      exportSkuProduct(this.listQuery);
    },
    openRelevance(data) {
      this.relevanceShow = true;
      this.metricValueList = data;
    },

    popModForm(row) {
      console.log(row);
      this.modForm.id = row.id;
      this.modForm.skuId = row.skuId;
      this.editDialogVisible = true;
    },

    editPredictCoe() {
      request({
        url: "/skuProduct/modify",
        method: "post",
        data: this.modForm,
      })
        .then((res) => {
          if (res.data) {
            this.$message.success("编辑成功");
            this.modForm = {};
            this.getList(this.page);
            this.editDialogVisible = false;
          } else {
            this.$message.error("编辑失败");
          }
        })
        .catch((res) => {
          this.$message.error("编辑失败");
        });
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

    refreshSkuRelatedData(skuId) {
      this.listLoading = true;
      refreshRelatedData(skuId)
        .then((res) => {
          if (res.data) {
            this.$message.success("刷新成功");
            this.getList(this.page);
          }
          this.listLoading = false;
        })
        .catch((res) => {
          this.$message.error("刷新失败");
          this.listLoading = false;
        });
    },

    refreshAllSkuData() {
      this.allLoad = true;
      refreshAllRelatedData()
        .then((res) => {
          if (res.data) {
            this.$message.success("刷新成功");
            this.allLoad = false;
          }
          this.listLoading = false;
        })
        .catch((res) => {
          this.$message.error("刷新失败");
          this.allLoad = false;
        });
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
      const { data, total } = await querySkuProduct(this.listQuery).catch(
        (res) => {
          this.listLoading = false;
        }
      );
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

    span {
      float: left;
      width: 240px;
      text-align: end;
    }

    .end {
      float: right;
    }
  }

  .filter-container2 {
    background-color: #ffffff;
    padding: 10px;
    margin-bottom: 10px;

    .search-item {
      width: 450px;
      float: left;
      span {
        float: left;
        text-align: end;
      }

      .end {
        float: right;
      }
    }
  }

  .table-list {
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
