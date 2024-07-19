<template>
  <div>
    <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"></el-form> -->
    <el-form :model="fromData" :rules="rules" ref="fromData" :inline="true" label-width="80px">
      <el-form-item label="商铺名称" prop="storeName">
        <el-input v-model="fromData.storeName"></el-input>
      </el-form-item>
      <el-form-item label="地区" prop="cityID">
        <el-cascader placeholder="试试搜索：安徽" v-model="fromData.cityID" :options="optionsCityt" filterable clearable
          :props="{ emitPath: false }"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="detailedAddress">
        <el-input v-model="fromData.detailedAddress" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm('fromData')">立即创建</el-button>
      <el-button @click="resetForm('fromData')">重置</el-button>
    </el-form>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="商户" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.storeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商户地址" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p></p>
              <p>地区: {{ scope.row.cityID }}</p>
              <!-- <p>详细地址: {{ scope.row.detailedAddress }}</p> -->
              <div slot="reference" class="name-wrapper">
                <el-tag>{{ scope.row.provincial + '—' + scope.row.municipal + '—' + scope.row.city }}</el-tag>
                <el-tag size="medium">{{ scope.row.detailedAddress }}</el-tag>

              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search.name" @input="getList()" size="mini" style="width: 250px;"
              placeholder="搜索：输入商户名称" />
            <el-button @click="onupdStoreCity()" size="mini">更新所有商铺天气</el-button>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="ondeleteStoreCityRelations(scope.row.storeID)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="search.current" :page-sizes="[10, 20, 30, 100]" :page-size="search.size"
        layout="total, sizes, prev, pager, next, jumper" :total="search.total">
      </el-pagination>
    </div>

    <el-dialog title="修改" :visible.sync="dialogVisible" width="30%">
      <el-form :model="updFrom" :rules="rules" ref="updFrom" :inline="true" label-width="80px">
        <el-form-item label="商铺名称" prop="storeName">
          <el-input v-model="updFrom.storeName"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="cityID">
          <el-cascader placeholder="试试搜索：安徽" v-model="updFrom.cityID" :options="optionsCityt" filterable clearable
            :props="{ emitPath: false }"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailedAddress">
          <el-input v-model="updFrom.detailedAddress"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm('updFrom')">保存</el-button>
        <el-button @click="resetForm('updFrom')">重置</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addStoreCityRelations, deleteStoreCityRelations, getStoreCityRelationsList, updStoreCityRelations, getAllByCityVoList, updStoreCity } from '@/api/sy'
export default {
  name: '商铺',
  data() {
    return {
      fromData: {
        storeID: null,
        storeName: '',
        cityID: null,
        detailedAddress: '',
      },
      search: {
        storeID: '',
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
      dialogVisible: false,
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
    await this.ongetAllByCityVoList()
  },
  mounted() {
    // this.initChart();
  },
  methods: {
    onaddStoreCityRelations() {
      addStoreCityRelations(this.fromData).then((res) => {
        if (res.code == 0) {
          this.resetForm("fromData")
          this.$message({
            message: '成功',
            type: 'success'
          });
        }
      }).finally(() => {
        this.getList()
      })
    },
    getList() {
      getStoreCityRelationsList(this.search).then((res) => {
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
        if (res.code == 0) {
          this.resetForm("fromData")
          this.$message({
            message: '成功',
            type: 'success'
          });
        }
      }).finally(() => {
        this.getList()
      })
    },
    //获取城市数据
    ongetAllByCityVoList() {
      getAllByCityVoList().then((res) => {
        this.optionsCityt = res.data
      }).finally(() => {
        // this.fromData.cityID = 1547
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName == "fromData") {
            this.onaddStoreCityRelations()
          } else if (formName == "updFrom") {
            this.onupdStoreCityRelations()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //更新所有商铺天气
    onupdStoreCity() {
      updStoreCity()
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
    handleEdit(row) {
      this.updFrom = row
      this.dialogVisible = true;
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
