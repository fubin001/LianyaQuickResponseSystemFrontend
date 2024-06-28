<template>
  <div>
    <el-button @click="on_updUserApplyFor()">on_updUserApplyFor</el-button>
    <template>
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
        <el-table-column label="申请角色" width="900">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.roleList" :key="item.name" closable :type="item.name"
              @close="handleClose(scope.row.id, item.id)">
              {{ item.name }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="on_delUserApplyFor(scope.row.id)">删除</el-button>
            <el-button size="mini" @click="on_newUserBecome(scope.row)">通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { updUserApplyFor, getUserApplyOfrList, newUserBecome, delUserApplyForRole, delUserApplyFor } from "@/api/user";

export default {
  name: "sy13",
  data() {
    return {
      formData: {},
      userApplyOfrList: [],
      search: {
        userName: '',
        userNo: '',
        currentPage: 0,
        sizePage: 9999
      }, sy: {
        uid: 1,
        sizePage: 1,
        currentPage: 10,
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
        this.userApplyOfrList = res.data.list
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
    }
  },
};
</script>
