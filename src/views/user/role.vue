<template>
  <div class="app-container">
    <div class="filter-container">
      <span>
        查询名称：
        <el-input v-model="search_role.name" placeholder="请输入查询名称" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" @input="on_getNewRole()" />
      </span>
      <span style="float: right">

        <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin: 3px 5px; background-color: #244496" @click="on_getNewRole()">
          搜索
        </el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin: 5px 8px 5px 0; background-color: #244496" @click="centerDialogVisible_role = true">
          增加
        </el-button>
      </span>
    </div>

    <!-- <el-button @click="on_sy">sy</el-button> -->
    <template>
      <el-table :data="dataList" row-key="id" :header-cell-style="{ background: '#e4e7f0' }" fit highlight-current-row style="width: 100%">
        <el-table-column label="名称" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="页面权限" width="550">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.permissionList" :key="item.name" closable :type="item.name" disable-transitions style="margin:5px 0px 0px 10px;" @close="on_delNewPermissionRole(scope.row.id, item.id)">
              {{ item.name }}
            </el-tag>
            <el-tag type="success" style="margin:5px 0px 0 10px;" @click="on_getNewPermissionNotRoleIDList(scope.row)">
              修改</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="数据权限" width="550">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.brandList" :key="item.name" closable :type="item.name" style="margin:5px 0px 0px 10px;" @close="on_delRoleBrandRelations(scope.row.id,item.name)">
              {{ item.name }}
            </el-tag>
            <el-tag type="success" style="margin:5px 0px 0 10px;" @click="on_getBrandRoleNotIDList(scope.row)">修改
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="on_delRole(scope.row.id)">删除</el-button>
            <!-- <el-button size="mini" @click="on_newUserBecome(scope.row)">通过</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <el-pagination :current-page="search_role.current" :page-sizes="[10, 20, 30, 100]" :page-size="search_role.size" layout="total, sizes, prev, pager, next, jumper" :total="search_role.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <!-- <el-dialog title="提示" :visible.sync="centerDialogVisible_perm" width="30%" center>
      <el-checkbox-group v-model="addRolePermission.permissionIDS">
        <el-checkbox v-for="item in permissionList" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <el-button @click="on_addNewPermissionRole">保存</el-button>

      <div>
        <el-tree :data="asyncRoutes" show-checkbox node-key="path" default-expand-all @check-change="handleCheckChange"
          :render-content="renderContent">
        </el-tree>
        <div>
          <p>Selected Nodes:</p>
          <ul>
            <li v-for="node in checkedNodes" :key="node.path">{{ node }}</li>
          </ul>
        </div>
      </div>
     <el-checkbox-group v-model="addRolePermission.permissionIDS">
        <el-checkbox v-for="item in asyncRoutes" :label="item.path">{{ item }}</el-checkbox>
      </el-checkbox-group>
    </el-dialog> -->
    <el-dialog title="提示" :visible.sync="centerDialogVisible_brand" width="30%" center>
      <el-checkbox-group v-model="addRoleBrand.brandList">
        <el-checkbox v-for="item in brandList" :key="item" :label="item.name">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <el-button @click="on_addRoleBrandRelations">保存</el-button>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="centerDialogVisible_role" width="30%" center>
      <el-input v-model="addRoles.role.name" placeholder="角色名称" />
      <el-button @click="on_addRoles()">新增</el-button>
    </el-dialog>
    <el-dialog title="权限赋予" :visible.sync="centerDialogVisible_perm" width="30%" center>
      <roleProps v-if="centerDialogVisible_perm" :prop-role-i-d="propRoleID" @custom-event="on_getNewRole" />
    </el-dialog>
  </div>
</template>

