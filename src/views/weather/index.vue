<template>
  <div class="app-container">
    <div class="filter-container">
      <span>
        地区名称：
        <el-input v-model="search.name" placeholder="请输入地区名称" style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item" />
        <!-- <el-input v-model="search.name">

        </el-input> -->
        <!-- <el-select
          v-model="listQuery.skuId"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
          clearable
          allow-create
          filterable
        >
          <el-option v-for="item in skuIdEnumList" :key="item.name" :label="item.name" :value="item.value" />
        </el-select> -->
      </span>
      <span style="float: right">

        <el-button class="filter-item" type="primary" icon="el-icon-search"
          style="margin: 3px 5px; background-color: #244496" @click="getList">
          搜索
        </el-button>
        <el-button @click="onupdStoreCity()" class="filter-item" type="primary" icon="el-icon-search"
          style="margin: 3px 5px; background-color: #244496">更新所有商铺天气</el-button>
      </span>
    </div>

    <div class="table-list">
      <!-- <div style="height: 2rem; line-height: 2rem; padding: 0 0.3rem;">
        <span style="float: left;">颜色数据</span>
        <span style="float: right;">
          <span style="text-align: right">
            <el-upload action="/api/materialOrder/importExcel" style="display: inline-block" :show-file-list="false"
              :on-success="handleFileUploadSuccess" :on-error="handleFileUploadError">
              <el-button type="primary" class="ml-5" style="background-color: #244496" size="mini" :loading="upLoading"
                @click="upLoading = true">上传<i class="el-icon-top" /></el-button>
            </el-upload>
          </span>
        </span>
      </div> -->
      <el-table :data="tableData" style="width: 100%" v-loading="listLoading" row-key="id"
        :header-cell-style="{ background: '#e4e7f0' }" fit highlight-current-row>
        <el-table-column label="城市" width="200">
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <svg-icon icon-class="international" />
            <span style="margin-left: 10px">{{ scope.row.provincial + scope.row.municipal + scope.row.city }}</span>
          </template>
        </el-table-column>
        <el-table-column label="天气" width="150">
          <template slot-scope="scope">
            <i class="el-icon-sunny" v-if="scope.row.conditionDay.indexOf('晴') > 0"></i>
            <i class="el-icon-heavy-rain" v-else-if="scope.row.conditionDay.indexOf('雨') > 0"></i>
            <i class="el-icon-lightning" v-else-if="scope.row.conditionDay.indexOf('雷') > 0"></i>
            <i class="el-icon-cloudy"
              v-else-if="scope.row.conditionDay.indexOf('云') > 0 || scope.row.conditionDay.indexOf('阴') > -1"></i>
            <i class="el-icon-cloudy" v-else-if="scope.row.conditionDay.indexOf('阴') > 0"></i>
            <i class="el-icon-sunny" v-else></i>

            <span style="margin-left: 10px">{{ scope.row.conditionDay }}</span>
          </template>
        </el-table-column>
        <el-table-column label="温度" width="180">
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <span style="margin-left: 10px">{{ scope.row.tempNight }}</span>
            <span>℃</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.predictDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联商铺">
          <template slot-scope="scope">

            <el-tag v-for="item in scope.row.stores">{{ item.storeName }}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
          操作
          <template slot="header" slot-scope="scope">
            <el-input v-model="search.name" @input="getList()" size="mini" placeholder="输入搜索的城区" />
          </template>
        </el-table-column> -->
      </el-table>


      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="search.current" :page-sizes="[10, 20, 30, 100]" :page-size="search.size"
        layout="total, sizes, prev, pager, next, jumper" :total="search.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { addStoreCityRelations, deleteStoreCityRelations, updStoreCity, getWeatherStoreCityList } from '@/api/sy'
export default {
  name: '城市天气',
  data() {
    return {
      fromData: {
        storeID: null,
        storeName: '',
        cityID: null,
        detailedAddress: '',
      },
      listLoading: false,
      search: {
        // storeID: '',
        name: '',
        current: 0,
        size: 10,
        total: 0,
      },
      rules: {
        storeName: [
          { required: true, message: '商铺名称', trigger: 'blur' },
        ],
        cityID: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },

      updFrom: {
        storeID: 2,
        storeName: '测试',
        cityID: '2',
        detailedAddress: '一只蛆ei',
      },
      optionsCityt: [],
      chart: null,
      tableData: [],
    };
  },


  async created() {
    await this.getList();
    // await this.ongetAllByCityVoList();
  },
  mounted() {
    // this.initChart();
  },
  methods: {
    onaddStoreCityRelations() {
      addStoreCityRelations(this.fromData).then((res) => {
      }).finally(() => {
        this.getList()
      })
    },
    getList() {
      this.listLoading = true
      getWeatherStoreCityList(this.search).then((res) => {
        console.log(res);
        this.tableData = res.data.records
        this.search.total = res.data.total
      }).finally(() => {
        // this.initChart()
        this.listLoading = false
      })
    },
    ondeleteStoreCityRelations(id) {
      deleteStoreCityRelations(id).then((res) => {

      }).finally(() => {
        this.getList()
      })
    },
    onupdStoreCity() {
      updStoreCity().then((res) => {
        if (res.code == 0) {
          this.$message({
            message: '成功',
            type: 'success'
          });
        } else {

        }
      }).finally(() => {
        this.getList()
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onaddStoreCityRelations()
          // alert('submit!');
          console.log(this.fromData);
          console.log(this.fromData.cityID);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.search.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.search.current = val
      this.getList()
    },
  },
  // watch: {
  //   search(newValue, preValue) {
  //     this.getList()
  //   },
  // },
  beforeDestroy() {

  }
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

