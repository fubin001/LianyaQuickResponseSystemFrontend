<template>
  <div>
    <template>
      <el-table :data="userList" style="width: 100%">
        <el-table-column label="员工工号" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.userNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="员工姓名" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色" width="700">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.roleList" :key="item.name" closable :type="item.name"
              @close="on_delUserRoleRelations(scope.row.id, item.id)" style="margin: 0px 0px 5px 10px;">
              {{ item.name }}
            </el-tag>
            <el-tag type="success" style="margin: 0px 0px 5px 10px;" @click="on_getRoleNotUserNoList(scope.row)">
              new +
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="on_delUserApplyFor(scope.row.id)">删除</el-button>
            <el-button size="mini" @click="on_newUserBecome(scope.row)">冻结</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <el-checkbox-group v-model="submit.addUserRole.roleIDList">
        <el-checkbox v-for="item in roleList" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <el-button @click="on_addUserRoleRelations">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { newUserBecome, addUserRoleRelations, delUserRoleRelations, getRoleNotUserNoList, getNewUsersList } from "@/api/user";

export default {
  name: "用户申请",
  data() {
    return {
      centerDialogVisible: false,
      formData: {},
      userList: [],
      search: {
        userName: '',
        userNo: '',
        currentPage: 0,
        sizePage: 9999
      },
      submit: {
        addUserRole: {
          uid: 0,
          roleIDList: [],
        },
        delUserRole: {
          uid: 0,
          roleIDList: [],
        },
        showNotUserNo: {
          roleName: '',
          userNo: '',
        }
      },
      roleList: [],
    };
  },
  created() {
    this.on_getNewUsersList();
  },
  methods: {
    //获取用户信息
    on_getNewUsersList() {
      getNewUsersList(this.search).then((res) => {
        this.userList = res.data.usersList
      })
    },
    //获取指定用户没有的角色
    on_getRoleNotUserNoList(val) {
      this.centerDialogVisible=true//打开弹窗
      this.submit.showNotUserNo.userNo = val.userNo//确定角色工号
      this.submit.addUserRole.uid=val.id
      getRoleNotUserNoList(this.submit.showNotUserNo).then((res) => {
        this.roleList = res.data
      })
    },
    //指定用户绑定角色
    on_addUserRoleRelations() {
      addUserRoleRelations(this.submit.addUserRole).then((res) => {

      }).finally(()=>{
        this.centerDialogVisible=false
        this.on_getNewUsersList();
      })
    },
    //指定用户删除绑定角色
    on_delUserRoleRelations(uid, rid) {
      this.submit.delUserRole.uid = uid
      this.submit.delUserRole.roleIDList.push(rid)
      delUserRoleRelations(this.submit.delUserRole).then((res) => {

      }).finally(()=>{
        this.centerDialogVisible=false
        this.on_getNewUsersList();
      })
    },
  },
  watch:{
    centerDialogVisible:{
      handler(newVal,oldVal){
        if(!newVal){
          this.roleList=[]
          this.submit.addUserRole.roleIDList=[]
          this.submit.addUserRole.userNo=''
        }
      }
    }
  }
};
</script>