<script>
import { getNewRole, addRole, sy, delRole } from '@/api/role'
import { getNewPermissionList, addNewPermissionRole, delNewPermissionRole, getNewPermissionNotRoleIDList } from '@/api/permission'
import { getBrandRoleNotIDList, getRoleBrandRelations, delRoleBrandRelations, addRoleBrandRelations } from '@/api/brand'
import { asyncRoutes, constantRoutes } from '@/router'
import roleProps from './roleProps.vue'
export default {
  name: '',
  components: { roleProps },
  data() {
    return {
      centerDialogVisible_perm: false,
      centerDialogVisible_brand: false,
      centerDialogVisible_role: false,
      search_role: {
        current: 0,
        size: 10,
        name: '',
        total: 0
      },
      search_permission: {
        id: 0,
        name: '',
        code: '',
        current: 0,
        size: 9999
      },
      search_brand: {
        id: 0,
        name: '',
        current: 0,
        size: 1
      },
      addRolePermission: {
        roleID: 0, // 指定角色
        permissionIDS: []// 绑定的权限
      },
      addRoleBrand: {
        roleID: 0, // 指定角色
        brandList: []// 绑定的品牌
      },
      addRoles: { // 新增角色
        role: {
          name: '',
          roleType: ''
        },
        permissionIDs: [],
        brandIDs: []
      },
      propRoleID: 0, // 弹窗传参，角色id用于查询角色拥有的权限
      asyncRoutes: asyncRoutes,
      checkedNodes: [],
      // defaultProps: {
      //   children: 'children',
      //   label: 'name',
      // },
      dataList: [],
      permissionList: [], // 页面权限列表
      brandList: [], // 数据权限列表

      currentPage: 1
    }
  },
  watch: {
    // 监视弹窗格式化数据
    centerDialogVisible_perm: {
      handler(newVal, oldVal) {
        if (!newVal) {
          this.addRolePermission.permissionIDS = []
          this.addRolePermission.roleID = 0
        }
      },
      deep: true
    },

    centerDialogVisible_brand: {
      handler(newVal, oldVal) {
        console.log(2)
        if (!newVal) {
          console.log(3)
          this.addRoleBrand.brandList = []
          this.addRoleBrand.roleID = 0
        }
      },
      deep: true
    }
  },
  created() {
    this.on_getNewRole()
  },
  methods: {
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <span>{JSON.stringify(data)}</span>
        </span>
      )
    },
    handleCheckChange(checkedNodes) {
      this.checkedNodes = checkedNodes
    },
    // 获取角色详细信息ee
    on_getNewRole() {
      getNewRole(this.search_role).then((res) => {
        this.dataList = res.data.roleList
        this.search_role.total = res.data.total
      })
    },
    // 获取页面权限详细信息
    on_getNewPermissionList() {
      getNewPermissionList(this.search_permission).then((res) => {
        this.permissionList = res.data.permissionList
      })
    },
    // 删除指定角色的页面权限
    on_delNewPermissionRole(rid, pid) {
      delNewPermissionRole({ roleID: rid, permissionIDS: [pid] }).then((res) => {

      }).finally(() => {
        this.on_getNewRole()
      })
    },
    // 指定角色新增页面权限
    on_addNewPermissionRole() {
      addNewPermissionRole(this.addRolePermission).then((res) => {

      }).finally(() => {
        this.centerDialogVisible_perm = false
        this.on_getNewRole()
      })
    },
    // 指定角色查询没有拥有的权限
    on_getNewPermissionNotRoleIDList(val) {
      // this.centerDialogVisible_perm=true
      this.addRolePermission.roleID = val.id // 指定角色，准备新增
      this.propRoleID = val.id
      this.search_permission.id = val.id // 查询条件赋值
      getNewPermissionNotRoleIDList(this.search_permission).then((res) => {
        this.permissionList = res.data.permissionList
      }).finally(() => {
        this.centerDialogVisible_perm = true
        console.log(this.centerDialogVisible_perm)
      })
    },
    // 查询该角色没有的数据权限
    on_getBrandRoleNotIDList(val) {
      // this.centerDialogVisible_perm=true
      this.addRoleBrand.roleID = val.id // 指定角色，准备新增
      this.search_brand.id = val.id // 查询条件赋值
      getBrandRoleNotIDList(this.search_brand).then((res) => {
        this.brandList = res.data
      }).finally(() => {
        this.centerDialogVisible_brand = true
        console.log(this.centerDialogVisible_perm)
      })
    },
    // 实验mybatis自带翻页功能
    on_sy() {
      sy(this.search_brand).then((res) => {
        console.log(res)
      }).finally(() => {
      })
    },
    // 指定角色绑定品牌
    on_addRoleBrandRelations() {
      addRoleBrandRelations(this.addRoleBrand).then((res) => {

      }).finally(() => {
        this.centerDialogVisible_brand = false
        this.on_getNewRole()
      })
    },
    // 指定角色删除绑定的品牌
    on_delRoleBrandRelations(uid, id) {
      delRoleBrandRelations({ id: uid, delBrands: [id] }).then((res) => {

      }).finally(() => {
        this.on_getNewRole()
      })
    },
    // 新增角色
    on_addRoles() {
      addRole(this.addRoles).then((res) => {

      }).finally(() => {
        this.on_getNewRole()
      })
    },
    // 删除角色
    on_delRole(rid) {
      delRole({ id: rid }).then((res) => {

      }).finally(() => {
        // console.log(1);
        this.on_getNewRole()
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.search_role.size = val
      this.on_getNewRole()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.search_role.current = val
      this.on_getNewRole()
      console.log(this.search_role)
    }
    // onInput(){
    // },
  }
}
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
