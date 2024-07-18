<template>
  <div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column label="城市" width="180">
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <svg-icon icon-class="international" />
            <span style="margin-left: 10px">{{ scope.row.provincial+scope.row.municipal+scope.row.city }}</span>
          </template>
        </el-table-column>
        <el-table-column label="天气" width="180">
          <template slot-scope="scope">
            <i class="el-icon-sunny" v-if="scope.row.conditionDay.indexOf('晴')>0"></i>
            <i class="el-icon-heavy-rain" v-else-if="scope.row.conditionDay.indexOf('雨')>0"></i>
            <i class="el-icon-lightning" v-else-if="scope.row.conditionDay.indexOf('雷')>0"></i>
            <i class="el-icon-cloudy" v-else-if="scope.row.conditionDay.indexOf('云')>0 || scope.row.conditionDay.indexOf('阴')>-1"></i>
            <i class="el-icon-cloudy" v-else-if="scope.row.conditionDay.indexOf('阴')>0"></i>
            <i class="el-icon-sunny" v-else></i>
            
            <span style="margin-left: 10px">{{ scope.row.conditionDay}}</span>
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
        <el-table-column label="关联商铺" width="180">
          <template slot-scope="scope">
            
            <el-tag v-for="item in scope.row.stores">{{ item.storeName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search.name" @input="getList()" size="mini" placeholder="输入搜索的城区" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="search.current" :page-sizes="[10, 20, 30, 100]" :page-size="search.size"
        layout="total, sizes, prev, pager, next, jumper" :total="search.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { addStoreCityRelations, deleteStoreCityRelations, getStoreCityRelationsList, updStoreCityRelations, getAllByCityVoList,getWeatherStoreCityList } from '@/api/sy'
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
      search: {
        // storeID: '',
        name: '',
        current: 0,
        size: 10,
        total:0,
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
      getWeatherStoreCityList(this.search).then((res) => {
        console.log(res);
        this.tableData = res.data.records
        this.search.total=res.data.total
      }).finally(() => {
        // this.initChart()
      })
    },
    ondeleteStoreCityRelations(id) {
      deleteStoreCityRelations(id).then((res) => {

      }).finally(() => {
        this.getList()
      })
    },
    onupdStoreCityRelations() {
      updStoreCityRelations(this.updFrom).then((res) => {


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

<style scoped>
/* 添加样式以适应你的需求 */
</style>
