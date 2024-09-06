<template>
  <div class="app-container">
    <div class="filter-container">
      <span>
        查询名称：
        <el-input
          v-model="search.userNo"
          placeholder="请输入查询名称"
          style="width: 150px; margin: 5px 8px 5px 0"
          class="filter-item"
          @input="on_getNewUsersList()"
        />
      </span>
      <span style="float: right">

        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          style="margin: 3px 5px; background-color: #244496"
          @click="on_getNewUsersList()"
        >
          搜索
        </el-button>
      </span>
    </div>
    <template>
      <el-table
        :data="userList"
        row-key="id"
        :header-cell-style="{ background: '#e4e7f0' }"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="员工工号" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time" />
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
            <el-tag
              v-for="item in scope.row.roleList"
              :key="item.name"
              closable
              :type="item.name"
              style="margin: 0px 0px 5px 10px;"
              @close="on_delUserRoleRelations(scope.row.id, item.id)"
            >
              {{ item.name }}
            </el-tag>
            <el-tag type="success" style="margin: 0px 0px 5px 10px;" @click="on_getRoleNotUserNoList(scope.row)">
              新增
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="on_delNewUser(scope.row.id)">删除</el-button>
            <!-- <el-button size="mini" @click="on_newUserBecome(scope.row)">冻结</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      :current-page="search.current"
      :page-sizes="[10, 20, 30, 100]"
      :page-size="search.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="search.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <el-checkbox-group v-model="submit.addUserRole.roleIDList">
        <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <el-button @click="on_addUserRoleRelations">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { delNewUser, addUserRoleRelations, delUserRoleRelations, getRoleNotUserNoList, getNewUsersList } from '@/api/user'

export default {
  name: 'UserRole',
  data() {
    return {
      centerDialogVisible: false,
      formData: {},
      userList: [],
      search: {
        userName: '',
        userNo: '',
        current: 0,
        size: 10,
        total: 0
      },
      submit: {
        addUserRole: {
          uid: 0,
          roleIDList: []
        },
        delUserRole: {
          uid: 0,
          roleIDList: []
        },
        showNotUserNo: {
          roleName: '',
          userNo: ''
        }
      },
      roleList: []
    }
  },
  watch: {
    centerDialogVisible: {
      handler(newVal, oldVal) {
        if (!newVal) {
          this.roleList = []
          this.submit.addUserRole.roleIDList = []

          this.submit.addUserRole.userNo = ''
        }
      }
    }
  },
  created() {
    this.on_getNewUsersList()
  },
  methods: {
    // 获取用户信息
    on_getNewUsersList() {
      getNewUsersList(this.search).then((res) => {
        this.search.total = res.data.total
        this.userList = res.data.usersList
      })
    },
    // 获取指定用户没有的角色
    on_getRoleNotUserNoList(val) {
      this.centerDialogVisible = true// 打开弹窗
      this.submit.showNotUserNo.userNo = val.userNo// 确定角色工号
      this.submit.addUserRole.uid = val.id
      getRoleNotUserNoList(this.submit.showNotUserNo).then((res) => {
        this.roleList = res.data
      })
    },
    // 指定用户绑定角色
    on_addUserRoleRelations() {
      addUserRoleRelations(this.submit.addUserRole).then((res) => {

      }).finally(() => {
        this.centerDialogVisible = false
        this.on_getNewUsersList()
      })
    },
    // 指定用户删除绑定角色
    on_delUserRoleRelations(uid, rid) {
      this.submit.delUserRole.uid = uid
      this.submit.delUserRole.roleIDList = [rid]
      delUserRoleRelations(this.submit.delUserRole).then((res) => {

      }).finally(() => {
        this.centerDialogVisible = false
        this.on_getNewUsersList()
      })
    },
    // 删除用户
    on_delNewUser(id) {
      delNewUser({ id: id }).then((res) => {

      }).finally(() => {
        this.on_getNewUsersList()
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.search.size = val
      this.on_getNewUsersList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.search.current = val
      this.on_getNewUsersList()
      console.log(this.search_role)
    }
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
