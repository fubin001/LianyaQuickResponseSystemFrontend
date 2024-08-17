<template>

  <div class="app-container">
    <el-button @click="apiSaleOrder">apiVRetailTest</el-button>
  </div>
</template>

<script>
import { getAllCityDataVoList, getCityDataWeather, addCityData, updWeatherCityData, getAllByCityVoList,apiSaleOrder } from '@/api/sy'
import{apiVRetailTest} from '@/api/saleOrder'
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
    apiSaleOrder,
    apiVRetailTest,
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
