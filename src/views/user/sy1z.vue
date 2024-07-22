<template>
  <div>
    <template>
      switch parent border: <el-switch v-model="parentBorder" /> switch child
      border: <el-switch v-model="childBorder" />
      <el-table :data="tableData" :border="parentBorder" style="width: 100%" @expand-change="onexpandChange">
        <el-table-column type="expand" >
          <template #default="props">
            <div m="4">
              <p m="t-0 b-2">State: {{ props.row.state }}</p>
              <p m="t-0 b-2">City: {{ props.row.city }}</p>
              <p m="t-0 b-2">Address: {{ props.row.address }}</p>
              <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
              <h3>Family</h3>
              <el-table :data="props.row.family" :border="childBorder">
                <el-table-column label="Name" prop="name" />
                <el-table-column label="State" prop="state" />
                <el-table-column label="City" prop="city" />
                <el-table-column label="Address" prop="address" />
                <el-table-column label="Zip" prop="zip" />
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Date" prop="date" />
        <el-table-column label="Name" prop="name" />
      </el-table>
    </template>
  </div>
</template>

<script>
import { addStoreCityRelations, deleteStoreCityRelations, getStoreCityRelationsList, updStoreCityRelations, getAllByCityVoList, getWeatherStoreCityList } from '@/api/sy'


export default {
  name: 'sy1',
  props:{
    pr:null,
  },
  data() {
    return {
      parentBorder: (false),
      childBorder: (false),
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
          family: [
            {
              name: 'Jerry',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
            {
              name: 'Spike',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
            {
              name: 'Tyke',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
          ],
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
          family: [
            {
              name: 'Jerry',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
            {
              name: 'Spike',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
            {
              name: 'Tyke',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
          ],
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
          family: [
            {
              name: 'Jerry',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
            {
              name: 'Spike',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
            {
              name: 'Tyke',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
          ],
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
          family: [
            {
              name: 'Jerry',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
            {
              name: 'Spike',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
            {
              name: 'Tyke',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
          ],
        },
        {
          date: '2016-05-08',
          name: 'Tom',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
          family: [
            {
              name: 'Jerry',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
            {
              name: 'Spike',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
            {
              name: 'Tyke',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
          ],
        },
        {
          date: '2016-05-06',
          name: 'Tom',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
          family: [
            {
              name: 'Jerry',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
            {
              name: 'Spike',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
            {
              name: 'Tyke',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
          ],
        },
        {
          date: '2016-05-07',
          name: 'Tom',
          state: 'California',
          city: 'San Francisco',
          address: '3650 21st St, San Francisco',
          zip: 'CA 94114',
          family: [
            {
              name: 'Jerry',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
            {
              name: 'Spike',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
            {
              name: 'Tyke',
              state: 'California',
              city: 'San Francisco',
              address: '3650 21st St, San Francisco',
              zip: 'CA 94114',
            },
          ],
        },
      ],
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
      // tableData: [],
    };
  },


  async created() {
    console.log(this.pr);
    // await this.getList();
    // await this.ongetAllByCityVoList();
  },
  mounted() {
    // this.initChart();
  },
  methods: {
    onexpandChange(row,expanded){
      console.log(row);
      console.log(expanded);
    },
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
        this.search.total = res.data.total
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
