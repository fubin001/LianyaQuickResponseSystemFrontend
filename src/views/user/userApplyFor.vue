<template>
  <div>
    <template>
    <el-input v-model="search.userNo" placeholder="请输入查询工号" @input="
      on_getUserApplyOfrList()"></el-input>
      <el-table :data="userApplyOfrList" style="width: 100%">
        <el-table-column label="申请账号" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.userNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请用户名" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请角色" width="700">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.roleList" :key="item.name" closable :type="item.name"
              @close="handleClose(scope.row.id, item.id)">
              {{ item.name }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="on_delUserApplyFor(scope.row.id)">删除</el-button>
            <el-button size="mini" @click="on_newUserBecome(scope.row)">通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="search.current"
      :page-sizes="[10, 20, 30, 100]"
      :page-size="search.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="search.total">
    </el-pagination>
  </div>
</template>

<script>
import { updUserApplyFor, getUserApplyOfrList, newUserBecome, delUserApplyForRole, delUserApplyFor } from "@/api/user";

export default {
  name: "用户申请",
  data() {
    return {
      formData: {},
      userApplyOfrList: [],
      search: {
        userName: '',
        userNo: '',
        current: 0,
        size: 10,
        total:0,
      }, sy: {
        uid: 1,
        size: 1,
        current: 10,
      },
      dataList: [],
      dojon: "",
      updUser: {
        id: 10018,
        userNo: '',
        userName: '',
        password: '',
        userType: 2,
        roleList: [1, 2],
      },
    };
  },
  created() {
    this.on_getUserApplyOfrList();
    // this.on_updUserApplyFor();
  },
  methods: {
    //获取申请用户
    on_getUserApplyOfrList() {
      getUserApplyOfrList(this.search).then((res) => {
        this.userApplyOfrList = res.data.records
        console.log("199", res.data.list);
      })
    },
    //通过申请
    on_newUserBecome(data) {
      console.log(data);
      console.log(data.id);
      newUserBecome({ id: data.id }).then((res) => {
      }).finally(()=>{
        this.on_getUserApplyOfrList()
      })
    },
    //修改用户申请
    on_updUserApplyFor() {
      updUserApplyFor(this.updUser).then((res) => {

      }).finally(()=>{
        this.on_getUserApplyOfrList()
      })
    },
    //删除用户申请的权限
    handleClose(uid, rid) {
      console.log(uid, rid);
      delUserApplyForRole({ uid: uid, rid: rid }).then((res) => {

      }).finally(()=>{
        this.on_getUserApplyOfrList()
      })
    },
    //取消该用户的申请
    on_delUserApplyFor(id){
      delUserApplyFor({id:id}).then((res)=>{
        
      }).finally(()=>{
        this.on_getUserApplyOfrList()
      })
    },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.search.size = val
        this.on_getUserApplyOfrList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.search.current = val
        this.on_getUserApplyOfrList()
      },
  },
};
</script>
