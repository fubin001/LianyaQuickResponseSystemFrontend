<template>
  <div>
    <el-button class="filter-item" type="primary" icon="el-icon-edit"
      style="margin: 5px 8px 5px 0; background-color: #244496" @click="centerDialogVisible_role=true">
      增加
    </el-button>
    <template>
      <el-table :data="dataList" style="width: 100%">
        <el-table-column label="名称" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="页面权限" width="550">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.permissionList" :key="item.name" closable :type="item.name"
              disable-transitions @close="on_delNewPermissionRole(scope.row.id, item.id)"
              style="margin:5px 0px 0px 10px;">
              {{ item.name }}
            </el-tag>
            <el-tag @click="on_getNewPermissionNotRoleIDList(scope.row)" type="success" style="margin:5px 0px 0 10px;">
              new+ </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="数据权限" width="550">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.brandList" :key="item.name" closable :type="item.name"
              @close="on_delRoleBrandRelations(scope.row.id, item.id)" style="margin:5px 0px 0px 10px;">
              {{ item.name }}
            </el-tag>
            <el-tag @click="on_getBrandRoleNotIDList(scope.row)" type="success" style="margin:5px 0px 0 10px;"> new+
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
    <el-dialog title="提示" :visible.sync="centerDialogVisible_perm" width="30%" center>
      <el-checkbox-group v-model="addRolePermission.permissionIDS">
        <el-checkbox v-for="item in permissionList" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <el-button @click="on_addNewPermissionRole">保存</el-button>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="centerDialogVisible_brand" width="30%" center>
      <el-checkbox-group v-model="addRoleBrand.brandIDList">
        <el-checkbox v-for="item in brandList" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <el-button @click="on_addRoleBrandRelations">保存</el-button>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="centerDialogVisible_role" width="30%" center>
      <el-input v-model="addRoles.role.name" placeholder="角色名称"></el-input>
      <el-button @click="on_addRoles()">新增</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getNewRole, addRole } from "@/api/role";
import { getNewPermissionList, addNewPermissionRole, delNewPermissionRole, getNewPermissionNotRoleIDList } from "@/api/permission";
import { getBrandRoleNotIDList, getRoleBrandRelations, delRoleBrandRelations, addRoleBrandRelations } from "@/api/brand";

export default {
  name: "角色信息",
  data() {
    return {
      centerDialogVisible_perm: false,
      centerDialogVisible_brand: false,
      centerDialogVisible_role:false,
      search_role: {
        currentPage: 0,
        sizePage: 10
      },
      search_permission: {
        id: 0,
        name: '',
        code: '',
        currentPage: 0,
        sizePage: 10
      },
      search_brand: {
        id: 0,
        name: '',
      },
      addRolePermission: {
        roleID: 0,//指定角色
        permissionIDS: [],//绑定的权限
      },
      addRoleBrand: {
        id: 0,//指定角色
        brandIDList: [],//绑定的品牌
      },
      addRoles: {//新增角色
        role: {
          name: '',
          roleType: '',
        },
        permissionIDs: [],
        brandIDs: [],
      },
      dataList: [],
      permissionList: [],//页面权限列表
      brandList: [],//数据权限列表
    };
  },
  created() {
    this.on_getNewRole();
  },
  methods: {
    //获取角色详细信息e
    on_getNewRole() {
      getNewRole(this.search_role).then((res) => {
        this.dataList = res.data.roleList
      })
    },
    //获取页面权限详细信息
    on_getNewPermissionList() {
      getNewPermissionList(this.search_permission).then((res) => {
        this.permissionList = res.data.permissionList
      })
    },
    //删除指定角色的页面权限
    on_delNewPermissionRole(rid, pids) {
      delNewPermissionRole({ roleID: rid, permissionIDS: [pids] }).then((res) => {

      }).finally(() => {
        this.on_getNewRole()
      })
    },
    //指定角色新增页面权限
    on_addNewPermissionRole() {
      addNewPermissionRole(this.addRolePermission).then((res) => {

      }).finally(() => {
        this.centerDialogVisible_perm = false
        this.on_getNewRole()
      })
    },
    //指定角色查询没有拥有的权限
    on_getNewPermissionNotRoleIDList(val) {
      // this.centerDialogVisible_perm=true
      this.addRolePermission.roleID = val.id //指定角色，准备新增
      this.search_permission.id = val.id //查询条件赋值
      getNewPermissionNotRoleIDList(this.search_permission).then((res) => {
        this.permissionList = res.data.permissionList
      }).finally(() => {
        this.centerDialogVisible_perm = true
        console.log(this.centerDialogVisible_perm);
      })
    },
    //查询该角色没有的数据权限
    on_getBrandRoleNotIDList(val) {
      // this.centerDialogVisible_perm=true
      this.addRoleBrand.id = val.id //指定角色，准备新增
      this.search_brand.id = val.id //查询条件赋值
      getBrandRoleNotIDList(this.search_brand).then((res) => {
        this.brandList = res.data
      }).finally(() => {
        this.centerDialogVisible_brand = true
        console.log(this.centerDialogVisible_perm);
      })
    },
    //指定角色绑定品牌
    on_addRoleBrandRelations() {
      addRoleBrandRelations(this.addRoleBrand).then((res) => {

      }).finally(() => {
        this.centerDialogVisible_brand = false
        this.on_getNewRole()
      })
    },
    //指定角色删除绑定的品牌
    on_delRoleBrandRelations(rid, bid) {
      delRoleBrandRelations({ id: rid, brandIDList: [bid] }).then((res) => {

      }).finally(() => {
        this.on_getNewRole()
      })
    },
    //新增角色
    on_addRoles() {
      addRole(this.addRoles).then((res) => {

      }).finally(() => {
        this.on_getNewRole()
      })
    },
    //删除角色
    on_delRoles(rid){

    },
  },
  watch: {
    //监视弹窗格式化数据
    centerDialogVisible_perm: {
      handler(newVal, oldVal) {
        if (!newVal) {
          this.addRolePermission.permissionIDS = []
          this.addRolePermission.roleID = 0
        }
      },
      deep: true
    },

    centerDialogVisible_role: {
      handler(newVal, oldVal) {
        if (!newVal) {
          this.addRoleBrand.brandIDList = []
          this.addRoleBrand.id = 0
        }
      },
      deep: true
    }
  }
};
</script>
