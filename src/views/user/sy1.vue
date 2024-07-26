<template>

  <div class="app-container">

    <div class="filter-container">
      <span>
        地区：
        <el-cascader placeholder="试试搜索：安徽" v-model="search.id" :options="optionsCitytData" filterable clearable
          :props="{ emitPath: false }"></el-cascader>
      </span>

      <span>
        时间范围：
        <el-date-picker v-model="search.pickerDate" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <!-- {{ value1 }} -->
      </span>
      <span style="float: right">

        <el-button class="filter-item" type="primary" icon="el-icon-search"
          style="margin: 3px 5px; background-color: #244496" @click="getList">
          搜索
        </el-button>
        <el-button @click="onupdWeatherCityData()" class="filter-item" type="primary" icon="el-icon-search"
          style="margin: 3px 5px; background-color: #244496">更新天气</el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-search"
          style="margin: 3px 5px; background-color: #244496" @click="addDialogVisible = true">
          新增
        </el-button>
      </span>
    </div>
    <div class="table-list">
      <el-table :data="tableData" border v-loading="listLoading" style="width: 100%" row-key="id"
        :header-cell-style="{ background: '#e4e7f0' }" fit highlight-current-row>
        <!-- 静态表头 -->
        <el-table-column prop="cityId" label="City ID"></el-table-column>
        <el-table-column prop="country" label="地区" width="200">
          <template slot-scope="scope">

            <svg-icon icon-class="international" />
            <el-tag>{{ scope.row.provincial + ' ' + scope.row.municipal + ' ' + scope.row.city }}</el-tag>
            <!-- <span style="margin-left: 10px">{{ scope.row.provincial + ' ' + scope.row.municipal + ' ' + scope.row.city }}</span> -->
          </template>
        </el-table-column>

        <!-- 动态表头 -->
        <el-table-column v-for="(item, index) in dataLists" :key="index" :label="item.title" :prop="item.key"
          width="200">
          <template slot-scope="scope">

            <!-- {{ scope.row[item.title] }} -->
            <div slot="reference" class="name-wrapper" v-if="scope.row[item.title]">
              天气：<el-tag>{{ scope.row[item.title].conditionDay }}</el-tag>
              <i class="el-icon-d-arrow-right"></i>
              <el-tag>{{ scope.row[item.title].conditionNight }}</el-tag>
              <br>
              温度：<el-tag>{{ scope.row[item.title].tempNight }}℃</el-tag>
              <i class="el-icon-d-arrow-right"></i> <el-tag>
                {{ scope.row[item.title].tempDay }}℃</el-tag>
              <br>
              湿度：<el-tag>{{ scope.row[item.title].humidity }}</el-tag>
            </div>
            <!-- <span style="margin-left: 10px">{{ scope.row.provincial + ' ' + scope.row.municipal + ' ' + scope.row.city }}</span> -->
          </template>
        </el-table-column>
        
        <el-table-column label="操作" fixed="right" width="150">
          <template slot="header" slot-scope="scope">
            操作
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="primary" >查看视图</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="search.current" :page-sizes="[10, 20, 30, 100]" :page-size="search.size"
        layout="total, sizes, prev, pager, next, jumper" :total="search.total">
      </el-pagination>
    </div>
    <el-dialog title="新增" :visible.sync="addDialogVisible" width="30%">
      <el-form :model="fromData" :rules="rules" ref="fromData" :inline="true" label-width="80px">
        <el-form-item label="地区" prop="cityId">
          <el-cascader placeholder="试试搜索：安徽" v-model="fromData.cityId" :options="optionsCityt" filterable clearable
            :props="{ emitPath: false }"></el-cascader>
        </el-form-item>
        <br>
        <el-button type="primary" @click="submitForm('fromData')">立即创建</el-button>
        <el-button @click="resetForm('fromData')">重置</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAllCityDataVoList, getCityDataWeather, addCityData, updWeatherCityData, getAllByCityVoList } from '@/api/sy'
export default {
  data() {
    return {
      listLoading: true,
      // 原始数据
      data: [],
      // 表头数据
      dataLists: [
        { title: 'Population', key: 'population' },
        { title: 'Area', key: 'area' },
      ],
      // 表格数据
      tableData: [],
      fromData: {
        cityId: null,
      },
      rules: {
        cityId: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },

      search: {
        id: '',
        name: '',
        startDate: '',
        endDate: '',
        pickerDate: null,
        current: 0,
        size: 10,
        total: 0,
      },
      addDialogVisible: false,
      optionsCityt: [],
      optionsCitytData: [],
      getListData: {},
    };
  },

  async created() {
    // await this.getList();
    // await this.ongetAllByCityVoList();
    await this.getList();
    await this.ongetAllCityDataVoList();
    await this.ongetAllByCityVoList();
  },
  methods: {
    async getList() {
      this.listLoading = true
      getCityDataWeather(this.search).then((res) => {
        this.tableData = []
        this.dataLists = []
        this.data = res.data.data
        this.search.total = res.data.total
        this.data.forEach((item, index) => {
          var itemData = {}
          itemData["cityId"] = item.cityId
          itemData["city"] = item.city
          itemData["municipal"] = item.municipal
          itemData["provincial"] = item.provincial
          item.dataLists.forEach(items => {
            itemData[items.predictDate] = {
              conditionDay: items.conditionDay,
              conditionNight: items.conditionNight,
              humidity: items.humidity,
              predictDate: items.predictDate,
              tempDay: items.tempDay,
              tempNight: items.tempNight,
            }

            //动态时间表头，因此只需要一次
            if (index == 0) {
              var dataLists = {
                title: items.predictDate,
                key: items.predictDate
              }

              this.dataLists.push(dataLists)
            }
          })
          this.tableData.push(itemData)
        });
        console.log(this.tableData);
      }).finally(() => {
        this.listLoading = false
        // this.getList()
      })
    },

    //获取正在使用的城市数据
    ongetAllCityDataVoList() {
      getAllCityDataVoList().then((res) => {
        this.optionsCitytData = res.data
      }).finally(() => {
        // this.fromData.cityID = 1547
      })
    },

    //获取墨迹城市数据
    ongetAllByCityVoList() {
      getAllByCityVoList().then((res) => {
        this.optionsCityt = res.data
      }).finally(() => {
      })
    },
    onaddCityData() {
      addCityData(this.fromData).then((res) => {
        if (res.code == 0) {
          this.resetForm("fromData")
          this.$message({
            message: '成功',
            type: 'success'
          });
        }
      }).finally(() => {
        // this.getList()
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onaddCityData()
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
    onupdWeatherCityData() {
      updWeatherCityData().then((res) => {
        if (res.code == 0) {
          this.$message({
            message: '成功',
            type: 'success'
          });
        } else {

        }
      }).finally(() => {
        // this.getList()
      })
    },
  },
  watch: {
    'search.pickerDate'(newVal, oldVal) {
      if (newVal) {
        const dateArray = newVal.map(dateTime => {
          const date = new Date(dateTime);
          return date.toISOString().split('T')[0];
        });
        this.search.startDate = dateArray[0]
        this.search.endDate = dateArray[1]
        // console.log(dateArray);
      }
    },
    // search: {
    //   handler(newVal, oldVal) {
    //     // console.log(newVal.pickerDate.length);
    //     if (newVal.pickerDate) {
    //       const dateArray = newVal.pickerDate.map(dateTime => {
    //         const date = new Date(dateTime);
    //         return date.toISOString().split('T')[0];
    //       });
    //       console.log(dateArray);
    //     }
    //   },
    //   deep: true // 深度监听
    // }
  }
};
</script>
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
